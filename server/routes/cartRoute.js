const express = require('express');
const graphqlHTTP = require('express-graphql');
const { cart_schema, cart_root } = require('../components/api/cartAPI');

let router = express.Router();

router.get('/newCart', graphqlHTTP({
    schema: cart_schema,
    rootValue: cart_root,
    graphiql: false
}));

router.post('/cartItems', graphqlHTTP({
    schema: cart_schema,
    rootValue: cart_root,
    graphiql: false
}));

router.post('/addToCart', graphqlHTTP({
    schema: cart_schema,
    rootValue: cart_root,
    graphiql: false
}));

router.post('/removeFromCart', graphqlHTTP({
    schema: cart_schema,
    rootValue: cart_root,
    graphiql: false
}));

// router.post('/cartTotal', graphqlHTTP({
//     schema: cart_schema,
//     rootValue: cart_root,
//     graphiql: false
// }));

module.exports = router;