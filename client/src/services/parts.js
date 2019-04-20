import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/courses'

/**
 * Moduuli, joka tekee http-pyyntöjä.
 */

/**
 * Hakee kurssin kaikki osat.
 * @param {string} id 
 */
const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/parts`)
  return request.then(response => response.data)
}

/**
 * Luo uuden osan kurssille.
 * @param {string} id 
 * @param {string} newObject 
 */
const create = (id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/parts`, newObject)
  return request.then(response => response.data)
}

/**
 * Päivittää kurssin osan.
 * @param {string} id 
 * @param {string} partid 
 * @param {string} newObject 
 */
const update = (id, partid, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/parts/${partid}`, newObject)
  return request.then(response => response.data)
}

/**
 * Poistaa kurssin osan.
 * @param {string} id 
 * @param {string} partid 
 */
const remove = (id, partid) => {
    const request = axios.delete(`${baseUrl}/${id}/parts/${partid}`)
    return request.then(response => response.data)
  }

export default { getAll, create, update, remove }