import React from 'react';
import { useNavigate } from 'react-router-dom';

const features = [
  { path: '/campaigns', icon: '📣', title: 'Campaign Generator', desc: 'Create email, social & ad campaigns with AI', color: '#6366f1' },
  { path: '/pitches', icon: '🎯', title: 'Sales Pitch Creator', desc: 'Generate personalized pitches for any prospect', color: '#10b981' },
  { path: '/leads', icon: '👥', title: 'Lead Scoring', desc: 'Score & prioritize your leads intelligently', color: '#f59e0b' },
  { path: '/market', icon: '📊', title: 'Market Analysis', desc: 'Deep market insights & competitor breakdowns', color: '#ef4444' },
  { path: '/insights', icon: '💡', title: 'Business Insights', desc: 'Strategic recommendations & forecasts', color: '#8b5cf6' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="page-header">
        <h1>Welcome to MarketMind 🧠</h1>
        <p>Your AI-powered sales & marketing intelligence platform. Select a tool to get started.</p>
      </div>

      <div className="stats-grid">
        {[
          { icon: '⚡', value: '4 AIs', label: 'Integrated Providers' },
          { icon: '🚀', value: '5', label: 'AI-Powered Tools' },
          { icon: '📈', value: '10x', label: 'Faster Content Creation' },
          { icon: '🎯', value: '100%', label: 'Data-Driven' },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {features.map(f => (
          <div
            key={f.path}
            className="card"
            onClick={() => navigate(f.path)}
            style={{ cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = f.color; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#2d3748'; }}
          >
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>{f.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>{f.desc}</p>
            <div style={{ marginTop: '16px', color: f.color, fontSize: '13px', fontWeight: 600 }}>
              Open →
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '24px', background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)' }}>
        <h2 style={{ color: '#a5b4fc' }}>🔑 Quick Setup</h2>
        <p style={{ color: '#c7d2fe', fontSize: '14px', lineHeight: '1.7' }}>
          Add your API keys to <code style={{ background: '#1e2433', padding: '2px 6px', borderRadius: '4px' }}>backend/.env</code> to get started.
          Supported providers: <strong>Google Gemini</strong>, <strong>Groq</strong>, <strong>IBM WatsonX</strong>, and <strong>HuggingFace</strong>.
          You can select which AI provider to use for each request.
        </p>
      </div>
    </div>
  );
}
