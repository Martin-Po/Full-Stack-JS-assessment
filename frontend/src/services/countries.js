import axios from 'axios'
const baseUrl = '/api/countries'



const getAll = () => {

    const request = axios.get(`${baseUrl}`)
    return request.then(response => response.data)
}


const getInfo = (id) => {

    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}



export default { getAll, getInfo}