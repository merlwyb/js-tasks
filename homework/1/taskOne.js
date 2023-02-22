// 1. Написать модуль, который будет включать в себя следующие методы.
// 1.1. Преобразование строки к нижнему регистру, но первая буква большая.
function uppercaseFirst(str) {
    if (str === null || str === undefined)
        return "";
    if (str.length === 0)
        return str;
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

// 1.2. Преобразование строки с целью правильно расстановки пробелов.
function transformString(str) {
    if (str === null || str === undefined)
        return "";
    let editedStr = str
        .replace(/\s*([,.;:!?)%'"}\]])\s*/g, "$1 ")
        .replace(/\s{2,}/g, " ").trim();
    return editedStr;
}

// 1.3. Посдчитывающие кол-во слов в строке.
function wordCount(str) {
    if (str === null || str === undefined)
        return 0;
    return str.trim().split(' ').length;
}

// 1.4. Подсчитывающий, уникальные слова.
function uniqueWordCount(str) {
    if (str === null || str === undefined || str.trim().length === 0)
        return "";
    let arr = str
        .replace(/([^а-яА-Яa-zA-Z0-9-])/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim()
        .split(" ")
        .map((el) => el.toLowerCase());

    let uniques = new Map();

    for (let el of arr) {
        uniques.has(el) ? uniques.set(el, uniques.get(el) + 1) : uniques.set(el, 1);
    }

    let resultArr = [];
    uniques = new Map([...uniques.entries()].sort((a, b) => b[1] - a[1]));

    uniques.forEach((v, k) => {
        (v === 2 || v === 4) ?
            resultArr.push(k + ' - ' + v + ' раза') : resultArr.push(k + ' - ' + v + ' раз');
    })

    return resultArr.join(', ');
}

module.exports = {transformString, uniqueWordCount, uppercaseFirst, wordCount}