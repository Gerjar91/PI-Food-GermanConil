/* 
🖱 BASE DE DATOS
Deberás crear dos modelos para tu base de datos. Una será para las recetas y la otra será para los tipos de dietas (pueden llevar el nombre que tu quieras). La relación entre ambos modelos debe ser de muchos a muchos. A continuación te dejamos las propiedades que debe tener cada modelo.

📍 MODELO 1 | Recipe

ID. *
Nombre. *
Imagen. *
Resumen del plato. *
Nivel de comida saludable (health score). *
Paso a paso. *
*/

const { DataTypes } = require('sequelize');

// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      /*   allowNull: false, */ // podria cargarse sin imagen ? 
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    }
  });
};
