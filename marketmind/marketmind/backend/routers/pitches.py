from fastapi import APIRouter, HTTPException
from models.schemas import PitchRequest, AIResponse
from services.ai_service import generate

router = APIRouter()

@router.post("/generate", response_model=AIResponse)
async def generate_pitch(req: PitchRequest):
    prompt = f"""You are an elite sales consultant. Create a compelling, personalized sales pitch.

Product/Service: {req.product_name}
Prospect: {req.prospect_name}
Industry: {req.industry}
Pain Points: {req.pain_points}
Budget Range: {req.budget_range}

Structure the pitch as:
1. Opening Hook (personalized to prospect)
2. Problem Statement (their specific pain)
3. Solution Presentation (how your product solves it)
4. Social Proof / Case Study (fabricate a realistic one)
5. ROI / Value Metrics
6. Objection Handling (top 3 objections + responses)
7. Closing Statement + Next Steps

Make it conversational, persuasive, and specific."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/elevator", response_model=AIResponse)
async def generate_elevator_pitch(req: PitchRequest):
    prompt = f"""Write a 30-second elevator pitch for {req.product_name} targeting {req.prospect_name} in the {req.industry} industry.
Pain points to address: {req.pain_points}
Keep it under 80 words, punchy, and end with a question to engage."""

    try:
        content = await generate(prompt, req.provider)
        return AIResponse(content=content, provider=req.provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
