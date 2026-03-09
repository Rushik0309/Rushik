import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', icon: '🏠', label: 'Dashboard' },
  { path: '/campaigns', icon: '📣', label: 'Campaigns' },
  { path: '/pitches', icon: '🎯', label: 'Sales Pitches' },
  { path: '/leads', icon: '👥', label: 'Lead Scoring' },
  { path: '/market', icon: '📊', label: 'Market Analysis' },
  { path: '/insights', icon: '💡', label: 'Business Insights' },
];

const sidebarStyle = {
  width: '260px',
  background: '#1e2433',
  borderRight: '1px solid #2d3748',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 0',
};

const logoStyle = {
  padding: '0 24px 24px',
  borderBottom: '1px solid #2d3748',
  marginBottom: '16px',
};

export default function Sidebar() {
  return (
    <nav style={sidebarStyle}>
      <div style={logoStyle}>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
          🧠 MarketMind
        </div>
        <div style={{ fontSize: '12px', color: '#6366f1', marginTop: '4px', fontWeight: 500 }}>
          AI Sales & Marketing Platform
        </div>
      </div>
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '11px 24px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            color: isActive ? '#fff' : '#94a3b8',
            background: isActive ? '#312e81' : 'transparent',
            borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
            transition: 'all 0.2s',
          })}
        >
          <span style={{ fontSize: '18px' }}>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
      <div style={{ marginTop: 'auto', padding: '16px 24px', borderTop: '1px solid #2d3748' }}>
        <div style={{ fontSize: '12px', color: '#475569' }}>Powered by</div>
        <div style={{ fontSize: '12px', color: '#6366f1', marginTop: '4px' }}>
          Gemini · Groq · IBM AI · HuggingFace
        </div>
      </div>
    </nav>
  );
}
