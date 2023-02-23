// 3. Создать класс данных “Товар”
// С полями
// Название
// Цена
// Количество
// Описание
// Наполнить массив объектами такого класса.
//     Написать метод, который получает строку вида
// “name-contains-fd&price-=2-&quantity->5&description-ends-abc”
// “name-starts-fd&quantity=5”
// На выходе возвращает массив, только с подходящими объектами
// возможны (contains, starts, ends для строковых и <, =, >, <=, >= для числовых)

class Product {
    #name;
    #price;
    #quantity;
    #description;

    constructor(name, price, quantity, description) {
        this.#name = name;
        this.#price = price;
        this.#quantity = quantity;
        this.#description = description;
    }

    propertyValues = {
        'name': () => this.#name.toLowerCase(),
        'price': () => this.#price,
        'quantity': () => this.#quantity,
        'description': () => this.#description.toLowerCase()
    }
    conditions = {
        'contains': (property, cond) => property.includes(cond),
        'starts': (property, cond) => property.startsWith(cond),
        'ends': (property, cond) => property.endsWith(cond),
        '>': (property, cond) => property > cond,
        '=': (property, cond) => property === cond,
        '<': (property, cond) => property < cond,
        '<=': (property, cond) => property <= cond,
        '>=': (property, cond) => property >= cond,
    }

    toString() {
        return `Product{ name: ${this.#name}, price: ${this.#price}, ` +
            `quantity: ${this.#quantity}, description: ${this.#description} }`;
    }


    checkCondition(propertyName, condition, valueCond) {
        let property = this.propertyValues[propertyName]()
        return (propertyName === 'name' || propertyName === 'description') ?
            this.conditions[condition](property, valueCond) : this.conditions[condition](property, +valueCond);
    }

    checkAllConditions(arrayOfConditions) {
        for (let condition of arrayOfConditions) {
            if (!this.checkCondition(condition[0], condition[1], condition[2])) {
                return false;
            }
        }
        return true;
    }

    static filterByString(products, conditionsString) {
        let resultArray = products.map(x => x);

        let arrayOfConditions = []
        for (let conditions of conditionsString.split('&')) {
            arrayOfConditions.push(this.#parseCondition(conditions));
        }

        return resultArray.filter(el => el.checkAllConditions(arrayOfConditions));
    }

    static #parseCondition(conditionString) {
        let tempArr = conditionString.split('-')
        let propertyName = '';
        let condition = '';
        let valueCond = '';
        if (tempArr.length === 3) {
            propertyName = tempArr[0];
            condition = tempArr[1];
            valueCond = tempArr[2];
        } else if (tempArr.length === 2) {
            propertyName = tempArr[0]
            if (!/\d/.test(tempArr[1][0]) && !/\d/.test(tempArr[1][1])) {
                condition = tempArr[1].substring(0, 2);
                valueCond = tempArr[1].substring(2);
            } else {
                condition = tempArr[1].substring(0, 1);
                valueCond = tempArr[1].substring(1);
            }

        }

        return [propertyName, condition, valueCond];
    }

}

module.exports = {Product}