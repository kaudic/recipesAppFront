import axios from 'axios';

// on créer une instance axios pour notre API
const apiAxios = axios.create({
  // Attention bien mettre http:// sinon souci (obscure) de cors
  baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
});
export default apiAxios;