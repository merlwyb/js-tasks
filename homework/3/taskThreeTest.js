//import {bigNumbersSum} from "./taskTwo";
const {Product} = require('./taskThree');
const assert = require("assert");

describe("Тест",
    function () {
        before(function () {
            this.product1 = new Product('Belorussian cheese', 15, 54, 'Description 4373457');
            this.product2 = new Product('White cheese', 22, 22, 'Description 908491284333');
            this.product3 = new Product('Wine', 190, 15, 'Eescription 7489948333');
            this.product4 = new Product('Blue cheese', 33, 7, 'Description abcderfsdfgdsbb');
            this.product5 = new Product('Yellow cheese', 43, 3, 'Description abcderfgdfgh');

            this.products = [
                this.product1, this.product2, this.product3, this.product4, this.product5
            ];
        });
        it('Фильтр по имени', function () {
                //contains cheese
                let expectedContains = [
                    this.product1, this.product2, this.product4, this.product5
                ];
                //starts with wi
                let expectedStarts = [
                    this.product3
                ];
                //ends with e
                let expectedEnds = [
                    this.product1, this.product2, this.product3, this.product4, this.product5
                ]

                assert.deepStrictEqual(Product.filterByString(this.products, "name-contains-cheese"), expectedContains);
                assert.deepStrictEqual(Product.filterByString(this.products, "name-starts-wine"), expectedStarts);
                assert.deepStrictEqual(Product.filterByString(this.products, "name-ends-e"), expectedEnds);
            }
        );
        it('Фильтр по цене', function () {
                //<30
                let less = [
                    this.product1, this.product2
                ];
                //=15
                let equal = [
                    this.product1
                ];
                //>33
                let more = [
                    this.product3, this.product5
                ];
                //<=22
                let lessEqual = [
                    this.product1, this.product2
                ];
                //>=33
                let moreEqual = [
                    this.product3, this.product4, this.product5
                ];

                assert.deepStrictEqual(Product.filterByString(this.products, "price-<30"), less);
                assert.deepStrictEqual(Product.filterByString(this.products, "price-=15"), equal);
                assert.deepStrictEqual(Product.filterByString(this.products, "price->33"), more);
                assert.deepStrictEqual(Product.filterByString(this.products, "price-<=22"), lessEqual);
                assert.deepStrictEqual(Product.filterByString(this.products, "price->=33"), moreEqual);
            }
        );
        it('Фильтр по количеству', function () {
                //<22
                let less = [
                    this.product3, this.product4, this.product5
                ];
                //=3
                let equal = [
                    this.product5
                ];
                //>40
                let more = [
                    this.product1
                ];
                //<=7
                let lessEqual = [
                    this.product4, this.product5
                ];
                //>=22
                let moreEqual = [
                    this.product1, this.product2
                ];

                assert.deepStrictEqual(Product.filterByString(this.products, "quantity-<22"), less);
                assert.deepStrictEqual(Product.filterByString(this.products, "quantity-=3"), equal);
                assert.deepStrictEqual(Product.filterByString(this.products, "quantity->40"), more);
                assert.deepStrictEqual(Product.filterByString(this.products, "quantity-<=7"), lessEqual);
                assert.deepStrictEqual(Product.filterByString(this.products, "quantity->=22"), moreEqual);
            }
        );
        it('Фильтр по описанию', function () {
                //contains abcd
                let expectedContains = [
                    this.product4, this.product5
                ];
                //starts with Ee
                let expectedStarts = [
                    this.product3
                ];
                //ends with 333
                let expectedEnds = [
                    this.product2, this.product3
                ]

                assert.deepStrictEqual(Product.filterByString(this.products, "description-contains-abcd"), expectedContains);
                assert.deepStrictEqual(Product.filterByString(this.products, "description-starts-ee"), expectedStarts);
                assert.deepStrictEqual(Product.filterByString(this.products, "description-ends-333"), expectedEnds);
            }
        );
        it('Сложные фильтры', function () {
                //name contains cheese, price<=33, quantity>5
                let expected1 = [
                    this.product1, this.product2, this.product4
                ];
                //name contains 'e c', price<=50, quantity<50, description starts description
                let expected2 = [
                    this.product2,this.product4
                ];
                //name contains cheese, price<=33, quantity>5, description ends 312312312
                let expected3 = [];

                assert.deepStrictEqual(Product.filterByString(this.products, "name-contains-cheese&price-<=33&quantity->5"), expected1);
                assert.deepStrictEqual(Product.filterByString(this.products, "name-contains-e c&price-<=50&quantity-<50&description-starts-description"), expected2);
                assert.deepStrictEqual(Product.filterByString(this.products, "name-contains-cheese&price-<=33&quantity->5&description-ends-312312312"), expected3);
            }
        );

    }
);