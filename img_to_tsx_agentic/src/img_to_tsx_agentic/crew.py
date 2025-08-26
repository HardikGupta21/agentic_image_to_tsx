import yaml, os
from pathlib import Path
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process
from .tools import (
    UIAnalysisTool,
    DesignSystemTool,
    ComponentGeneratorTool,
    FileManagerTool,
)

load_dotenv()  # loads GEMINI_API_KEY (used inside tools)

TOOLS = {
    "UIAnalysisTool": UIAnalysisTool(),
    "DesignSystemTool": DesignSystemTool(),
    "ComponentGeneratorTool": ComponentGeneratorTool(),
    "FileManagerTool": FileManagerTool(),
}

def _load_yaml(p: str) -> dict:
    return yaml.safe_load(Path(p).read_text(encoding="utf-8"))

def build_crew(image_path: str) -> Crew:
    agents_cfg = _load_yaml(Path(__file__).parent / "config" / "agents.yaml")
    tasks_cfg = _load_yaml(Path(__file__).parent / "config" / "tasks.yaml")

    # Provide a reliable fallback for the first tool if the LLM omits the arg
    os.environ["IMAGE_PATH"] = str(Path(image_path).expanduser().resolve())

    agents = {
        key: Agent(
            role=cfg["role"],
            goal=cfg["goal"],
            backstory=cfg["backstory"],
            tools=[TOOLS[cfg["tool"]]],
            verbose=True,
            allow_delegation=False,
        )
        for key, cfg in agents_cfg.items()
    }

    tasks = [
        Task(
            description=tasks_cfg["ui_analysis_task"]["description"].format(image_path=image_path),
            expected_output=tasks_cfg["ui_analysis_task"]["expected_output"],
            agent=agents["ui_analyst"],
        ),
        Task(
            description=tasks_cfg["design_system_task"]["description"],
            expected_output=tasks_cfg["design_system_task"]["expected_output"],
            agent=agents["design_architect"],
        ),
        Task(
            description=tasks_cfg["component_task"]["description"],
            expected_output=tasks_cfg["component_task"]["expected_output"],
            agent=agents["frontend_dev"],
        ),
        Task(
            description=tasks_cfg["file_task"]["description"],
            expected_output=tasks_cfg["file_task"]["expected_output"],
            agent=agents["file_manager"],
        ),
    ]

    return Crew(agents=list(agents.values()), tasks=tasks, process=Process.sequential, verbose=True)
