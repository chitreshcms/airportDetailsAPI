const express = require('express')
const router = express.Router()
const airport = require('../models/udchalo.model')
const helper = require('../helpers/helper')

/* All airport_details */
router.get('/', async (req, res) => {
    await airport.getAirports()
    .then(airport_details => res.json(airport_details))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A airport by id */
router.get('/:id', helper.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await airport.getAirport(id)
    .then(airport => res.json(airport))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new airport */
router.post('/create', helper.checkAirportFields, async (req, res) => {
    await airport.insertAirport(req.body)
    .then(airport => res.status(201).json({
        message: `The airport #${airport.id} has been created`,
        content: airport
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a airport */
router.put('/create/:id', helper.mustBeInteger, helper.checkAirportFields, async (req, res) => {
    const id = req.params.id

    await airport.updateAirport(id, req.body)
    .then(airport => res.json({
        message: `The airport #${id} has been updated`,
        content: airport
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a airport */
router.delete('/delete/:id', helper.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await airport.deleteAirport(id)
    .then(airport => res.json({
        message: `The airport #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router