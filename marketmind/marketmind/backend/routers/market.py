from fastapi import APIRouter, HTTPException
from models.schemas import MarketRequest, AIResponse
from services.ai_service import generate

router = APIRouter()

@router.post("/analyze", response_model=AIResponse)
async def analyze_market(req: MarketRequest):
    prompt = f"""You are a senior market research analyst. Provide a comprehensive market analysis.

Industry: {req.industry}
Region: {req.region}
Key Competitors: {req.competitors}

Deliver:
1. Market Overview & Size (estimated TAM/SAM/SOM)
2. Key Trends (top 5)
3. Growth Drivers
4. Market Challenges & Risks
5. Competitive Landscape Analysis
6. Target Customer Segments
7. Market Entry / Growth Opportunities
8. 12-Month Outlook

Use data-driven language and be specific."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/competitor", response_model=AIResponse)
async def competitor_analysis(req: MarketRequest):
    prompt = f"""Create a detailed competitive analysis for the {req.industry} industry in {req.region}.
Competitors to analyze: {req.competitors}

For each competitor provide:
- Strengths & Weaknesses
- Market Positioning
- Pricing Strategy
- Target Segments
- Key Differentiators

End with: Gap Analysis & Opportunities to outcompete them."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
