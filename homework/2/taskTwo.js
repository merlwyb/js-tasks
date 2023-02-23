// 2.Написать модуль, который способен выполнять операции с числами любой длины.
// 4 метода для сложения, умножения, вычитания и деления.
function bigNumbersSum(num1, num2) {
    if (num1 === null || num2 === null || num1 === undefined || num2 === undefined)
        return '0'

    let sign = '';
    if (num1[0] === '-' && num2[0] !== '-') {
        num1 = num1.substring(1);
        return bigNumbersDif(num2, num1)
    } else if (num1[0] !== '-' && num2[0] === '-') {
        num2 = num2.substring(1);
        return bigNumbersDif(num1, num2)
    } else if (num1[0] === '-' && num2[0] === '-') {
        num1 = num1.substring(1);
        num2 = num2.substring(1);
        sign = '-';
    }


    let [extNum1, extNum2, pointIndex] = getPointIndexAndExtendedNums(num1, num2);

    let revNumArray1 = extNum1.split('').reverse();
    let revNumArray2 = extNum2.split('').reverse();
    let maxLength = Math.max(extNum1.length, extNum2.length);
    let resultArray = [0];


    for (let i = 0; i < maxLength; i++) {
        let sum = resultArray[i] + (+revNumArray1[i] || 0) + (+revNumArray2[i] || 0);
        resultArray[i] = (+sum) % 10;
        resultArray[i + 1] = sum > 9 ? 1 : 0;
    }

    resultArray.splice(pointIndex, 0, '.');
    return sign + (resultArray
        .reverse()
        .join('')
        .replace(/^0+/g, '')
        .replace(/^\./g, '0.')
        .replace(/\.0+$/g, '')
        .replace(/\.$/g, ''));
}

function bigNumbersDif(num1, num2) {
    if (num1 === null || num2 === null || num1 === undefined || num2 === undefined)
        return '0'

    let sign = '';
    if (num1[0] === '-' && num2[0] !== '-') {
        num2 = '-' + num2;
        return bigNumbersSum(num1, num2)
    } else if (num1[0] !== '-' && num2[0] === '-') {
        num2 = num2.substring(1);
        return bigNumbersSum(num1, num2)
    } else if (num1[0] === '-' && num2[0] === '-') {
        let t = num1;
        num1 = num2.substring(1);
        num2 = t.substring(1);
    }


    let [extNum1, extNum2, pointIndex] = getPointIndexAndExtendedNums(num1, num2);

    [extNum1, extNum2, sign] = isAGreaterThanB(extNum1, extNum2) ?
        [extNum1, extNum2, ''] : [extNum2, extNum1, '-'];

    let revNumArray1 = extNum1.split('').reverse();
    let revNumArray2 = extNum2.split('').reverse();
    let maxLength = Math.max(extNum1.length, extNum2.length);
    let resultArray = [0];


    for (let i = 0; i < maxLength; i++) {
        let dif = resultArray[i] + (+revNumArray1[i] || 0) - (+revNumArray2[i] || 0);
        resultArray[i] = dif < 0 ? 10 + dif : dif;
        resultArray[i + 1] = dif < 0 ? -1 : 0;
    }

    resultArray.splice(pointIndex, 0, '.');
    return sign + (resultArray
        .reverse()
        .join('')
        .replace(/^0+/g, '')
        .replace(/^\./g, '0.')
        .replace(/\.0+$/g, '')
        .replace(/\.$/g, ''));
}


