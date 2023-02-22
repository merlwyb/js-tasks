const {transformString, uniqueWordCount, uppercaseFirst, wordCount} = require('./taskOne');
const assert = require("assert");

describe("1.1. Преобразование строки к нижнему регистру, но первая буква большая.",
    function () {
        it('Переводит первый символ в верхний регистр', function () {
            assert.strictEqual(uppercaseFirst("john"), "John");
            assert.strictEqual(uppercaseFirst("a"), "A");
            assert.strictEqual(uppercaseFirst("ab"), "Ab");
            assert.strictEqual(uppercaseFirst("1a"), "1a");
            assert.strictEqual(uppercaseFirst("a1"), "A1");
            assert.strictEqual(uppercaseFirst("a "), "A ");
            assert.strictEqual(uppercaseFirst(" a"), " a");
        });

        it("Обработка строки - пустой, null, undefined", function () {
            assert.strictEqual(uppercaseFirst(''), '');
            assert.strictEqual(uppercaseFirst(' '), ' ');
            assert.strictEqual(uppercaseFirst('  '), '  ');
            assert.strictEqual(uppercaseFirst(null), "");
            assert.strictEqual(uppercaseFirst(undefined), "");
        });
    }
);

describe("1.2. Преобразование строки с целью правильно расстановки пробелов.",
    function () {
        it("Преобразование строки", function () {
            assert.strictEqual(transformString("Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены."),
                "Вот пример строки, в которой используются знаки препинания. После знаков должны стоять пробелы, а перед знаками их быть не должно. Если есть лишние подряд идущие пробелы, они должны быть устранены.");
            assert.strictEqual(transformString(",.;:!?)%'\"}]"),
                ", . ; : ! ? ) % ' \" } ]");
            assert.strictEqual(transformString("Абв.аб"),
                "Абв. аб");
            assert.strictEqual(transformString("Abcd"),
                "Abcd");
        });
        it("Обработка строки - пустой, null, undefined", function () {
            assert.strictEqual(transformString(""), "");
            assert.strictEqual(transformString(null), "");
            assert.strictEqual(transformString(undefined), "");
        });
    }
);

describe("1.3. Посдчитывает кол-во слов в строке.",
    function () {
        it("Количество строк в строке", function () {
            assert.strictEqual(wordCount("Abc abc"), 2);
            assert.strictEqual(wordCount("abc"), 1);
            assert.strictEqual(wordCount(" abc"), 1);
            assert.strictEqual(wordCount("abc "), 1);
        });
        it("Обработка строки - пустой, null, undefined", function () {
            assert.strictEqual(wordCount(""), 1);
            assert.strictEqual(wordCount(null), 0);
            assert.strictEqual(wordCount(undefined), 0);
        });
    }
);

describe("1.4. Посдчитывает количество уникальных слов.",
    function () {
        it("Количество уникальных слов в строке", function () {
            assert.strictEqual(uniqueWordCount("Текст, в котором слово текст несколько раз встречается и слово тоже"), "текст - 2 раза, слово - 2 раза, в - 1 раз, котором - 1 раз, несколько - 1 раз, раз - 1 раз, встречается - 1 раз, и - 1 раз, тоже - 1 раз");
            assert.strictEqual(uniqueWordCount("Abc abc"), "abc - 2 раза");
            assert.strictEqual(uniqueWordCount("ac ad"), "ac - 1 раз, ad - 1 раз");
            assert.strictEqual(uniqueWordCount(" Ac aC AC ac ad AD"), 'ac - 4 раза, ad - 2 раза');
            assert.strictEqual(uniqueWordCount("abc "), "abc - 1 раз");
            assert.strictEqual(uniqueWordCount(" abc"), "abc - 1 раз");
            assert.strictEqual(uniqueWordCount(" abc "), "abc - 1 раз");
            assert.strictEqual(uniqueWordCount(" 123 123 "), "123 - 2 раза");
        });
        it("Обработка строки - пустой, null, undefined", function () {
            assert.strictEqual(uniqueWordCount("        "), "");
            assert.strictEqual(uniqueWordCount(" "), "");
            assert.strictEqual(uniqueWordCount(""), "");
            assert.strictEqual(uniqueWordCount(null), "");
            assert.strictEqual(uniqueWordCount(undefined), "");
        });
    }
);