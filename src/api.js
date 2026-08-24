const BASE_URL = import.meta.env.VITE_API_URL;

export const API = {
  listings: `${BASE_URL}/api/listings/`,
  listingDetail: (id) => `${BASE_URL}/api/listings/${id}/`,
  login: `${BASE_URL}/api/auth/login/`,
  register: `${BASE_URL}/api/auth/register/`,
  changePassword: `${BASE_URL}/api/auth/change-password/`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password/`,
  resetPassword: (uidb64, token) => `${BASE_URL}/api/auth/reset-password/${uidb64}/${token}/`,
  mediaURL: (path) => path ? (path.startsWith("http") ? path : `${BASE_URL}${path}`) : null,
  activateAccount: (uidb64, token) => `${BASE_URL}/api/auth/activate/${uidb64}/${token}/`,
  tokenRefresh: `${BASE_URL}/api/auth/token/refresh/`,
};

export default BASE_URL;