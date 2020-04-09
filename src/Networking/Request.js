import axios from 'axios';
//import AsyncStorage from '@react-native-community/async-storage';

var baseApiAddress = 'http://192.168.87.127:4000';

const request = async function (options) {
  //var token= await AsyncStorage.getItem('token')
  const client = axios.create({
    baseURL: baseApiAddress,
    // headers: {
    //   Authorization: 'Bearer ' + token,
    // },
  });

  const onSuccess = function (response) {
    // console.log(response)
    return response.data;
  };

  const onError = function (error) {
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
    } else {
      // Something else happened while setting up the request
      // triggered the error
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;