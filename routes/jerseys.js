import express from 'express';
import {jerseyController} from '../controllers/jersey_controller.js'

let jerseyRouter = express.Router();

jerseyRouter.get('/', ((req, res) => jerseyController.listJerseys(req, res)))
jerseyRouter.get('/:id', ((req, res) => jerseyController.listJersey(req.params.id, res)))
jerseyRouter.post('/', ((req, res) => jerseyController.insertJersey(req.body.club, req.body.name, req.body.number, req.body.size, req.body.year, req.body.colour, res)))
jerseyRouter.post('/xml', ((req, res) => jerseyController.insertJerseyXML(req.body.xml, res)))

export {jerseyRouter}