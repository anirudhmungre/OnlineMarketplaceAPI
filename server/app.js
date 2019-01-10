const express = require('express');
const graphqlHTTP = require('express-graphql');
const { itemSchema, itemRoot } = require(__dirname + '/components/api/itemAPI');

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: itemSchema,
  rootValue: itemRoot,
  graphiql: true
}));

// Item API Endpoints
app.post('/allItems', graphqlHTTP({
    schema: itemSchema,
    rootValue: itemRoot,
    graphiql: false
}));

app.post('/newItem', graphqlHTTP({
    schema: itemSchema,
    rootValue: itemRoot,
    graphiql: false
}));

app.post('/addItem', graphqlHTTP({
    schema: itemSchema,
    rootValue: itemRoot,
    graphiql: false
}));

app.post('/removeItem', graphqlHTTP({
    schema: itemSchema,
    rootValue: itemRoot,
    graphiql: false
}));

// Cart API Endpoints


app.listen(5000);
console.log('Running a GraphQL API server at localhost:5000/graphql');