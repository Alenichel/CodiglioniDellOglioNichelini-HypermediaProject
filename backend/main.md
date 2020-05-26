# Documentation of the Backend part

> Deliverable D1
>
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

Describe here, with a diagram, the components of your web application and how they interact. Highlight which parts belong to the application layer, data layer or presentation layer. How did you ensure that HTML is not rendered server side?

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

Describe with an ER diagram the model used in the data layer of your web application. How these map to the OpenAPI data model?

## Implementation

- **Tools**
  - Webstorm and Visual Studio Code;
  - Google Chrome Developer Tools to debug and test; 
  - Swagger Editor to write the API specification; 
  - PgAdmin and psql to manage the PostgreSQL database.

- **Languages**
  - JavaScript.

- **Frameworks**
  - Knex.js to access the database from the application server;
  - Serve-static to serve static files over HTTP. 

### Discussion
Describe here:
- How did you make sure your web application adheres to the provided OpenAPI specification? Which method did you use to test all APIs endpoints against the expected response?
- Why do you think your web application adheres to common practices to partition a REST-based web application (static assets vs. application data)
- Describe synthetically why and how did you manage session state, what are the state change triggering actions (e.g., POST to login etc..).
- Which technology did you use (relational or a no-SQL database) for managing the data model?

## Other information

### Task assignment

Describe here how development tasks have been subdivided among members of the group, e.g.:

> - Foo worked on front end (80%) and OpenAPI Spec (20% of the time) > - Bar worked on ....
>
### Analysis of existing API

Describe here the research of (full or part of) existing APIs that are similar in objectives and scope to the one implemented, that have possibly guided implementation choices (these should not be necessarily OpenAPI implementations). Toy APIs (such as the Swagger's Pet Store) or the example shown during lectures are not a valid response.

Use TWO or more items of the form:

> We took (full/partial) inspiration from API <XYZ>(link) for the part of the 
> API that manages <ABC> because of <REASON>.

Or

> For the part of the API that manages <ABC> we considered/studied <XYZ>(link)
> because of <REASON> but wasn't completely fitting to our purpose because of > <REASON>.

### Learning outcome

What was the most important thing all the members have learned while
developing this part of the project, what questions remained unanswered, how you will use what you've learned in your everyday life?
Examples:
- Foo learned to write SQL queries and Javascript but wanted to know more about caching, he's probably going to create his own startup with what she has learned
- Bar learned how to deploy on a cloud platform, he would have liked to know more about promises for asynchronous code..