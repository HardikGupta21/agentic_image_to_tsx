# img-to-tsx-agentic

Agentic AI pipeline that converts a UI image into a production-ready **Next.js (TSX)** page using **Tailwind CSS**.

- 🧠 **CrewAI** orchestrates agents and tasks  
- 🎨 **Google Gen AI (Gemini)** powers UI analysis + code generation  
- 📦 Outputs: analysis report, design system JSON, and complete TSX component/page

## Features

- Vision-driven **UI analysis** (layout, hierarchy, color palette)
- Automatic **design system JSON** extraction
- **Next.js 15 TypeScript** page generation with Tailwind CSS
- Modular CrewAI agents with YAML-configurable roles & tasks
- Outputs saved to `./outputs/` folder:
  - `ui-analysis.md`
  - `design-system.json`
  - `GeneratedComponent.tsx`
  - `generated-ui-page.tsx`

## Project Structure

```
img\_to\_tsx\_agentic/
├─ src/
│  └─ img\_to\_tsx\_agentic/
│     ├─ main.py               # CLI entrypoint
│     ├─ crew\.py               # CrewAI orchestration
│     ├─ tools/
│     │  ├─ **init**.py
│     │  └─ custom\_tool.py     # Tools (analysis, design system, TSX gen, file manager)
│     └─ config/
│        ├─ agents.yaml
│        └─ tasks.yaml
├─ knowledge/                  # optional prompts/notes
├─ .env                        # API key & model config (not committed)
├─ pyproject.toml
└─ README.md
```

## Prerequisites

- **Python 3.11+** (3.12 recommended)  
- A valid **Google AI Studio API key** (Gemini)  
- `uv` or `pip` for dependency management  

## Setup

### 1. Clone & enter repo
```bash
git clone https://github.com/yourusername/img-to-tsx-agentic.git
cd img-to-tsx-agentic
````

### 2. Create virtual environment

With **uv**:

```bash
uv venv --python 3.12
.\.venv\Scripts\Activate.ps1   # Windows
# source .venv/bin/activate    # macOS/Linux
```

Or with **pip**:

```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1   # Windows
# source .venv/bin/activate    # macOS/Linux
```

### 3. Install dependencies

```bash
pip install -U pip
pip install -e .
# or
pip install crewai[tools] google-genai python-dotenv pillow colorthief pyyaml
```

## Environment Setup

Create a `.env` file in the project root:

```ini
GEMINI_API_KEY=your_google_ai_studio_key
# Optional — defaults to gemini-2.5-flash
MODEL=gemini-2.5-flash
```

⚠️ **Important**: Do not prefix with `models/`. Use clean names like:
`gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-1.5-flash`.

## Run

From the project root:

```powershell
python -m img_to_tsx_agentic.main "C:\path\to\your\ui-screenshot.png"
```
Using Crew AI command:
```powershell
crewai run
```

After running, check:

```
./outputs/
  ├─ ui-analysis.md
  ├─ design-system.json
  ├─ GeneratedComponent.tsx
  └─ generated-ui-page.tsx
```

## Configuration

* **Agents & roles**: `src/img_to_tsx_agentic/config/agents.yaml`
* **Tasks**: `src/img_to_tsx_agentic/config/tasks.yaml`
* **Model**: set `MODEL` in `.env`

## Flow

1. **UI Analysis Tool** → produces detailed UI description
2. **Design System Tool** → extracts JSON tokens (colors, typography, spacing)
3. **Component Generator Tool** → creates a Next.js TSX page with Tailwind
4. **File Manager Tool** → saves all outputs into `./outputs/`
