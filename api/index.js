
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

// SINRONIZAR EL SERVIDOR CON LA BASE DE DATOS 
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
