import axios from 'axios'
const url = 'http://localhost:3001/api/notes'

const getAll = ()=>{
   const notaNoExiste = {
    id:1000,
    content: "esta nota no está guardada en el servidor",
    important: true,
   }
   const request = axios.get(url)
   return request.then(response => response.data.concat(notaNoExiste))
}
const create = (newObjetc) =>{
    const request = axios.post(url,newObjetc)
    return request.then(response => response.data)
}
const update = (id, newObjetc) => {
    const request = axios.put(`${url}/${id}`, newObjetc)
    return request.then(reponse =>reponse.data)
}   

export default {
    getAll:getAll , 
    create: create,
    update: update
}