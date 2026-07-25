import { useEffect, useRef } from 'react';

export default function TurnstileWidget({ onVerify, theme = 'light' }) {
  const ref = useRef(null);
  const widgetId = useRef(null);

  useEffect(() => {
    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';
    if (window.turnstile) {
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        theme,
        callback: (token) => onVerify?.(token),
        'expired-callback': () => onVerify?.(null),
      });
    }
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
      }
    };
  }, [theme, onVerify]);

  return <div ref={ref} className="turnstile-widget" />;
}