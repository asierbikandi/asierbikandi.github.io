/* Tweaks app — theming controls only. Mutates data-* attrs on <html>. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "cyan",
  "density": "comfortable",
  "decor": "none"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', t.theme);
    root.setAttribute('data-accent', t.accent);
    root.setAttribute('data-density', t.density);
    root.setAttribute('data-decor', t.decor);
  }, [t.theme, t.accent, t.density, t.decor]);

  return (
    <TweaksPanel>
      <TweakSection label="Appearance" />
      <TweakRadio
        label="Theme"
        value={t.theme}
        options={['light', 'dark']}
        onChange={(v) => setTweak('theme', v)}
      />
      <div className="twk-row">
        <div className="twk-lbl"><span>Accent</span><span className="twk-val">{t.accent}</span></div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { v: 'cyan',   c: '#007CA8' },
            { v: 'red',    c: '#B81212' },
            { v: 'amber',  c: '#C66F00' },
            { v: 'purple', c: '#502078' },
            { v: 'ink',    c: '#1A1A1A' }
          ].map(o => (
            <button
              key={o.v}
              title={o.v}
              onClick={() => setTweak('accent', o.v)}
              style={{
                width: 28, height: 28, padding: 0, cursor: 'pointer',
                borderRadius: 6, background: o.c,
                border: t.accent === o.v ? '2px solid #1A1A1A' : '1px solid rgba(0,0,0,0.15)',
                boxShadow: t.accent === o.v ? '0 0 0 2px white inset' : 'none'
              }}
            />
          ))}
        </div>
      </div>
      <TweakRadio
        label="Density"
        value={t.density}
        options={['compact', 'comfortable']}
        onChange={(v) => setTweak('density', v)}
      />
      <TweakSection label="Decoration" />
      <TweakRadio
        label="Background"
        value={t.decor}
        options={['none', 'blueprint']}
        onChange={(v) => setTweak('decor', v)}
      />
    </TweaksPanel>
  );
}

// Mount into a dedicated div so we don't touch the main page DOM.
const _twkRoot = document.createElement('div');
document.body.appendChild(_twkRoot);
ReactDOM.createRoot(_twkRoot).render(<TweaksApp />);
