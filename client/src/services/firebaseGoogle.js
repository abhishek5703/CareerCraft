export const isGoogleAuthConfigured = () => Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export const renderGoogleButton = ({ element, onCredential, text = "continue_with" }) => {
  if (!element || !window.google?.accounts?.id || !isGoogleAuthConfigured()) return false;

  window.google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: (response) => onCredential(response.credential),
    auto_select: false,
    cancel_on_tap_outside: true,
  });

  element.innerHTML = "";
  window.google.accounts.id.renderButton(element, {
    type: "standard",
    theme: "outline",
    size: "large",
    text,
    shape: "rectangular",
    width: Math.min(400, element.clientWidth || 400),
    logo_alignment: "left",
  });
  return true;
};

export const waitForGoogle = (callback, attempts = 30) => {
  if (window.google?.accounts?.id) {
    callback();
    return () => {};
  }

  let remaining = attempts;
  const interval = window.setInterval(() => {
    remaining -= 1;
    if (window.google?.accounts?.id || remaining <= 0) {
      window.clearInterval(interval);
      if (window.google?.accounts?.id) callback();
    }
  }, 250);

  return () => window.clearInterval(interval);
};
