// require("express") : appelle la dépendance express dans package.json
const express = require("express");

// express devient une instance d'application conservable dans une variable
const app = express();
const port = 3000;

// get(chemin de la requête,reponse au client)
// "/" : chemin de la route qui va permettre de triter le point de terminaison
// req : récupère un objet 'request' correspondant à la requête reçu en entrée par notre point de terminaison
// res : correspond à la 'response' l'objet que l'on renvoie depuis express à notre client
// send : retourne un message au client
app.get("/", (req, res) => res.send("Hello, Express !"));

// listen(port,message au terminal de commande)
app.listen(port, () =>
  console.log(
    `Notre application Node est démarré sur : http://localhost:${port}`
  )
);
