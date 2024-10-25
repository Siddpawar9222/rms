// import axios from "axios";

// const BASEURL = process.env.REACT_APP_SPRING_URL;

// // axios instance for making requests
// const axiosInstance = axios.create({
//   baseURL: `${BASEURL}`,
// });

// // request interceptor for adding token
// axiosInstance.interceptors.request.use((config) => {
//   // add token to request headers
//   config.headers["Authorization"] = localStorage.getItem("token");
//   return config;
// });

// export default axiosInstance;



import axios from "axios"; // Importing the axios library to make HTTP requests

const BASEURL = process.env.REACT_APP_SPRING_URL;

const customAxiosConfig = () => {
  // Get the token stored in the browser's localStorage (used for authentication)
  const TOKEN = localStorage.getItem("jwtToken");

  // These are public routes that don't need a token to access (like login, forgot password, etc.)
  const PUBLIC_ROUTES = ["/auth/login", "/auth/forgot-password", "/auth/register"];

  // Check if the current page is one of the public pages
  const isPublicPage = PUBLIC_ROUTES.some(r => window.location.href.includes(r));

  // If there is no token AND the user is not on a public page, redirect them to the login page
  if (!TOKEN && !isPublicPage) {
    window.location.href = '/auth/login'; // Redirect to login
    return; // Stop the function here, no need to continue
  }

  // axios instance for making requests
  const axiosInstance = axios.create({
    baseURL: BASEURL,
  });

  // If there is a token and the user is not on a public page, set the Authorization token
  if (TOKEN && !isPublicPage) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  }

  // This is an axios request interceptor, it runs before every HTTP request
  axiosInstance.interceptors.request.use(function (config) {
    // Add a "loading-indicator" class to the <body> tag to show a global loading spinner when making a request
    document.body.classList.add('loading-indicator');
    return config; // Continue the request
  }, function (error) {
    // If an error happens during the request phase, reject the request
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  });

  // This is an axios response interceptor, it runs after a response is received
  axiosInstance.interceptors.response.use(function (response) {
    // Remove the "loading-indicator" class from <body> to stop the global loading spinner when the response is received
    document.body.classList.remove('loading-indicator');
    return response; // Return the response
  }, function (error) {
    // In case of error, remove the loading spinner too and reject the error
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  });

  // Return the axios instance for reuse across the application
  return axiosInstance;
};

export default customAxiosConfig;






