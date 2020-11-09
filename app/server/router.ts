'use strict'
import {Request,Response} from "express";
const ticketsRoutes = require('../tickets/tickets');
const ping =require('../ping');
const express = require('express');
const router = express.Router();
router.use(`/ping`,ping);
router.use('/tickets',ticketsRoutes);

router.get('/',(req:Request,res:Response)=>{
    res.status(200).send("Welcome to the server");
});

module.exports = router;