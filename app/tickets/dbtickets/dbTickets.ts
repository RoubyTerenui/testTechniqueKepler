'use strict'
const Pool = require('pg').Pool

// On choisit d'utiliser une pool car un grand nombre de query vont être effectué et l'on souhaite
// optimiser le temps d'execution de celle-ci

// Un fichier de configuration secret devrait être ajouté pour accéder à ces données
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tickets',
  password: 'password',
  port: 5432,
})
// Ajouter à la base de données Ticket, le ticket et son id
function insertTickets(ticketId:string,ticketsString:string){
  const values:string[] = [ticketId,ticketsString];
  const query = {
    text: 'INSERT INTO tickets(ticketid,ticketrawvalue) VALUES($1,$2)',
    values: values,
  }
  ;(async () => {
    const client = await pool.connect();
    try {
      await client.query(query);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
}
// Ajouter les produits à la base de données product(Les produits seront unique par product_id)
// On reference aussi les produits aux tickets où ils ont été trouvés
function insertProduct(ticketId:string,productsFields:string[]){
  const query = {
    text: 'INSERT INTO product(product_id,product,price) VALUES($1,$2,$3)',
    values: productsFields,
  }
  const queryManyToMany = {
    text: 'INSERT INTO producttoticket(product_id,ticketid) VALUES($1,$2)',
    values: [ticketId,productsFields[0]],
  }
  ;(async () => {
    const client = await pool.connect();
    try {
      await client.query(query);
      await client.query(queryManyToMany);
    } finally {
      client.release();
  }
  })().catch(err => console.log(err.stack));
}

module.exports={insertTickets,insertProduct}