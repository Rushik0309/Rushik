import React, { useState } from 'react';
import { generatePitch, generateElevatorPitch } from '../services/api';
import OutputBox from '../components/Dashboard/OutputBox';
import ProviderSelect from '../components/Dashboard/ProviderSelect';

export default function Pitches() {
  const [tab, setTab] = useState('full');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [form, setForm] = useState({
    product_name: '', prospect_name: '', industry: '',
    pain_points: '', budget_range: '', provider: 'gemini'
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true); setOutput('');
    try {
      const fn = tab === 'elevator' ? generateElevatorPitch : generatePitch;
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
        <h1>🎯 Sales Pitch Creator</h1>
        <p>Generate personalized, persuasive sales pitches for any prospect</p>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'full' ? 'active' : ''}`} onClick={() => setTab('full')}>Full Sales Pitch</button>
        <button className={`tab ${tab === 'elevator' ? 'active' : ''}`} onClick={() => setTab('elevator')}>Elevator Pitch</button>
      </div>

      <div className="card">
        <h2>Prospect Details</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Product / Service *</label>
            <input value={form.product_name} onChange={e => set('product_name', e.target.value)} placeholder="e.g. AI Analytics Platform" />
          </div>
          <div className="form-group">
            <label>Prospect / Company Name *</label>
            <input value={form.prospect_name} onChange={e => set('prospect_name', e.target.value)} placeholder="e.g. Acme Corp" />
          </div>
          <div className="form-group">
            <label>Industry *</label>
            <input value={form.industry} onChange={e => set('industry', e.target.value)} placeholder="e.g. E-commerce, Healthcare, SaaS" />
          </div>
          <div className="form-group">
            <label>Budget Range</label>
            <input value={form.budget_range} onChange={e => set('budget_range', e.target.value)} placeholder="e.g. $5,000 - $20,000/month" />
          </div>
          <div className="form-group full">
            <label>Known Pain Points</label>
            <textarea value={form.pain_points} onChange={e => set('pain_points', e.target.value)} placeholder="e.g. High churn rate, manual reporting, poor lead visibility" />
          </div>
          <ProviderSelect value={form.provider} onChange={v => set('provider', v)} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading || !form.product_name}>
            {loading ? <><div className="spinner" /> Generating...</> : '🎯 Generate Pitch'}
          </button>
        </div>
        <OutputBox content={output} loading={loading} title="Generated Sales Pitch" />
      </div>
    </div>
  );
}
