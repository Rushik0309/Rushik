from fastapi import APIRouter, HTTPException
from models.schemas import InsightRequest, AIResponse
from services.ai_service import generate

router = APIRouter()

@router.post("/generate", response_model=AIResponse)
async def generate_insights(req: InsightRequest):
    prompt = f"""You are a strategic business consultant. Generate actionable business insights.

Company: {req.company_name}
Current Revenue: {req.revenue}
Challenges: {req.challenges}
Goals: {req.goals}

Provide:
1. Executive Summary
2. SWOT Analysis
3. Revenue Growth Strategies (top 3)
4. Operational Improvement Areas
5. Sales & Marketing Recommendations
6. Quick Wins (implementable in 30 days)
7. 90-Day Action Plan
8. KPIs to Track

Be specific, actionable, and business-focused."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/forecast", response_model=AIResponse)
async def sales_forecast(req: InsightRequest):
    prompt = f"""Create a sales forecast and revenue projection for {req.company_name}.
Current revenue: {req.revenue}
Goals: {req.goals}
Challenges: {req.challenges}

Provide:
1. Optimistic / Realistic / Pessimistic scenarios for next 4 quarters
2. Key assumptions for each scenario
3. Leading indicators to watch
4. Risk factors that could impact forecast"""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
