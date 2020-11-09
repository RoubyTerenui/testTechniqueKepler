'use strict';
import {Application} from "express";
const routes = require('./router')
const express = require('express');

export default class Server{
  readonly port: number;
  app : Application;
  constructor(port: number){
    this.port=port;
    this.app = express();
    this.app.use(express.json());
    this.app.use('/',routes);
  }
  start(){
    this.app.listen(this.port,()=>{
      console.log("serveur démarré sur le port:" + this.port);
    });
  }
}