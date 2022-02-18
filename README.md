# Servidor Restful

Servidor creado usando Express.js. Es un servidor listo listo para usar con Rutas publicas y privadas
CRUD de usuario, y conexión con la base de datos NoSQL **MongoDB** usando Mongoose.

## Dependencias
---------------
* Express.js _4.17.1_
* jsonwebtoken _8.5.1_
* mongoose _5.11.4_
* mongoose-unique-validator _2.0.3_
* cors _2.8.5_
* body-parser _1.19.0_
* bcrypt _5.0.0_
* @hapi-joi _17.1.1_

## Arquitectura
---------------
<img src="/assets/img/Server_Design.png" />

## Configurando el proyecto
---------------

Se debe instalar  **Node.js**, **MongoDB** en el ordenador.

Al instalar mongoDB se debe iniciar el servicio `mongod`.

### Instalar dependencias
---------------

```
npm install
```

### Iniciar el servidor
---------------

```
npm start
```

El servidor iniciará en el puerto 3000.

### Documentacion de APIs

url de la documentación en postman

https://documenter.getpostman.com/view/8334104/TzRNGAPJ
