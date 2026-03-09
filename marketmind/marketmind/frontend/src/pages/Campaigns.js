import React, { useState } from 'react';
import { generateCampaign, generateEmailSequence } from '../services/api';
import OutputBox from '../components/Dashboard/OutputBox';
import ProviderSelect from '../components/Dashboard/ProviderSelect';

export default function Campaigns() {
  const [tab, setTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [form, setForm] = useState({
    product_name: '', target_audience: '', campaign_type: 'email',
    tone: 'professional', goals: '', provider: 'gemini'
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true); setOutput('');
    try {
      const fn = tab === 'email' ? generateEmailSequence : generateCampaign;
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
        <h1>📣 Campaign Generator</h1>
        <p>Generate AI-powered marketing campaigns for any channel</p>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'general' ? 'active' : ''}`} onClick={() => setTab('general')}>General Campaign</button>
        <button className={`tab ${tab === 'email' ? 'active' : ''}`} onClick={() => setTab('email')}>Email Drip Sequence</button>
      </div>

      <div className="card">
        <h2>Campaign Details</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Product / Service Name *</label>
            <input value={form.product_name} onChange={e => set('product_name', e.target.value)} placeholder="e.g. CRM Software Pro" />
          </div>
          <div className="form-group">
            <label>Target Audience *</label>
            <input value={form.target_audience} onChange={e => set('target_audience', e.target.value)} placeholder="e.g. B2B SaaS companies, 50-500 employees" />
          </div>
          {tab === 'general' && (
            <div className="form-group">
              <label>Campaign Type</label>
              <select value={form.campaign_type} onChange={e => set('campaign_type', e.target.value)}>
                <option value="email">Email</option>
                <option value="social">Social Media</option>
                <option value="ads">Paid Ads</option>
                <option value="content">Content Marketing</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label>Tone</label>
            <select value={form.tone} onChange={e => set('tone', e.target.value)}>
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="urgent">Urgent</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>
          <div className="form-group full">
            <label>Campaign Goals</label>
            <textarea value={form.goals} onChange={e => set('goals', e.target.value)} placeholder="e.g. Increase trial sign-ups by 30%, generate 100 MQLs" />
          </div>
          <ProviderSelect value={form.provider} onChange={v => set('provider', v)} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading || !form.product_name}>
            {loading ? <><div className="spinner" /> Generating...</> : '⚡ Generate Campaign'}
          </button>
        </div>
        <OutputBox content={output} loading={loading} title="Generated Campaign" />
      </div>
    </div>
  );
}
