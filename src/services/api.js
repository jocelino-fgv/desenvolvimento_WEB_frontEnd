// ***Passo 7: Instalação do axios
// ***Passo 8: Instalação do json-server
// ***Passo 9: importação da biblioteca axios e criação da instância http://localhost:3000/
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api