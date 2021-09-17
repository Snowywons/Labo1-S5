const port = 5000; // mettons
const server = require('./route.js'); // importer les routes
server.listen(port, () => {
  console.log('Serveur en exécution sur http://' + port + '/');
});