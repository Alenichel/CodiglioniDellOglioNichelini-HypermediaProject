# Documentation of the Backend part

> Deliverable D1

## General group information

| Member n. | Role        | First name | Last Name  | Matricola | Email address                       | 
|-----------|-------------|------------|------------|-----------|-------------------------------------| 
| 1         | Team leader | Fabio      | Codiglioni | 919897    | fabio.codiglioni@mail.polimi.it     | 
| 2         | Member      | Alessandro | Nichelini  | 123456    | alessandro.nichelini@mail.polimi.it |
| 3         | Member      | Luca       | dell'Oglio | 928445    | luca1.delloglio@mail.polimi.it      |

## Links to other deliverables

- Deliverable D0: the web application is accessible at [this address](https://quality-time-bank.herokuapp.com).
- Deliverable D2: the YAML or JSON file containing the specification of the app API can be found at [this address](https://quality-time-bank.herokuapp.com/backend/spec.yaml).
- Deliverable D3: the SwaggerUI page of the same API is available at [this address](https://quality-time-bank.herokuapp.com/backend/swaggerui).
- Deliverable D4: the source code of D0 is available as a zip file at [this address](https://quality-time-bank.herokuapp.com/backend/app.zip).
- Deliverable D5: the address of the online source control repository is available [this address](https://github.com/Alenichel/CodiglioniDellOglioNichelini-HypermediaProject). We hereby declare that this is a private repository and, upon request, we will give access to the instructors.

## Specification

### Web Architecture

<div style="text-align: center;"><img src="/assets/img/WebArchitecture.png" width="75%" alt=""></div>

No HTML is rendered server side: the dynamic content of the pages is rendered by the client itself, using the data fetched via the API.

### API

#### REST compliance

The API follow the REST constraints:

- **Client-server architecture**: 
the client can only access the data storage using the provided API, allowing for independent evolution of the two components and deployment on different machines. 

- **Statelessness**: 
no client context is stored on the server between requests, and each request from any client contains all the information necessary to complete it.

- **Cacheability**:
as responses only depend on the request parameters, they may be cached by the browser to improve performances.

- **Uniform interface**: 
the interface is defined following the OpenAPI specification. Each resource is identified via a URI, and it can be accessed using HTTP. Messages are JSON-encoded and self-descriptive.

#### OpenAPI Resource models

- **Person**: 
it contains anagraphic data, information related to the association, such as the join date, a picture and contact information such as e-mail address and phone number.

- **Service**:
it contains identification data, a description, one or more pictures, and the identifier of the event in which it was presented (if presented in an event).

- **Event**:
it contains identification data, a description, one picture, and the identifier of the person which is the contact for it.

- **News**:
it contains identification data, a description, one picture, and the identifiers of the person, service or event that may be related to it.

- **SearchResult**:
it contains the name, the type and a picture of the result of a search on the site. 

### Data model

<div style="text-align: center;"><img src="/assets/img/ER.png" width="75%" alt=""></div>

Describe with an ER diagram the model used in the data layer of your web application. How these map to the OpenAPI data model?

## Implementation

- **Tools**
    - Webstorm and Visual Studio Code;
    - Google Chrome Developer Tools and Firefox to debug and test; 
    - Swagger Editor to write the API specification; 
    - Postman to test the API;
    - PgAdmin and psql to manage the PostgreSQL database.

- **Languages**
    - JavaScript.

- **Frameworks**
    - Knex.js to access the database from the application server;
    - Serve-static to serve static files over HTTP. 

### Discussion

The endpoints were generated using the Swagger codegen tool. For each endpoint, we made sure that the data returned by the database mirrored the structure defined in OpenAPI. The API was tested using the browser and Postman.

The web application is divided into three layers, according to the REST principles: 
- The presentation layer, implemented by the frontend of the site. The static assets are all located here.
- The business logic layer, implemented by the backend of the site.
- The data layer, implemented by the database, which contains the application data.

The presentation layer retrieves dynamic data only through the API offered by the business logic layer, which, in turn, is the only one that can access the data layer.

The web application does not include any session state, so there's no need to manage it.

The data model was managed using a relational database, namely PostgreSQL.

## Other information

### Task assignment

During the development, we identified two kinds of tasks: group tasks, which have been carried out by all three members video conferencing together, and individual tasks, completed independently by the members.

#### Group tasks

- Design: database design, final document review.
- Back end: API definition and testing, populating the database, deployment on Heroku.

#### Fabio Codiglioni

- Design: C-IDM and P-IDM diagrams
- Pages: introductory services, introductory events, introductory news, single news and search pages, header.

#### Luca dell'Oglio

- Design: L-IDM, scenarios
- Pages: about us, contact form, single service and single event pages.

#### Alessandro Nichelini

- Design: design in the small
- Pages: introductory people and person pages, home page, footer.

Each member handled both the front end and the back end parts of the pages they were assigned.

### Analysis of existing API

In order to guide the implementation of the API, we didn't perform any explicit analysis of an existing API; instead we based our choices on various API we worked on in past years, such as the ones provided by Netatmo and Google Maps.

### Learning outcome

This was the first full web application project for all the members of the group, so we all learned the basics of the web development process, in particular, how to develop, integrate and deploy the front end and back end parts of a working web architecture.

Fabio learnt JavaScript and how to use jQuery to manipulate HTML and create dynamic pages. He also understood how to use the Bootstrap grid system in order to obtain responsive layouts.

Luca learnt how to use Swagger to build RESTful APIs, how to serve static and dynamic content on a site, and how to use Javascript to serve content or to validate a form. He also took an interest on styling the content of a site using HTML and CSS, even if he didn't expect to.

Alessandro Nichelini