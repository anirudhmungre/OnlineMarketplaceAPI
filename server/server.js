const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Item = require(__dirname + '/item')

var items = [];

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Item{
    itemID: Int, 
    itemName: String, 
    quantity: Int
  }
  type Query {
    newItem(itemName: String, quantity: Int!): Boolean,
    allItems(onlyAvail: Boolean): [Item],
    addItem(itemId: Int!): Boolean,
    removeItem(itemId: Int!): Boolean
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
    allItems: ({onlyAvail = false}) => {
        if(onlyAvail){
            let avail = [];
            items.forEach(item => {
                if (item.quantity > 0){
                    avail.push(item);
                }
            });
            return avail;
        }
        return items;
    },
    newItem: ({ itemName, quantity }) => {
        try {
            items.push(new Item(items.length, itemName, quantity));
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    addItem: (itemId) => {
        try {
            items[itemId].add();
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    removeItem: (itemId) => {
        try {
            items[itemId].remove();
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    }
};

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.post('/allItems', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false
}));

app.post('/newItem', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false
}));

app.post('/addItem', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false
}));

app.post('/removeItem', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false
}));

app.listen(5000);
console.log('Running a GraphQL API server at localhost:5000/graphql');