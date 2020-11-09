'use strict'

import {Response,Request, Router} from 'express';
const express = require('express');
const router = express.Router();
const {insertProduct,insertTickets} = require('./dbtickets/dbTickets');
//methode post choisi pour que le payload d'entrée soit le plus grand possible
router.post('/', async (req:Request, res:Response)=> {
    const ticket = req.body.ticket;
    // crée une id unique par ticket(afin de tous pouvoir les stocker)
    const idTicket = uniqueId();
    // Ajouter les tickets à la base de données
    insertTickets(idTicket,ticket);
    // Identifier les produits du ticket
    const parsedTicket = parseTicket(ticket);
    // Pour chaque list de [product_id,product,price] identifié ajouter à la base de données produits
    for(let i=0;i<parsedTicket.length;i++){
        insertProduct(idTicket,parsedTicket[i]);
    }
    res.status(200).send();
});

//une fonction qui genere un ID unique
function uniqueId():string {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// Une fonction pour extraire du tickets les produits qui rempliront la base de données
// Postulat: les produits sont toujours au format csv en fin de ticket
function parseTicket(ticket:string):string[][]{
    const lines:string[]=ticket.split('\n');
    var productNotfound:boolean =true;
    var i:number=0;
    while(i<lines.length && productNotfound){
        if(lines[i].includes('product_id')){
            productNotfound =false;
        }
        else{
            i= i+1;
        }
    }
    var res:string[][]=[];
    for(var k:number=i+1;k<lines.length;k++){
        res.push(lines[k].split(','));
    }
    return(res);
}
module.exports =router;