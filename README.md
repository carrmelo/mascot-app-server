# **Mascot-app **Server

MascotApp is a web-application that gathers information on animals in need of a home from different organizations, in one place. The app seeks to alleviate the plight of abandoned pets in Spain documented by different organisations by finding them both temporary and permanent lodging. This repository hosts the server-side files for the application. The web-application's frontend is located in [this repository](https://github.com/carrmelo/mascot-app-client).

### Getting Started

____________________

##### Prerequisites

- Download and install [mongoDB](https://docs.mongodb.com/getting-started/shell/installation/)
- To check out the full app clone the [Mascot-app-client](https://github.com/carrmelo/mascot-app-client) repository.

##### Installing

- [Clone the repository](https://github.com/carrmelo/mascot-app-server.git), go to the app directory and install all the dependencies.
- Initialize the MongoDB with `mongod` (A basic DB has been exported for testing purposes)
- Run `nodemon` which will initialize the server in the port 3000. The server will update automatically after any saved change in the code.



### Tech Stack

_________________________

- [Koa](https://koajs.com/)
  - koa-bodyparser
  - koa-cors
  - koa-router
  - koa-static
- [MongoDB](https://www.mongodb.com/)
  - Mongoose



### Next Steps

______________

- Implement a relational database.
- Implement authentication.
- Finish all the CRUD routes for organisation, users and pets.



### Collaborating

_____

This is a non-profit project so any collaboration and suggestion will be valuable. Don't hesitate to send a private message.