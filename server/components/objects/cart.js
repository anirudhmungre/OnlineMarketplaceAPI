class Cart {
    constructor(id) {
        this.cart_id = id;
        this.cart_items = [];
        this.total = new Money("0.00");
    }
    errorCheck(item_id, quantity) {
        if (item_id > items.length - 1) {
            throw new Error("Item id " + item_id + " does not exist!");
        }
        else if (quantity > items[item_id].quantity) {
            throw new Error("Item quantity requested unavailable!");
        }
    }
    addToCart(item_id, quantity) {
        this.errorCheck(item_id, quantity);
        this.cart_items.push([items[item_id], quantity]);
        for (let i = 0; i < quantity; i++){
            this.total.increase(items[item_id].price);
        }
    }
    removeFromCart(item_id, quantity) {
        this.errorCheck(item_id, quantity);
        let found = false;
        for (let i = 0; i < cart_items.length; i++) {
            if (cart_items[i][0].item_id == item_id) {
                found = true;
                if (cart_items[i][1] - quantity <= 0) {
                    this.cart_items.remove(i);
                    break;
                }
                else if (cart_items[i][1] - quantity > 0) {
                    this.cart_items[i][1] -= quantity;
                    break;
                }
            }
        }
        if (!found) {
            throw new Error("Item that is trying to be removed is not found!");
        }
        else{
            for (let i = 0; i < quantity; i++){
                this.total.decrease(items[item_id].price);
            }
        }
    }
}

module.exports = Cart;