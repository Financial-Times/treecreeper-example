# Treecreeper Example
Example of how to use treecreeper components to build an API

## Development

### Prerequisities

-   nodejs 12
-   [docker](https://www.docker.com/get-docker)
-   [wget](https://www.gnu.org/software/wget/) (if using MacOS this won't be preinstalled)

### Set up

Install dependencies:

```shell
make install
```

This will create a neo4j database in the `/neo4j` directory and also instal all required node packages

### Running the app

```shell
./scripts/neo4j-plugins
make run
```

This runs the DB, node process and a webpack build in watch mode

 - http://localhost:8888/MainType/create will create a `MainType` record 
 - http://localhost:8888/graphiql is teh graphiql interface for the graphql endpoint
 - rest API at `/api/rest`
 - GraphQL API at `/api/graphql`
