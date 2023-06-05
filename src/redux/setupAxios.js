
export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { user, token },
      } = store.getState();

      if ( user && token && user.email && token.token ) {
        if ( config.method == "get" ) {
          config.url += "?";
          config.url += "email=" + user.email;
          config.url += "&token=" + token.token;
        } else if ( config.method == "post" ) {

          var data = new FormData();
          var data_json = config.data;
    
          data_json.token = token.token;
          data_json.email = user.email;

          data.append('dados', JSON.stringify(data_json));
          
          config.data = data;
        }
      }

      /*if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }*/

      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });

  });
}