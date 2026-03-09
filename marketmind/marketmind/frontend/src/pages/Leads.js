import React, { useState } from 'react';
import { scoreLeads, generateOutreach } from '../services/api';
import OutputBox from '../components/Dashboard/OutputBox';
import ProviderSelect from '../components/Dashboard/ProviderSelect';

const defaultLead = { name: '', company: '', email: '', industry: '', company_size: '', budget: '', engagement_score: '', source: '' };

export default function Leads() {
  const [tab, setTab] = useState('score');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [provider, setProvider] = useState('gemini');
  const [leads, setLeads] = useState([{ ...defaultLead }]);

  const updateLead = (i, k, v) => {
    const updated = [...leads];
    updated[i] = { ...updated[i], [k]: v };
    setLeads(updated);
  };

  const addLead = () => setLeads([...leads, { ...defaultLead }]);
  const removeLead = (i) => setLeads(leads.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    setLoading(true); setOutput('');
    try {
      const fn = tab === 'outreach' ? generateOutreach : scoreLeads;
      const res = await fn({ leads, provider });
      setOutput(res.data.content);
    } catch (e) {
      setOutput('Error: ' + (e.response?.data?.detail || e.message));
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1>👥 Lead Scoring & Outreach</h1>
        <p>Score leads by conversion potential and generate personalized outreach</p>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === 'score' ? 'active' : ''}`} onClick={() => setTab('score')}>Score Leads</button>
        <button className={`tab ${tab === 'outreach' ? 'active' : ''}`} onClick={() => setTab('outreach')}>Generate Outreach</button>
      </div>

      {leads.map((lead, i) => (
        <div className="card" key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ marginBottom: 0 }}>Lead #{i + 1}</h2>
            {leads.length > 1 && <button className="btn btn-secondary" onClick={() => removeLead(i)} style={{ padding: '4px 10px', fontSize: '12px' }}>Remove</button>}
          </div>
          <div className="form-grid">
            {[
              ['name', 'Full Name', 'e.g. Jane Smith'],
              ['company', 'Company', 'e.g. Tech Corp'],
              ['email', 'Email', 'jane@techcorp.com'],
              ['industry', 'Industry', 'e.g. SaaS'],
              ['company_size', 'Company Size', 'e.g. 200 employees'],
              ['budget', 'Budget', 'e.g. $10K/month'],
              ['engagement_score', 'Engagement Score', 'e.g. 75/100'],
              ['source', 'Lead Source', 'e.g. LinkedIn, Referral'],
            ].map(([k, lbl, ph]) => (
              <div className="form-group" key={k}>
                <label>{lbl}</label>
                <input value={lead[k]} onChange={e => updateLead(i, k, e.target.value)} placeholder={ph} />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={addLead}>+ Add Lead</button>
        <ProviderSelect value={provider} onChange={setProvider} />
        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <><div className="spinner" /> Analyzing...</> : tab === 'score' ? '📊 Score Leads' : '✉️ Generate Outreach'}
        </button>
      </div>

      <OutputBox content={output} loading={loading} title={tab === 'score' ? 'Lead Scores' : 'Outreach Messages'} />
    </div>
  );
}
