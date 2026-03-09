import httpx
import json
from config import settings


async def call_gemini(prompt: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={settings.GEMINI_API_KEY}"
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(url, json=payload)
        r.raise_for_status()
        data = r.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]


async def call_groq(prompt: str, model: str = "llama3-8b-8192") -> str:
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 1024
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(url, headers=headers, json=payload)
        r.raise_for_status()
        data = r.json()
        return data["choices"][0]["message"]["content"]


async def call_ibm(prompt: str) -> str:
    url = f"https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
    headers = {
        "Authorization": f"Bearer {settings.IBM_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model_id": "ibm/granite-13b-chat-v2",
        "input": prompt,
        "parameters": {"max_new_tokens": 500},
        "project_id": settings.IBM_PROJECT_ID
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(url, headers=headers, json=payload)
        r.raise_for_status()
        data = r.json()
        return data["results"][0]["generated_text"]


async def call_huggingface(prompt: str, model: str = "mistralai/Mistral-7B-Instruct-v0.1") -> str:
    url = f"https://api-inference.huggingface.co/models/{model}"
    headers = {"Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}"}
    payload = {"inputs": prompt, "parameters": {"max_new_tokens": 512}}
    async with httpx.AsyncClient(timeout=60) as client:
        r = await client.post(url, headers=headers, json=payload)
        r.raise_for_status()
        data = r.json()
        if isinstance(data, list):
            return data[0].get("generated_text", "")
        return data.get("generated_text", "")


async def generate(prompt: str, provider: str = None) -> str:
    provider = provider or settings.DEFAULT_AI_PROVIDER
    if provider == "gemini":
        return await call_gemini(prompt)
    elif provider == "groq":
        return await call_groq(prompt)
    elif provider == "ibm":
        return await call_ibm(prompt)
    elif provider == "huggingface":
        return await call_huggingface(prompt)
    else:
        raise ValueError(f"Unknown provider: {provider}")
