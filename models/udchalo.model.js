let airport_details = require('../db/db.json')
const filename = './db/db.json'
const helper = require('../helpers/helper.js')

function getAirports() {
    return new Promise((resolve, reject) => {
        if (airport_details.length === 0) {
            reject({
                message: 'no Airport Details available',
                status: 202
            })
        }
        resolve(airport_details)
    })
}

function getAirport(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(airport_details, id)
        .then(airport => resolve(airport))
        .catch(err => reject(err))
    })
}

function insertAirport(newAirport) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(airport_details) }
        newAirport = { ...id, ...newAirport }
        airport_details.push(newAirport)
        helper.writeJSONFile(filename, airport_details)
        resolve(newAirport)
    })
}

function updateAirport(id, newAirport) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(airport_details, id)
        .then(airport => {
            const index = airport_details.findIndex(a => a.id == airport.id)
            id = { id: airport.id }
            airport_details[index] = { ...id, ...newAirport }
            helper.writeJSONFile(filename, airport_details)
            resolve(airport_details[index])
        })
        .catch(err => reject(err))
    })
}

function deleteAirport(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(airport_details, id)
        .then(() => {
            airport_details = airport_details.filter(a => a.id !== id)
            helper.writeJSONFile(filename, airport_details)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertAirport,
    getAirports,
    getAirport, 
    updateAirport,
    deleteAirport
}