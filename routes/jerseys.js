import express from 'express';
import {jerseyController} from '../controllers/jersey_controller.js'

let jerseyRouter = express.Router();

jerseyRouter.get('/', ((req, res) => jerseyController.listJerseys(req, res)))
jerseyRouter.get('/:id', ((req, res) => jerseyController.listJersey(req.params.id, res)))

export {jerseyRouter}