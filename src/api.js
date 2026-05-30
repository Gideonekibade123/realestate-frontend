// const BASE_URL = import.meta.env.VITE_API_URL;

// export const API = {
//   listings: `${BASE_URL}/api/listings/`,
//   listingDetail: (id) => `${BASE_URL}/api/listings/${id}/`,
//   login: `${BASE_URL}/api/auth/login/`,       // ✅ auth not accounts
//   register: `${BASE_URL}/api/auth/register/`, // ✅ auth not accounts
//   changePassword: `${BASE_URL}/api/auth/change-password/`,
//   mediaURL: (path) => path ? (path.startsWith("http") ? path : `${BASE_URL}${path}`) : null,
// };

// export default BASE_URL;


const BASE_URL = import.meta.env.VITE_API_URL;

export const API = {
  listings: `${BASE_URL}/api/listings/`,
  listingDetail: (id) => `${BASE_URL}/api/listings/${id}/`,
  login: `${BASE_URL}/api/auth/login/`,
  register: `${BASE_URL}/api/auth/register/`,
  changePassword: `${BASE_URL}/api/auth/change-password/`,
  forgotPassword: `${BASE_URL}/api/auth/forgot-password/`,                                      // ✅ added
  resetPassword: (uidb64, token) => `${BASE_URL}/api/auth/reset-password/${uidb64}/${token}/`,  // ✅ added
  mediaURL: (path) => path ? (path.startsWith("http") ? path : `${BASE_URL}${path}`) : null,
};

export default BASE_URL;