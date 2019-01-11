const express = require('express');
const graphqlHTTP = require('express-graphql');
const { item_schema, item_root } = require('../components/api/itemAPI');

let router = express.Router();

// Item API Endpoints
router.post('/allItems', graphqlHTTP({
    schema: item_schema,
    rootValue: item_root,
    graphiql: false
}));

router.post('/newItem', graphqlHTTP({
    schema: item_schema,
    rootValue: item_root,
    graphiql: false
}));

router.post('/addItem', graphqlHTTP({
    schema: item_schema,
    rootValue: item_root,
    graphiql: false
}));

router.post('/removeItem', graphqlHTTP({
    schema: item_schema,
    rootValue: item_root,
    graphiql: false
}));

module.exports = router;