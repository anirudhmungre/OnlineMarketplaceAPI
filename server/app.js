// var { items, carts } = require('./globals');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const item_route = require('./routes/itemRoute');
const cart_route = require('./routes/cartRoute');

const merged_types = require('./components/typeDefs');
const merged_resolvers = require('./components/resolverDefs');

const schema = buildSchema(merged_types);

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: merged_resolvers,
  graphiql: true
}));

app.use('/items', item_route);
app.use('/carts', cart_route);


app.listen(5000);
console.log('Running a GraphQL API server at localhost:5000/graphql');