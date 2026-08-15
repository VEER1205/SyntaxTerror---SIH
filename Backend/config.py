from pydantic_settings import BaseSettings,SettingsConfigDict

class AppSettings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    MONGODB_URL: str
    DATABASE_NAME: str

    model_config = SettingsConfigDict(env_file=".env")

settings = AppSettings()