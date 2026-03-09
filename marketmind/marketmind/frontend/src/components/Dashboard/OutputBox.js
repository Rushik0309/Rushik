import React from 'react';

export default function OutputBox({ content, loading, title = "AI Output" }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
  };

  if (loading) return (
    <div className="output-box" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6366f1' }}>
      <div className="spinner" />
      Generating with AI...
    </div>
  );

  if (!content) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>{title}</span>
        <button className="btn btn-secondary" onClick={copyToClipboard} style={{ padding: '6px 12px', fontSize: '12px' }}>
          📋 Copy
        </button>
      </div>
      <div className="output-box">{content}</div>
    </div>
  );
}
