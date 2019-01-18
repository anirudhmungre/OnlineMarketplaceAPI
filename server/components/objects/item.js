class Item {
    constructor(id, name, price, q) {
        this.item_id = id;
        this.title = name;
        this.price = price;
        this.inventory_count = q;
    }

    add(x) {
        this.inventory_count += x;
    }

    remove(x) {
        if (this.inventory_count - x < 0) {
            throw new Error("Cannot remove " + x + " items. Total below 0!");
        }
        this.inventory_count -= x;
    }
}

module.exports = Item;