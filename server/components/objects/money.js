class Money {
    constructor(amount) {
        let money = this.splitCurr(amount);
        this.dollar = parseInt(money[0]);
        this.cent = parseInt(money[1]);
    }
    splitCurr(amount) {
        let re = new RegExp('^([0-9]+)\.([0-9][0-9])$');
        if (!re.test(amount)) {
            throw new Error("Invalid amount pattern! Please only enter a number with pattern '([0-9]+)\.([0-9][0-9])'");
        }
        return amount.split(".");
    }
    increase(amount) {
        let change = this.splitCurr(amount).map(Number);
        this.cent += change[1];
        this.dollar += change[0];
        while (this.cent > 99) {
            this.cent -= 100;
            this.dollar++;
        }
        return true;
    }
    decrease(amount) {
        let change = this.splitCurr(amount).map(Number);
        if ((this.dollar - change[0]) - (change[1] / 100) < 0) {
            throw new Error("Negative prices not allowed!");
        }
        this.dollar -= change[0];
        this.cent -= change[1];
        while (this.cent < 0) {
            this.cent += 100;
            this.dollar--;
        }

        return true;
    }
}

// let mon = new Money("15.37");
// mon.decrease("5.38");
// console.log([mon.dollar, mon.cent]);

module.exports = Money;