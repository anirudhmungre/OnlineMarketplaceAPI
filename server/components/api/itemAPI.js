const { buildSchema } = require('graphql');
const Item = require('../objects/item');
const Money = require('../objects/money');

var items = [];
let i_id = 0;

// Item Schema
let item_schema = buildSchema(`
    type Money{
        dollar: Int,
        cent: Int
    }
    type Item{
        item_id: Int, 
        title: String, 
        price: Money,
        inventory_count: Int
    }
    type Query {
        newItem(title: String, amount: String, inventory_count: Int!): Boolean,
        allItems(only_avail: Boolean): [Item],
        addItem(item_id: Int!): Boolean,
        removeItem(item_id: Int!, quantity: Int): Boolean
    }
`);

// The root provides a resolver function for each API endpoint
let item_root = {
    allItems: ({ only_avail = false }) => {
        if (only_avail) {
            let avail = [];
            items.forEach(item => {
                if (item.inventory_count > 0) {
                    avail.push(item);
                }
            });
            return avail;
        }
        return items;
    },
    newItem: ({ title, amount, inventory_count }) => {
        try {
            let price = new Money(amount);
            inventory_count = parseInt(inventory_count);
            if (inventory_count < 0) {
                throw new Error("Negative inventory count not allowed!");
            }
            items.push(new Item(i_id, title, price, inventory_count));
            i_id++;
            delete price;
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    addItem: ({ item_id, quantity = 1 }) => {
        try {
            quantity = parseInt(quantity);
            if (quantity < 0) {
                throw new Error("Cannot add a negative number of items!");
            }
            items[item_id].add(quantity);
        } catch (err) {
            console.error(err);
            return false;
        }
        return true;
    },
    removeItem: ({ item_id, quantity = 1 }) => {
        try {
            quantity = parseInt(quantity);
            for (let i = 0; i < items.length; i++) {
                if (items[i].item_id === item_id) {
                    items[item_id].remove(quantity);
                    return true;
                }
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }
};

module.exports = { item_schema, item_root };