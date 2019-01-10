class Item{
    constructor(itemId, itemName, quantity){
        this.itemId = itemId;
        this.itemName = itemName;
        this.quantity = quantity;
    }

    add(){
        this.quantity++;
    }

    remove(){
        if (!this.quantity){
            throw new Error("Already 0 items");
        }
        this.quantity--;
    }
}

module.exports = Item;