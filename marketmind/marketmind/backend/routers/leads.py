from fastapi import APIRouter, HTTPException
from models.schemas import LeadRequest, AIResponse
from services.ai_service import generate
import json

router = APIRouter()

@router.post("/score", response_model=AIResponse)
async def score_leads(req: LeadRequest):
    leads_str = json.dumps(req.leads, indent=2)
    prompt = f"""You are a lead scoring expert. Analyze these leads and score each one.

Leads Data:
{leads_str}

For each lead provide:
- Score (0-100)
- Grade (A/B/C/D)
- Conversion Probability (%)
- Key Strengths
- Key Risks
- Recommended Next Action
- Priority (High/Medium/Low)

Return as a structured analysis with clear sections per lead."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/outreach", response_model=AIResponse)
async def generate_outreach(req: LeadRequest):
    lead = req.leads[0] if req.leads else {}
    prompt = f"""Write a personalized cold outreach message for this lead:
{json.dumps(lead, indent=2)}

Create:
1. LinkedIn connection request (under 300 chars)
2. LinkedIn InMail (150 words)
3. Cold email (200 words)

Make each highly personalized based on their data."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
