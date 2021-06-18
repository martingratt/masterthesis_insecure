import express from 'express';
import {jerseyRouter} from "./jersey_router.js";
import {userRouter} from "./user_router.js";
import {frontendRouter} from "./frontend_router.js";

let router = express.Router();

router.use('/jerseys/', jerseyRouter);
router.use('/user', userRouter);
router.use('/', frontendRouter)

router.use((req, res, next) => {res.render('404')});


export {router};