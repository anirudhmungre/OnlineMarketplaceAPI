class Money{
    constructor(amount){
        let money = this.splitCurr(amount);
        this.dollar = parseInt(money[0]);
        this.cent = parseInt(money[1]);
    }
    splitCurr(amount){
        let re = new RegExp('^([0-9]+)\.([0-9][0-9])$');
        if(!re.test(amount)){
            throw new Error("Invalid amount pattern! Please only enter a number with pattern '([0-9]+)\.([0-9][0-9])'");
        }
        return amount.split(".");
    }
    increase(amount){
        amount = this.splitCurr(amount);
        this.cent += amount.cent;
        while(this.cent > 99){
            this.cent -= 100;
            this.dollar++;
        }
        this.dollar += amount.dollar;
        return true;
    }
    decrease(amount){
        amount = this.splitCurr(amount);
        this.cent -= amount.cent;
        while (this.cent < 0){
            this.cent += 100;
            this.dollar--;
        }
        this.dollar -= amount.dollar;
        if (this.dollar < 0){
            throw new Error("Negative prices not allowed!");
        }
        return true;
    }
}

module.exports = Money;