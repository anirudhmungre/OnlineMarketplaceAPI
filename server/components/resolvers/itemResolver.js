var items = [];
let i_id = 0;

export default {
    // Query
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

    // Mutations
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
}