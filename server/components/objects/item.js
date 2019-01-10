class Item{
    constructor(id, name, q){
        this.itemId = id;
        this.title = name;
        this.inventory_count = q;
    }

    add(x){
        this.inventory_count += x;
    }

    remove(){
        if (!this.inventory_count){
            throw new Error("Already 0 items");
        }
        this.inventory_count--;
    }
}

module.exports = Item;