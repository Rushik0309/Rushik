from pydantic import BaseModel
from typing import Optional, List
from enum import Enum

class AIProvider(str, Enum):
    gemini = "gemini"
    groq = "groq"
    ibm = "ibm"
    huggingface = "huggingface"

class CampaignRequest(BaseModel):
    product_name: str
    target_audience: str
    campaign_type: str  # email, social, ads
    tone: Optional[str] = "professional"
    goals: Optional[str] = ""
    provider: Optional[AIProvider] = AIProvider.gemini

class PitchRequest(BaseModel):
    product_name: str
    prospect_name: str
    industry: str
    pain_points: Optional[str] = ""
    budget_range: Optional[str] = ""
    provider: Optional[AIProvider] = AIProvider.gemini

class LeadRequest(BaseModel):
    leads: List[dict]
    provider: Optional[AIProvider] = AIProvider.gemini

class MarketRequest(BaseModel):
    industry: str
    region: Optional[str] = "Global"
    competitors: Optional[str] = ""
    provider: Optional[AIProvider] = AIProvider.gemini

class InsightRequest(BaseModel):
    company_name: str
    revenue: Optional[str] = ""
    challenges: Optional[str] = ""
    goals: Optional[str] = ""
    provider: Optional[AIProvider] = AIProvider.gemini

class AIResponse(BaseModel):
    content: str
    provider: str
    tokens_used: Optional[int] = None
