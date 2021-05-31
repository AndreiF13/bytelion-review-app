import axios from 'axios';

const apiRequest = function(url: string, options: any) {    
  const onSuccess = function(response: any) {
  return response.data;
}

const onError = async function(error: any) {
  if (error.response) {
  //console.log('Status:',  error.response.status);
  //console.log('Data:',    error.response.data);
  //console.log('Headers:', error.response.headers);
  } else {
  }
  return Promise.reject(error.response || error.message);
}
 
const client = axios.create({
  baseURL: url,
  timeout: 30000
});

return client(options).then(onSuccess).catch(onError);
}
 
export default apiRequest;