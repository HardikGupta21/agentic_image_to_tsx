from __future__ import annotations
import os, json
from io import BytesIO
from typing import Optional, List, Type
from pathlib import Path
from pydantic import BaseModel, Field
from PIL import Image

# New Google Gen AI SDK
from google import genai
from google.genai import types

# CrewAI BaseTool
from crewai.tools import BaseTool


# ---------- helpers ----------

def _clean_model(name: Optional[str]) -> str:
    if not name:
        return "gemini-2.5-flash"
    s = name.strip()
    if "/" in s:
        s = s.split("/")[-1]
    return s or "gemini-2.5-flash"

def _client() -> genai.Client:
    key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not key:
        raise RuntimeError("Set GEMINI_API_KEY in your environment or .env")
    return genai.Client(api_key=key)

def _image_part(p: Path) -> types.Part:
    with Image.open(p) as img:
        buf = BytesIO()
        img.convert("RGB").save(buf, format="PNG")
        buf.seek(0)
        return types.Part.from_bytes(data=buf.getvalue(), mime_type="image/png")

def _try_generate(contents, models: List[str]) -> str:
    cli = _client()
    last_err: Exception | None = None
    for m in [_clean_model(x) for x in models if x]:
        try:
            resp = cli.models.generate_content(model=m, contents=contents)
            txt = (getattr(resp, "text", "") or "").strip()
            if txt:
                return txt
        except Exception as e:
            last_err = e
            continue
    raise RuntimeError(f"No working Gemini model id. Last error: {last_err}")

def _resolve_image(passed: Optional[str]) -> Path:
    candidates: List[str] = []
    if passed:
        candidates.append(passed)
    envp = os.getenv("IMAGE_PATH")
    if envp:
        candidates.append(envp)
    tried: List[str] = []
    for c in candidates:
        p = Path(c).expanduser().resolve()
        tried.append(str(p))
        if p.exists():
            return p
    if not tried:
        raise FileNotFoundError("image_path not provided (and IMAGE_PATH not set).")
    raise FileNotFoundError("Image not found. Tried: " + " | ".join(tried))


# ---------- schemas ----------

class ImagePathInput(BaseModel):
    image_path: Optional[str] = Field(default=None, description="Path to the UI image file")

class AnalysisInput(BaseModel):
    analysis: str = Field(description="UI analysis text")

class ComponentInput(BaseModel):
    design_json: str = Field(description="Design system JSON")
    analysis: str = Field(description="Original UI analysis")

class FileManagerInput(BaseModel):
    analysis: str = Field(description="UI analysis text")
    design_json: str = Field(description="Design system JSON")
    tsx_code: str = Field(description="Generated TSX code")


# ---------- tools ----------

class UIAnalysisTool(BaseTool):
    name: str = "UI Analysis Tool"
    description: str = "Analyses a UI image and returns a detailed design report."
    args_schema: Type[BaseModel] = ImagePathInput

    def _run(self, image_path: Optional[str] = None) -> str:
        p = _resolve_image(image_path)
        parts = [
            ("You are a UI analyst. Describe the UI precisely:\n"
             "1) Screen type/layout\n2) Core components\n3) Visual hierarchy\n"
             "4) Approx spacing/grid\n5) Color palette (HEX if visible)\n"
             "Return a concise report."),
            _image_part(p),
        ]
        models = [
            os.getenv("MODEL"),
            "gemini-2.5-flash", "gemini-2.5-pro",
            "gemini-2.0-flash-001",
            "gemini-1.5-flash", "gemini-1.5-pro",
        ]
        return _try_generate(parts, models)


class DesignSystemTool(BaseTool):
    name: str = "Design System Generator"
    description: str = "Creates a JSON design-system spec from analysis text."
    args_schema: Type[BaseModel] = AnalysisInput

    def _run(self, analysis: str) -> str:
        prompt = (
            "Based on this UI analysis, create a simple JSON design system with keys:\n"
            "colors {primary, secondary, background}, components[]. "
            "Return ONLY compact JSON (no backticks, no prose).\n\n"
            f"{analysis}"
        )
        models = [os.getenv("MODEL"), "gemini-2.5-flash", "gemini-1.5-flash"]
        text = _try_generate(prompt, models).strip()
        if text.startswith("```"):
            # strip code fences if LLM added them
            t = []
            for ln in text.splitlines():
                if not ln.strip().startswith("```"):
                    t.append(ln)
            text = "\n".join(t).strip()
        return text


class ComponentGeneratorTool(BaseTool):
    name: str = "Next.js Component Generator"
    description: str = "Produces a full TSX page from design-system JSON."
    args_schema: Type[BaseModel] = ComponentInput

    def _run(self, design_json: str, analysis: str) -> str:
        prompt = (
            "Create a COMPLETE Next.js 15 TypeScript page component (default export) using Tailwind.\n"
            "Use the design system JSON and the analysis to guide colors/components.\n"
            "Include imports, interfaces, responsive layout, and realistic content.\n"
            "Return TSX ONLY.\n\n"
            f"Design System:\n{design_json}\n\nAnalysis:\n{analysis}"
        )
        models = [os.getenv("MODEL"), "gemini-2.5-flash", "gemini-1.5-flash"]
        code = _try_generate(prompt, models).strip()
        if code.startswith("```"):
            lines = [ln for ln in code.splitlines() if not ln.strip().startswith("```")]
            code = "\n".join(lines).strip()
        if not code.endswith("\n"):
            code += "\n"
        return code


class FileManagerTool(BaseTool):
    name: str = "File Manager"
    description: str = "Saves analysis, design JSON and TSX files."
    args_schema: Type[BaseModel] = FileManagerInput

    def _run(self, analysis: str, design_json: str, tsx_code: str) -> str:
        out = Path("outputs"); out.mkdir(exist_ok=True)
        (out / "ui-analysis.md").write_text("# UI Analysis Report\n\n" + analysis, encoding="utf-8")
        try:
            data = json.loads(design_json)
            (out / "design-system.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
        except Exception:
            (out / "design-system.json").write_text(design_json, encoding="utf-8")
        (out / "GeneratedComponent.tsx").write_text(tsx_code, encoding="utf-8")
        page = f"// Generated Next.js page\n\n{tsx_code}"
        (out / "generated-ui-page.tsx").write_text(page, encoding="utf-8")
        return "Files saved to ./outputs."
