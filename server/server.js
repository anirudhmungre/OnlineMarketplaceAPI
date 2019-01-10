const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const Item = require(__dirname + '/item')

let items = [];
let itemId = 0;

// Construct a schema, using GraphQL schema language
let itemSchema = buildSchema(`
    type Item{
        itemId: Int, 
        title: String, 
        inventory_count: Int
    }
    type Query {
        newItem(title: String, inventory_count: Int!): Boolean,
        allItems(onlyAvail: Boolean): [Item],
        addItem(itemId: Int!): Boolean,
        removeItem(itemId: Int!): Boolean
    }
`);

// The root provides a resolver function for each API endpoint
let itemRoot = {
    allItems: ({ onlyAvail = false }) => {
        if(onlyAvail){
            let avail = [];
            items.forEach(item => {
                if (item.inventory_count > 0){
                    avail.push(item);
                }
            });
            return avail;
        }
        return items;
    },
    newItem: ({ title, inventory_count }) => {
        try {
            inventory_count = parseInt(inventory_count);
            if (inventory_count < 0){
                throw new Error ("Negative inventory count not allowed!");
            }
            items.push(new Item(itemId, title, inventory_count));
            itemId++;
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    addItem: ({ itemId }) => {
        try {
            items[itemId].add();
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    removeItem: ({ itemId }) => {
        try {
            for (let i = 0; i < items.length; i++){
                if (items[i].itemId === itemId){
                    items[itemId].remove();
                    return true;
                }
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }
};

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