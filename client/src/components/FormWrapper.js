export default function FormWrapper({ title, children, onSubmit }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '80px 20px' }}>
      <form onSubmit={onSubmit} className="glass-panel" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h2 style={{ textAlign: 'center', margin: 0, color: 'var(--primary-color)' }}>{title}</h2>
        {children}
      </form>
    </div>
  );
}
