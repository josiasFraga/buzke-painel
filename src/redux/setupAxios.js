
export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
      if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      window.location.href = '/logout';
      return new Promise((resolve, reject) => {
        reject(error);
      });
  });
}