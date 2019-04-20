import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/courses'

/**
 * Moduuli, joka tekee http-pyyntöjä.
 */

/**
 * Hakee kaikki kurssit.
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/**
 * Luo uuden kurssin.
 * @param {object} newObject 
 */
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

/**
 * Päivittää kurssin.
 * @param {string} id 
 * @param {object} newObject 
 */
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

/**
 * Poistaa kurssin.
 * @param {string} id 
 */
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }

export default { getAll, create, update, remove }