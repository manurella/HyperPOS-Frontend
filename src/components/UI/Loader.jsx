function Loader() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: '#F5F4EF', zIndex: 9999, gap: '1.5rem',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <img src="/HyperPOS.svg" alt="HyperPOS" style={{ width: 52, height: 52 }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#1A1915', letterSpacing: '-0.02em' }}>
          HyperPOS
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ animation: 'hyperpos-spin 0.8s linear infinite' }}>
          <circle cx="12" cy="12" r="10" stroke="#4F7A3F" strokeWidth="3" strokeOpacity="0.2" />
          <path fill="#4F7A3F" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
        </svg>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#8C8A82', fontWeight: 500 }}>
          Loading dashboard…
        </span>
      </div>

      <style>{`
        @keyframes hyperpos-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Loader;
