import axios from 'axios';

const apiRequest = (options) =>
  new Promise((resolve, reject) => {
    axios({
      baseURL: 'https://backend.cffinsure.com/v1/api/',
      headers:{
        'x-auth-token': localStorage.getItem("jwt-Token")
       },
      ...options,
    })   
      .then((response) => resolve(response))
      .catch((error) => {
        if (error) { 
          // error from server
          console.log("Errors from Server: ", error);
        } else {
          // error in request
          console.error("Error Message:", error); 
        }
        if (error) {
          return reject('Unauthorized Person');
        }
        reject(error.response.data || error.message);
      });
  });

export default apiRequest;
