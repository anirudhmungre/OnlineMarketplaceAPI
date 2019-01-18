const { buildSchema } = require('graphql');
// const Item = require('../objects/item');
const Money = require('../objects/money');
const Cart = require('../objects/cart');

var carts = [];
let c_id = 0;

let cart_schema = buildSchema(`
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
    type Cart{
        cart_id: Int,
        cart_items: [Item],
        total: Money
    }
    type Query {
        newCart: Cart,
        cartItems(cart_id: Int!): [Item],
        addToCart(cart_id: Int!, item_id: Int!, quantity: Int): Boolean,
        removeFromCart(cart_id: Int!, item_id: Int!, quantity: Int): Boolean
    }
`);

let cart_root = {
    newCart: () => {
        carts.push(new Cart(c_id));
        return carts[c_id++];
    },
    cartItems: ({ cart_id }) => {
        try {
            if (cart_id > carts.length - 1) {
                throw new Error("Cart id " + cart_id + " does not exist!");
            }
            return carts[cart_id].cart_items;
        } catch (err) {
            console.err(err);
            return [];
        }
    },
    addToCart: ({ cart_id, item_id, quantity = 1 }) => {
        try {
            if (this.cart_id > carts.length - 1) {
                throw new Error("Cart id " + cart_id + " does not exist!");
            }
            carts[cart_id].addToCart(items[item_id], quantity);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    removeFromCart: ({ cart_id, item_id, quantity = 1 }) => {
        try {
            if (cart_id > carts.length - 1) {
                throw new Error("Cart id " + cart_id + " does not exist!");
            }
            carts[cart_id].removeFromCart(items[item_id], quantity);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    },
    // cartTotal: ({ cart_id }) => {
    //     let total;
    //     try {
    //         total = new Money("0.00");
    //         if (cart_id > carts.length - 1) {
    //             throw new Error("Cart id " + cart_id + " does not exist!");
    //         }
    //         for (let i = 0; i < cart[cart_id].cart_items.length; i++) {
    //             total.increase(cart[cart_id].cart_items[i].price);
    //         }
    //         return total;
    //     } catch (err) {
    //         console.error(err);
    //         return total;
    //     }
    // }
    // purchase: ({ cart_id }) => {
    //     try {

    //     } catch (err) {
    //         console.error(err);
    //         return false;
    //     }
    // }
};

module.exports = { cart_schema, cart_root };
