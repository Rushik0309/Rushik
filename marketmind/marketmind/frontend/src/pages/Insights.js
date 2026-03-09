import React, { useState } from 'react';
import { generateInsights, salesForecast } from '../services/api';
import OutputBox from '../components/Dashboard/OutputBox';
import ProviderSelect from '../components/Dashboard/ProviderSelect';

export default function Insights() {
  const [tab, setTab] = useState('insights');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [form, setForm] = useState({ company_name: '', revenue: '', challenges: '', goals: '', provider: 'gemini' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true); setOutput('');
    try {
      const fn = tab === 'forecast' ? salesForecast : generateInsights;
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
        <h1>💡 Business Insights</h1>
        <p>AI-powered strategic recommendations and revenue forecasting</p>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'insights' ? 'active' : ''}`} onClick={() => setTab('insights')}>Business Insights</button>
        <button className={`tab ${tab === 'forecast' ? 'active' : ''}`} onClick={() => setTab('forecast')}>Sales Forecast</button>
      </div>

      <div className="card">
        <h2>Company Information</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Company Name *</label>
            <input value={form.company_name} onChange={e => set('company_name', e.target.value)} placeholder="e.g. Acme Technologies" />
          </div>
          <div className="form-group">
            <label>Current Annual Revenue</label>
            <input value={form.revenue} onChange={e => set('revenue', e.target.value)} placeholder="e.g. $2M ARR" />
          </div>
          <div className="form-group full">
            <label>Key Challenges</label>
            <textarea value={form.challenges} onChange={e => set('challenges', e.target.value)} placeholder="e.g. High CAC, low retention, scaling sales team" />
          </div>
          <div className="form-group full">
            <label>Business Goals</label>
            <textarea value={form.goals} onChange={e => set('goals', e.target.value)} placeholder="e.g. Reach $10M ARR in 18 months, expand to 3 new markets" />
          </div>
          <ProviderSelect value={form.provider} onChange={v => set('provider', v)} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading || !form.company_name}>
            {loading ? <><div className="spinner" /> Generating...</> : '💡 Generate Insights'}
          </button>
        </div>
        <OutputBox content={output} loading={loading} title={tab === 'forecast' ? 'Sales Forecast' : 'Business Insights Report'} />
      </div>
    </div>
  );
}
