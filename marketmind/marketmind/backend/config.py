from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    IBM_API_KEY: str = ""
    IBM_PROJECT_ID: str = ""
    HUGGINGFACE_API_KEY: str = ""
    DEFAULT_AI_PROVIDER: str = "gemini"

    class Config:
        env_file = ".env"

settings = Settings()
