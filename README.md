# portfolio-visit-counter-api

## Sample `.env` file

```
POSTGRES_URI=postgres://postgres:postgres@localhost:5432/portfolio
HASURA_GRAPHQL_ADMIN_SECRET=secret
HASURA_ACTION_SECRET=action_secret
HASURA_GRAPHQL_URL=http://localhost:4040/v1/graphql
EXPRESS_PORT=4041
HASURA_GRAPHQL_SERVER_PORT=4040
ACTION_BASE_URL=http://localhost:4041
CORS_ALLOWED_SITES=["http://localhost:8081"]
```
## Build Setup

```bash
# up hasura and express contaiiners
$ yarn dev

# down hasura and express contaiiners
$ yarn down

# apply hasura migration and metadata
$ yarn hasura:migrate

# open the hasura console on browser
$ yarn hasura:console

# rebuild the express when change is made
$ yarn rebuild
```

