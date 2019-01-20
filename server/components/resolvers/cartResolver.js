var carts = [];
let c_id = 0;

export default {
    // Query
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

    // Mutations
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
    }
}