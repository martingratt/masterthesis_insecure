import express from 'express';
import {exec} from "child_process";
import serialize from "node-serialize";
import {jerseyRouter} from "./jersey_router.js";
import {userRouter} from "./user_router.js";
import {frontendRouter} from "./frontend_router.js";
import {UserMysqlStorage} from "../models/user_mysql_storage.js";
import path from "path";

let router = express.Router();

router.use('/jerseys/', jerseyRouter);
router.use('/user', userRouter);
router.use('/', frontendRouter)

router.use((req, res, next) => {res.render('404')});


export {router};