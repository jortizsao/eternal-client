import axios from 'axios';

export default {
  signUp(params) {
    return axios.post('/customers/signUp', params).then(res => res.data);
  },
};
