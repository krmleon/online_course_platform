/**
 * Moduuli, joka määrittelee kurssin ja osan skeemat, eli sen, missä muodossa
 * data tallennetaan tietokantaan. 
 */

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI // MongoDB:n osoite, sisältää salasanan, joten ei ole julkinen
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/** Osan skeema */
const partSchema = new mongoose.Schema({
  name: String,
  content: String
})

/** Muuttaa vastaanotetun osa-olion vastaamaan skeemaa */
partSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/** Kurssin skeema */
const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  parts: [partSchema] // sisältää osa-olioita
})

/** Muuttaa vastaanotetun kurssi-olion vastaamaan skeemaa */
courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports = mongoose.model('Course', courseSchema)