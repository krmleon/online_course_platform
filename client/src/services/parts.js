import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/courses'

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/parts`)
  return request.then(response => response.data)
}

const create = (id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/parts`, newObject)
  return request.then(response => response.data)
}

const update = (id, partid, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/parts/${partid}`, newObject)
  return request.then(response => response.data)
}

const remove = (id, partid) => {
    const request = axios.delete(`${baseUrl}/${id}/parts/${partid}`)
    return request.then(response => response.data)
  }

export default { getAll, create, update, remove }