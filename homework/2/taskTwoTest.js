//import {bigNumbersSum} from "./taskTwo";
const {bigNumbersSum, bigNumbersDif, bigNumbersMult, bigNumbersDiv} = require('./taskTwo');
const assert = require("assert");

describe("Сумма чисел",
    function () {
        it('Целые', function () {
            assert.strictEqual(bigNumbersSum("11", "11"), "22");
            assert.strictEqual(bigNumbersSum("12", "0"), "12");
            assert.strictEqual(bigNumbersSum("0", "12"), "12");
            assert.strictEqual(bigNumbersSum("0", "0"), "0");
            assert.strictEqual(bigNumbersSum("10000000000000", "1"), "10000000000001");
            assert.strictEqual(bigNumbersSum("10000000000009", "1"), "10000000000010");
            assert.strictEqual(bigNumbersSum("1", "10000000000000"), "10000000000001");
            assert.strictEqual(bigNumbersSum("1", "10000000000009"), "10000000000010");
        });

        it('Дробные', function () {
            assert.strictEqual(bigNumbersSum("11.11", "11.11"), "22.22");
            assert.strictEqual(bigNumbersSum("123", "0.123"), "123.123");
            assert.strictEqual(bigNumbersSum("0.123", "123"), "123.123");
            assert.strictEqual(bigNumbersSum("0.5", "0.5"), "1");
            assert.strictEqual(bigNumbersSum("1.9999999999999999999", "0.0000000000000000001"), "2");
            assert.strictEqual(bigNumbersSum("0.0000000000000000001", "1.9999999999999999999"), "2");
            assert.strictEqual(bigNumbersSum("1.0000000000001", "1.1"), "2.1000000000001");
            assert.strictEqual(bigNumbersSum("1.1", "1.0000000000001"), "2.1000000000001");
        });

        it('Отрицательные', function () {
            assert.strictEqual(bigNumbersSum("-1", "1"), "0");
            assert.strictEqual(bigNumbersSum("1", "-1"), "0");
            assert.strictEqual(bigNumbersSum("-2", "-2"), "-4");
        });

        it("Обработка нестандартных вызовов - пустой, null, undefined", function () {
            assert.strictEqual(bigNumbersSum('', ''), '0');
            assert.strictEqual(bigNumbersSum('', '1'), '1');
            assert.strictEqual(bigNumbersSum('1', ''), '1');
            assert.strictEqual(bigNumbersSum(null, '12'), '0');
            assert.strictEqual(bigNumbersSum('12', null), '0');
            assert.strictEqual(bigNumbersSum(undefined, '123'), '0');
            assert.strictEqual(bigNumbersSum('123', undefined), '0');
        });
    }
);

describe("Разность чисел",
    function () {
        it('Целые', function () {
            assert.strictEqual(bigNumbersDif("11", "11"), "0");
            assert.strictEqual(bigNumbersDif("12", "0"), "12");
            assert.strictEqual(bigNumbersDif("0", "12"), "-12");
            assert.strictEqual(bigNumbersDif("0", "0"), "0");
            assert.strictEqual(bigNumbersDif("10000000000000", "1"), "9999999999999");
            assert.strictEqual(bigNumbersDif("1", "10000000000000"), "-9999999999999");
        });

        it('Дробные', function () {
            assert.strictEqual(bigNumbersDif("11.11", "11.11"), "0");
            assert.strictEqual(bigNumbersDif("1", "0.5"), "0.5");
            assert.strictEqual(bigNumbersDif("0.5", "1"), "-0.5");
            assert.strictEqual(bigNumbersDif("0.5", "0.5"), "0");
            assert.strictEqual(bigNumbersDif("1", "0.0000000000000000000001"), "0.9999999999999999999999");
            assert.strictEqual(bigNumbersDif("0.0000000000000000000001", "1"), "-0.9999999999999999999999");

        });

        it('Отрицательные', function () {
            assert.strictEqual(bigNumbersDif("-1", "1"), "-2");
            assert.strictEqual(bigNumbersDif("1", "-1"), "2");
            assert.strictEqual(bigNumbersDif("-2", "-2"), "0");
            assert.strictEqual(bigNumbersDif("-1", "1"), "-2");
            assert.strictEqual(bigNumbersDif("1", "-1"), "2");
            assert.strictEqual(bigNumbersDif("-2", "-2"), "0");
        });

        it("Обработка нестандартных вызовов - пустой, null, undefined", function () {
            assert.strictEqual(bigNumbersDif('', ''), '0');
            assert.strictEqual(bigNumbersDif('', '1'), '-1');
            assert.strictEqual(bigNumbersDif('1', ''), '1');
            assert.strictEqual(bigNumbersDif(null, '12'), '0');
            assert.strictEqual(bigNumbersDif('12', null), '0');
            assert.strictEqual(bigNumbersDif(undefined, '123'), '0');
            assert.strictEqual(bigNumbersDif('123', undefined), '0');
        });
    }
);

