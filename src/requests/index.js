import axios from 'axios';



// on créer une instance axios pour notre API
const apiAxios = axios.create({
  // Attention bien mettre http:// sinon souci (obscure) de cors
  baseURL: process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_BASE_URL_PROD}/api` : `${process.env.REACT_APP_BASE_URL_DEV}/api`
});
export default apiAxios;