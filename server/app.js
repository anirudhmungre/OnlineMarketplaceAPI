const express = require('express');
const graphqlHTTP = require('express-graphql');
const items = require('./routes/itemRoute');
const carts = require('./routes/cartRoute');
// const { item_schema, item_root } = require('./components/api/itemAPI');

const merged_types = require('./components/typeDefs');

const item_resolver = require('./components/resolvers/itemResolver');
const cart_resolver = require('./components/resolvers/cartResolver');


const merged_resolvers = mergeResolvers([
  item_resolver,
  cart_resolver
]);

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: merged_types,
  rootValue: merged_resolvers,
  graphiql: true
}));

app.use('/items', items);
app.use('/carts', carts);


app.listen(5000);
console.log('Running a GraphQL API server at localhost:5000/graphql');