from fastapi import APIRouter, HTTPException
from models.schemas import CampaignRequest, AIResponse
from services.ai_service import generate

router = APIRouter()

@router.post("/generate", response_model=AIResponse)
async def generate_campaign(req: CampaignRequest):
    prompt = f"""You are a world-class marketing strategist. Generate a complete {req.campaign_type} marketing campaign.

Product/Service: {req.product_name}
Target Audience: {req.target_audience}
Tone: {req.tone}
Campaign Goals: {req.goals}

Provide:
1. Campaign Name & Tagline
2. Key Message / Value Proposition
3. 3 Content Pieces (subject lines, post copy, or ad copy depending on type)
4. Call-to-Action suggestions
5. KPIs to track

Format clearly with headers."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/email", response_model=AIResponse)
async def generate_email_sequence(req: CampaignRequest):
    prompt = f"""Create a 5-email drip campaign sequence for:
Product: {req.product_name}
Audience: {req.target_audience}
Tone: {req.tone}

For each email provide: Subject Line, Preview Text, Body (150-200 words), CTA.
Label them Email 1 through 5 with timing (Day 1, Day 3, Day 7, Day 14, Day 21)."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
