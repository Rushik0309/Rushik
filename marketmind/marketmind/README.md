# 🧠 MarketMind — Generative AI Sales & Marketing Intelligence Platform

> AI-powered platform for campaign generation, sales pitches, lead scoring, market analysis, and business insights.

---

## 🏗️ Tech Stack

| Layer     | Technology                              |
|-----------|------------------------------------------|
| Backend   | FastAPI, Python 3.11+                    |
| Frontend  | React 18, React Router, Axios, Recharts  |
| AI        | Google Gemini, Groq, IBM WatsonX, HuggingFace |

---

## 📁 Project Structure

```
marketmind/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Settings & env vars
│   ├── requirements.txt
│   ├── .env                 # API keys (fill this in)
│   ├── models/
│   │   └── schemas.py       # Pydantic request/response models
│   ├── routers/
│   │   ├── campaigns.py     # Campaign generation endpoints
│   │   ├── pitches.py       # Sales pitch endpoints
│   │   ├── leads.py         # Lead scoring endpoints
│   │   ├── market.py        # Market analysis endpoints
│   │   └── insights.py      # Business insights endpoints
│   └── services/
│       └── ai_service.py    # Unified AI provider abstraction
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js / App.css
        ├── index.js
        ├── pages/
        │   ├── Dashboard.js
        │   ├── Campaigns.js
        │   ├── Pitches.js
        │   ├── Leads.js
        │   ├── Market.js
        │   └── Insights.js
        ├── components/Dashboard/
        │   ├── Sidebar.js
        │   ├── OutputBox.js
        │   └── ProviderSelect.js
        └── services/
            └── api.js
```

---

## ⚡ Quick Start — Terminal Commands

### Step 1: Open project in VS Code
```bash
cd marketmind
code .
```

### Step 2: Setup Backend
```bash
# Open a new terminal in VS Code (Ctrl+`)
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3: Configure API Keys
Open `backend/.env` and fill in your keys:
```
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
IBM_API_KEY=your_ibm_api_key_here
IBM_PROJECT_ID=your_ibm_project_id_here
HUGGINGFACE_API_KEY=your_huggingface_token_here
DEFAULT_AI_PROVIDER=gemini
```

### Step 4: Start Backend Server
```bash
# From backend/ folder with venv activated
uvicorn main:app --reload --port 8000
```
✅ Backend runs at: http://localhost:8000
📖 API Docs at: http://localhost:8000/docs

### Step 5: Setup & Start Frontend
```bash
# Open a NEW terminal in VS Code (Ctrl+Shift+`)
cd frontend

# Install Node dependencies
npm install

# Start React dev server
npm start
```
✅ Frontend runs at: http://localhost:3000

---

## 🔑 Getting API Keys

| Provider | Link |
|----------|------|
| Google Gemini | https://aistudio.google.com/app/apikey |
| Groq | https://console.groq.com/keys |
| IBM WatsonX | https://cloud.ibm.com/ → WatsonX.ai |
| HuggingFace | https://huggingface.co/settings/tokens |

> **Tip:** You only need ONE provider key to start. Gemini has a generous free tier.

---

## 🚀 Features

| Feature | Endpoints |
|---------|-----------|
| 📣 Campaign Generator | General campaigns, Email drip sequences |
| 🎯 Sales Pitch Creator | Full pitch, Elevator pitch |
| 👥 Lead Scoring | Score & rank leads, Generate outreach messages |
| 📊 Market Analysis | Market overview, Competitor analysis |
| 💡 Business Insights | Strategic insights, Sales forecasting |

---

## 🧪 Test the API (Optional)

```bash
# Test health check
curl http://localhost:8000/health

# Test campaign generation (replace with your running server)
curl -X POST http://localhost:8000/api/campaigns/generate \
  -H "Content-Type: application/json" \
  -d '{
    "product_name": "AI CRM Tool",
    "target_audience": "B2B startups",
    "campaign_type": "email",
    "tone": "professional",
    "provider": "gemini"
  }'
```

---

## 🛠️ Troubleshooting

| Issue | Fix |
|-------|-----|
| `ModuleNotFoundError` | Make sure venv is activated |
| CORS error in browser | Ensure backend is on port 8000 |
| `npm start` fails | Run `npm install` first |
| AI returns 401 | Check your API key in `.env` |
| IBM 403 error | Verify IBM_PROJECT_ID is set |

---

## 📄 License
MIT — Free to use and modify for academic and commercial projects.
