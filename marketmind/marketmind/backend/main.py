from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import campaigns, pitches, leads, market, insights

app = FastAPI(
    title="MarketMind API",
    description="Generative AI–Powered Sales & Marketing Intelligence Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(campaigns.router, prefix="/api/campaigns", tags=["Campaigns"])
app.include_router(pitches.router, prefix="/api/pitches", tags=["Pitches"])
app.include_router(leads.router, prefix="/api/leads", tags=["Leads"])
app.include_router(market.router, prefix="/api/market", tags=["Market"])
app.include_router(insights.router, prefix="/api/insights", tags=["Insights"])

@app.get("/")
def root():
    return {"message": "MarketMind API is running", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}
