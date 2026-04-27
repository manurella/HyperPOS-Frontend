
function Loader() {

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0f1e',
      zIndex: 9999,
      gap: '2rem',
    }}>

      {/* Logo */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <img
          src="/HyperPOS.svg"
          alt="HyperPOS"
          style={{
            width: 56,
            height: 56,
            opacity: 0.95,
          }}
        />
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: '1.25rem',
          color: '#ffffff',
          letterSpacing: '-0.02em',
        }}>
          HyperPOS
        </span>
      </div>

      {/* Spinner + label */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '3px solid rgba(99,102,241,0.15)',
          borderTopColor: '#a855f7',
          animation: 'pos-spin 0.8s linear infinite',
        }} />
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.8125rem',
          color: '#64748b',
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}>
          Initializing…
        </span>
      </div>

      <style>{`
        @keyframes pos-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );

}

export default Loader;
