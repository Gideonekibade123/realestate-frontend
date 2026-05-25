const BASE_URL = "https://backendlastproject.onrender.com";

export const API = {
  listings: `${BASE_URL}/api/listings/`,
  listingDetail: (id) => `${BASE_URL}/api/listings/${id}/`,
  login: `${BASE_URL}/api/auth/login/`,
  register: `${BASE_URL}/api/auth/register/`,
  mediaURL: (path) => path ? (path.startsWith("http") ? path : `${BASE_URL}${path}`) : null,
};

export default BASE_URL;