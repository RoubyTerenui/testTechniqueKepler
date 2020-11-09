
# Architecture de la base de données
Table product

>Fields:
>- productId(primaryKey)
>- product
>- price

Table ticket

>Fields:
>- TicketId(primaryKey)
>- ticketRawData

Table productToTicket

>Field
>- productId(foreignKey)
>- TicketId(foreignKey)

#  Autres considérations
La gestion des tickets est effectué dans les fichiers se trouvant dans le dossier tickets,
on y retrouve 1 fichier gérant les réquetes Http et 1 fichier contenant les fonctions gérant la bdd

>Compromis:
>- Le ticket arrive en json sous la forme {ticket:"value"}
>- Il y a un retour à la ligne avant le csv
>- Les champs sont toujours aux nombre de 3: product,product_id,price
>- Ils sont toujours situé en fin de ticket aux format csv

Temps:4H-5H