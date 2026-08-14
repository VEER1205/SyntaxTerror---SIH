from pydantic_settings import BaseSettings,SettingsConfigDict

class AppSettings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str

    model_config = SettingsConfigDict(env_file=".evn")


settings = AppSettings()