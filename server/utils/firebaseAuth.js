const firebaseKey = () => process.env.FIREBASE_WEB_API_KEY;

export const isFirebaseConfigured = () => Boolean(firebaseKey());

const firebaseRequest = async (path, payload) => {
  const key = firebaseKey();
  if (!key) throw new Error("Firebase is not configured");
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) {
    const code = data?.error?.message || "FIREBASE_AUTH_ERROR";
    const error = new Error(code);
    error.firebaseCode = code;
    throw error;
  }
  return data;
};

export const createFirebasePasswordUser = (email, password) =>
  firebaseRequest("accounts:signUp", { email, password, returnSecureToken: true });

export const signInFirebasePassword = (email, password) =>
  firebaseRequest("accounts:signInWithPassword", { email, password, returnSecureToken: true });

export const signInFirebaseGoogle = (googleIdToken, requestUri) =>
  firebaseRequest("accounts:signInWithIdp", {
    postBody: `id_token=${encodeURIComponent(googleIdToken)}&providerId=google.com`,
    requestUri,
    returnSecureToken: true,
    returnIdpCredential: false,
  });

export const sendFirebasePasswordReset = (email) =>
  firebaseRequest("accounts:sendOobCode", { requestType: "PASSWORD_RESET", email });

export const confirmFirebasePasswordReset = (oobCode, newPassword) =>
  firebaseRequest("accounts:resetPassword", { oobCode, newPassword });

export const deleteFirebaseAccount = (idToken) => firebaseRequest("accounts:delete", { idToken });

export const refreshFirebaseIdToken = async (refreshToken) => {
  const key = firebaseKey();
  if (!key) throw new Error("Firebase is not configured");
  const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data?.error?.message || "FIREBASE_REFRESH_ERROR");
    error.firebaseCode = data?.error?.message;
    throw error;
  }
  return data;
};
