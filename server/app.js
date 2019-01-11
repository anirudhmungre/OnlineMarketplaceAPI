const express = require('express');
const graphqlHTTP = require('express-graphql');
const { item_schema, item_root } = require(__dirname + '/components/api/itemAPI');

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: item_schema,
  rootValue: item_root,
  graphiql: true
}));

// Item API Endpoints
app.post('/allItems', graphqlHTTP({
    schema: item_schema,
    rootValue: item_root,
    graphiql: false
}));

app.post('/newItem', graphqlHTTP({
    schema: item_schema,
    rootValue: item_root,
    graphiql: false
}));

app.post('/addItem', graphqlHTTP({
    schema: item_schema,
    rootValue: item_root,
    graphiql: false
}));

app.post('/removeItem', graphqlHTTP({
    schema: item_schema,
    rootValue: item_root,
    graphiql: false
}));

// Cart API Endpoints


app.listen(5000);
console.log('Running a GraphQL API server at localhost:5000/graphql');