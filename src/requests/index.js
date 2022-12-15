import axios from 'axios';



// on créer une instance axios pour notre API
const apiAxios = axios.create({
  // Attention bien mettre http:// sinon souci (obscure) de cors
  baseURL: process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_BASE_URL_PROD}/api` : `${process.env.REACT_APP_BASE_URL_DEV}/api`
});
export default apiAxios;

/**
 * Set le header Authorization avec le token donné
 * @param {String} token
 */
export function setBearerToken(token) {
  //  set le header Authorization avec le token
  apiAxios.defaults.headers.common.Authorization = `bearer ${token}`;
  // localStorage.setItem('token', token);
}

/**
 * Supprime le token JWT de l'instance axios
 */
export function removeBearerToken() {
  apiAxios.defaults.headers.common.Authorization = undefined;
  // localStorage.removeItem('token');
}

/**
 * recupère la valeur du bearer token présent dans le localStorage
 * @returns {string} retourne le token si retrouvé dans le localStorage, sinon undefined
 */
export function getLocalBearerToken() {
  const localToken = localStorage.getItem('token');
  if (localToken) {
    return localToken;
  }
  return undefined;
}