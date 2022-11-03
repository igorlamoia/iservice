import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/api-iservice/',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});
const apiViacep = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

// api.interceptors.response.use(
//   (response) => {
//     // Caso seja código 200 só mantem o que veio da API
//     if (response.data.codigo === 200 || response.data.codigo === 201) {
//       return response;
//     }

//     // Caso o código seja diferente de 200 vou estourar erro também, como erro de Header
//     const data = {
//       ...response.data,
//       mensagem:
//         response.data.mensagem ??
//         'Por favor, verifique sua conexão e tente novamente.',
//     };
//     return Promise.reject(data);
//   },
//   (error) => {
//     // Qualquer código de Header cai aqui (4xx, 5xx), exemplo: 401
//     const data = {
//       ...error.response?.data,
//       mensagem:
//         error.response?.data.mensagem ??
//         'Por favor, verifique sua conexão e tente novamente.',
//       ...(error.toJSON().message === 'Network Error' && { semInternet: true }),
//     };
//     return Promise.reject(data);
//   }
// );

export { api, apiViacep };