describe("Умножение чисел",
    function () {
        it('Целые', function () {
            assert.strictEqual(bigNumbersMult("12", "0"), "0");
            assert.strictEqual(bigNumbersMult("0", "12"), "0");
            assert.strictEqual(bigNumbersMult("0", "0"), "0");
            assert.strictEqual(bigNumbersMult("500000000000", "10"), "5000000000000");
            assert.strictEqual(bigNumbersMult("10", "500000000000"), "5000000000000");
        });

        it('Дробные', function () {
            assert.strictEqual(bigNumbersMult("11.11", "5"), "55.55");
            assert.strictEqual(bigNumbersMult("5", "11.11"), "55.55");
            assert.strictEqual(bigNumbersMult("55.44", "11.11"), "615.9384");
            assert.strictEqual(bigNumbersMult("11.11", "55.44"), "615.9384");
            assert.strictEqual(bigNumbersMult("11.0001", "0"), "0");
            assert.strictEqual(bigNumbersMult("0", "11.0001"), "0");
            assert.strictEqual(bigNumbersMult("1", "0.0000000000000000000001"), "0.0000000000000000000001");
            assert.strictEqual(bigNumbersMult("0.0000000000000000000001", "1"), "0.0000000000000000000001");

        });

        it('Отрицательные', function () {
            assert.strictEqual(bigNumbersMult("-1", "1"), "-1");
            assert.strictEqual(bigNumbersMult("1", "-1"), "-1");
            assert.strictEqual(bigNumbersMult("-2", "-2"), "4");
            assert.strictEqual(bigNumbersMult("-100", "5"), "-500");
            assert.strictEqual(bigNumbersMult("5", "-100"), "-500");
            assert.strictEqual(bigNumbersMult("-999999999", "-1"), "999999999");
        });

        it("Обработка нестандартных вызовов - пустой, null, undefined", function () {
            assert.strictEqual(bigNumbersMult('', ''), '0');
            assert.strictEqual(bigNumbersMult('', '1'), '0');
            assert.strictEqual(bigNumbersMult('1', ''), '0');
            assert.strictEqual(bigNumbersMult(null, '12'), '0');
            assert.strictEqual(bigNumbersMult('12', null), '0');
            assert.strictEqual(bigNumbersMult(undefined, '123'), '0');
            assert.strictEqual(bigNumbersMult('123', undefined), '0');
        });
    }
);

describe("Деление чисел",
    function () {
        it('Целые', function () {
            assert.strictEqual(bigNumbersDiv("12", 2), "6");
            assert.strictEqual(bigNumbersDiv("2", 12), "0");
            assert.strictEqual(bigNumbersDiv("20", 10), "2");
            assert.strictEqual(bigNumbersDiv("10", 20), "0");
            assert.strictEqual(bigNumbersDiv("257658468435738495467345674237568674754631231249", 1242512452), "207368922557677913289311384895133972270");
            assert.strictEqual(bigNumbersDiv("500000000000", 10), "50000000000");
            assert.strictEqual(bigNumbersDiv("10", 0), Infinity);
        });

        it("Обработка нестандартных вызовов - пустой, null, undefined", function () {
            assert.strictEqual(bigNumbersDiv('', ), '0');
            assert.strictEqual(bigNumbersDiv('', 1), '0');
            assert.strictEqual(bigNumbersDiv('1', ), '0');
            assert.strictEqual(bigNumbersDiv(null, '12'), '0');
            assert.strictEqual(bigNumbersDiv('12', null), '0');
            assert.strictEqual(bigNumbersDiv(undefined, '123'), '0');
            assert.strictEqual(bigNumbersDiv('123', undefined), '0');
        });
    }
);