function bigNumbersMult(num1, num2) {
    if (num1 === null || num2 === null || num1 === undefined || num2 === undefined || num1 === '0' || num2 === '0')
        return '0'

    let sign = '';
    if (num1[0] === '-' && num2[0] !== '-') {
        num1 = num1.substring(1);
        sign = '-';
    } else if (num1[0] !== '-' && num2[0] === '-') {
        num2 = num2.substring(1);
        sign = '-';
    } else if (num1[0] === '-' && num2[0] === '-') {
        num2 = num2.substring(1);
        num1 = num1.substring(1);
    }

    let resultPointIndex = getPointIndexSum(num1, num2);

    let revNumArray1 = num1.replace('.', '').split('').reverse();
    let revNumArray2 = num2.replace('.', '').split('').reverse();
    let len1 = revNumArray1.length;
    let len2 = revNumArray2.length;
    let resultArray = new Array(revNumArray1.length + revNumArray2.length).fill(0)

    let index_n1 = 0;
    let index_n2 = 0;

    for (let i = 0; i < len1; i++) {
        let carry = 0;
        let n1 = +revNumArray1[i];

        index_n2 = 0;

        for (let j = 0; j < len2; j++) {
            let n2 = +revNumArray2[j];

            let sum = n1 * n2 + resultArray[index_n1 + index_n2] + carry;
            carry = Math.floor(sum / 10);
            resultArray[index_n1 + index_n2] = sum % 10;
            index_n2 += 1;
        }

        if (carry > 0)
            resultArray[index_n1 + index_n2] += carry;

        index_n1 += 1;
    }

    for (let i = resultArray.length - 1; i > 0; i--) {
        if (resultArray[i] === '0' || isNaN(resultArray[i]))
            resultArray[i] = 0;
    }


    resultArray.splice(resultPointIndex, 0, '.');
    return sign + (resultArray
        .reverse()
        .join('')
        .replace(/^0+/g, '')
        .replace(/^\./g, '0.')
        .replace(/\.0+$/g, '')
        .replace(/\.$/g, ''));
}

function bigNumbersDiv(num1, num2) {
    if (num1 === null || num2 === null || num1 === undefined || num2 === undefined || num1 === '0')
        return '0';
    if (num2 === 0)
        return Infinity;

    let sign = '';
    if (num1[0] === '-' && num2>0) {
        num1 = num1.substring(1);
        sign = '-';
    } else if (num1[0] !== '-' && num2<0 ) {
        num2 = -num2;
        sign = '-';
    } else if (num1[0] === '-' && num2<0) {
        num2 = -num2;
        num1 = num1.substring(1);
    }


    let numArray1 = num1.split('');
    let divisor = num2;
    let result = '';


    let idx = 0;
    let temp = (+numArray1[idx]);
    while (temp < divisor) {
        temp = (temp * 10 + (+numArray1[idx + 1]));
        idx += 1;
    }
    idx += 1;

    while (numArray1.length > idx) {
        result += Math.floor(temp / divisor);

        temp = ((temp % divisor) * 10 + (+numArray1[idx]));
        idx += 1;
    }

    result += Math.floor(temp / divisor);

    if (result.length === 0 || isNaN(result))
        return "0";

    if (sign === '-')
        return -result;
    return result;
}


function getPointIndexAndExtendedNums(num1, num2) {
    let number1 = num1.slice();
    let number2 = num2.slice();

    number1 += number1.includes('.') ? '' : '.';
    number2 += number2.includes('.') ? '' : '.';

    let digitsAfterPoint1 = number1.length - 1 - number1.indexOf('.');
    let digitsAfterPoint2 = number2.length - 1 - number2.indexOf('.');


    if (digitsAfterPoint1 > digitsAfterPoint2)
        number2 = number2.padEnd(number2.length + digitsAfterPoint1 - digitsAfterPoint2, '0');

    if (digitsAfterPoint1 < digitsAfterPoint2)
        number1 = number1.padEnd(number1.length + digitsAfterPoint2 - digitsAfterPoint1, '0');

    let pointIndex = Math.max(digitsAfterPoint1, digitsAfterPoint2);
    number1 = number1.replace('.', '');
    number2 = number2.replace('.', '');

    return [number1, number2, pointIndex];
}

function isAGreaterThanB(extNum1, extNum2) {

    if (extNum1.length === extNum2.length) {

        for (let i = 0; i <= extNum1.length; i++) {
            if (extNum1[i] > extNum2[i]) {
                return true;
            } else if (extNum1[i] < extNum2[i]) {
                return false;
            }
        }
        return true;
    }
    return extNum1.length > extNum2.length;
}

function getPointIndexSum(num1, num2) {
    let number1 = num1.slice();
    let number2 = num2.slice();

    number1 += number1.includes('.') ? '' : '.';
    number2 += number2.includes('.') ? '' : '.';

    let digitsAfterPoint1 = number1.length - 1 - number1.indexOf('.');
    let digitsAfterPoint2 = number2.length - 1 - number2.indexOf('.');

    return digitsAfterPoint1 + digitsAfterPoint2;
}

module.exports = {bigNumbersSum, bigNumbersDif, bigNumbersMult, bigNumbersDiv}