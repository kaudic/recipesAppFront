import axios from 'axios';

// on créer une instance axios pour notre API
const apiAxios = axios.create({
  // Attention bien mettre http:// sinon souci (obscure) de cors
  baseURL: 'http://localhost:3001/api',
});
export default apiAxios;