import React, { useState } from 'react';
import { analyzeMarket, competitorAnalysis } from '../services/api';
import OutputBox from '../components/Dashboard/OutputBox';
import ProviderSelect from '../components/Dashboard/ProviderSelect';

export default function Market() {
  const [tab, setTab] = useState('analyze');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [form, setForm] = useState({ industry: '', region: 'Global', competitors: '', provider: 'gemini' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true); setOutput('');
    try {
      const fn = tab === 'competitor' ? competitorAnalysis : analyzeMarket;
      const res = await fn(form);
      setOutput(res.data.content);
    } catch (e) {
      setOutput('Error: ' + (e.response?.data?.detail || e.message));
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1>📊 Market Analysis</h1>
        <p>Deep market intelligence and competitive landscape analysis</p>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'analyze' ? 'active' : ''}`} onClick={() => setTab('analyze')}>Market Analysis</button>
        <button className={`tab ${tab === 'competitor' ? 'active' : ''}`} onClick={() => setTab('competitor')}>Competitor Analysis</button>
      </div>

      <div className="card">
        <h2>Analysis Parameters</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Industry / Market *</label>
            <input value={form.industry} onChange={e => set('industry', e.target.value)} placeholder="e.g. B2B SaaS, Fintech, Healthcare AI" />
          </div>
          <div className="form-group">
            <label>Region / Geography</label>
            <select value={form.region} onChange={e => set('region', e.target.value)}>
              {['Global', 'North America', 'Europe', 'Asia-Pacific', 'Middle East', 'Latin America', 'India'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="form-group full">
            <label>Key Competitors (comma separated)</label>
            <input value={form.competitors} onChange={e => set('competitors', e.target.value)} placeholder="e.g. Salesforce, HubSpot, Pipedrive" />
          </div>
          <ProviderSelect value={form.provider} onChange={v => set('provider', v)} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading || !form.industry}>
            {loading ? <><div className="spinner" /> Analyzing...</> : '🔍 Run Analysis'}
          </button>
        </div>
        <OutputBox content={output} loading={loading} title="Market Intelligence Report" />
      </div>
    </div>
  );
}
