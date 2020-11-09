'use strict';
import {Request,Response} from "express";
const express = require('express');
const router = express.Router();

router.get('/', (req:Request,res:Response) => {
  res.status(200).send('serveur UP');
});

module.exports = router;
