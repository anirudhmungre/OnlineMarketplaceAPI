const { buildSchema } = require('graphql');
const Item = require('../objects/item')

let items = [];
let itemId = 0;

// Item Schema
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
    addItem: ({ itemId , quantity = 1}) => {
        try {
            quantity = parseInt(quantity);
            if (quantity < 0){
                throw new Error ("Cannot add a negative number of items!");
            }
            items[itemId].add(quantity);
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    removeItem: ({ itemId, quantity = 1 }) => {
        try {
            quantity = parseInt(quantity);
            for (let i = 0; i < items.length; i++){
                if (items[i].itemId === itemId){
                    if (items[itemId].inventory_count - quantity < 0){
                        throw new Error (quantity + " items not available to remove!");
                    }
                    items[itemId].remove(quantity);
                    return true;
                }
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }
};

module.exports = { itemSchema, itemRoot };