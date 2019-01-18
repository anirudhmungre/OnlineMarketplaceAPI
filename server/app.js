const express = require('express');
const graphqlHTTP = require('express-graphql');
const items = require('./routes/itemRoute');
const carts = require('./routes/cartRoute');
const { item_schema, item_root } = require('./components/api/itemAPI');

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: item_schema,
  rootValue: item_root,
  graphiql: true
}));

app.use('/items', items);
app.use('/carts', carts);


app.listen(5000);
console.log('Running a GraphQL API server at localhost:5000/graphql');