import React from 'react';

const providers = [
  { value: 'gemini', label: '🔵 Google Gemini' },
  { value: 'groq', label: '⚡ Groq (Fast)' },
  { value: 'ibm', label: '🔷 IBM WatsonX' },
  { value: 'huggingface', label: '🤗 HuggingFace' },
];

export default function ProviderSelect({ value, onChange }) {
  return (
    <div className="form-group">
      <label>AI Provider</label>
      <select value={value} onChange={e => onChange(e.target.value)}>
        {providers.map(p => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
    </div>
  );
}
