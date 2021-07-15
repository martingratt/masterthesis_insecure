import express from 'express';
import {jerseyController} from '../controllers/jersey_controller.js'

let jerseyRouter = express.Router();

jerseyRouter.get('/', ((req, res) => jerseyController.listJerseys(req, res)))
jerseyRouter.get('/myjerseys/', ((req, res) => jerseyController.getJerseysByUserId(req, res)))
jerseyRouter.get('/myjerseyssession/', ((req, res) => jerseyController.getJerseysByUserIdSession(req, res)))
jerseyRouter.get('/myjerseysjwt/', ((req, res) => jerseyController.getJerseysByUserIdJWT(req, res)))
jerseyRouter.get('/:id', ((req, res) => jerseyController.listJersey(req.params.id, res)))
jerseyRouter.post('/', ((req, res) => jerseyController.insertJersey(req, req.body.club, req.body.name, req.body.number, req.body.size, req.body.year, req.body.colour, res)))
jerseyRouter.post('/xml', ((req, res) => jerseyController.insertJerseyXML(req, res)))

export {jerseyRouter}