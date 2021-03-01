import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fgmanager-api.herokuapp.com',
  // baseURL: 'http://localhost:3001'
  // onDownloadProgress: (progressEvent) => {
  //   let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //   console.log(progressEvent.lengthComputable)
  //   console.log(percentCompleted);
  //   alert("aqui")
  // },
  // onUploadProgress : function  ( progressEvent )  { 
  //   alert(progressEvent);
  // },
});

api.interceptors.request.use((config) => {

  var interval = setInterval(() => {
    try {
      var classeLoading = document.getElementsByClassName("css-rciaot")
      if (classeLoading) {
        // alert(classeLoading[0].style.visibility)
        classeLoading[0].style.visibility = "visible"
        // alert(classeLoading[0].style.visibility)

        clearInterval(interval);
      }
    }catch(e) { }
  })

  return config;
});

api.interceptors.response.use((config) => {

  var interval = setInterval(() => {
    try {
      var classeLoading = document.getElementsByClassName("css-rciaot")
      if (classeLoading) {
        classeLoading[0].style.visibility = "hidden"

        clearInterval(interval);
      }
    }catch(e) { }
  })

  return config;
  
}, (error) => {
  var interval = setInterval(() => {
    try {
      var classeLoading = document.getElementsByClassName("css-rciaot")
      if (classeLoading) {
        classeLoading[0].style.visibility = "hidden"

        clearInterval(interval);
      }
    }catch(e) { }
  })

  return Promise.reject(error);
});

export default api;