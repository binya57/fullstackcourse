// exercise 1: printing the greater of two variables
let firstNumber = 2;
let secondNumber = 1;
document.write('exercise #1 - The larger number is: ');
if (firstNumber > secondNumber) {
    document.write(firstNumber);
} else {
    document.write(secondNumber);
}

// exercise 2: printing the math sign of the sum of 3 mixed numbers:
let firstVar = 1;
let secondVar = -2;
let thirdVar = 0;
document.write('<br>exercise #2 - The math sign is: ');
if ((firstVar + secondVar + thirdVar) > 0) {
    document.write('(+)');
} else if ((firstVar + secondVar + thirdVar) == 0) {
    document.write('(+/-) 0');
} else {
    document.write('(-)');
}

// exercise 3: Sorting an array by value ascsending:
let firstArray = [0, 2, 1];
let secondArray = [];
document.write('<br> exercise #3 - The sorted array is: ');
//assigning the index[0] of the sorted array
if (firstArray[2] > firstArray[1] && firstArray[2] > firstArray[0]) {
    secondArray[2] = firstArray[2];
} else if (firstArray[1] > firstArray[2] && firstArray[1] > firstArray[0]) {
    secondArray[2] = firstArray[1];
} else if (firstArray[0] > firstArray[1] && firstArray[0] > firstArray[2]) {
    secondArray[2] = firstArray[0];
}
//assigning the index[1] of the sorted array
if ((firstArray[2] < firstArray[1] || firstArray[2] < firstArray[0]) && (firstArray[2] > firstArray[1]
    || firstArray[2] > firstArray[0])) {
        secondArray[1] = firstArray[2];
} else if ((firstArray[1] < firstArray[2] || firstArray[1] < firstArray[0]) && (firstArray[1] > firstArray[2]
    || firstArray[1] > firstArray[0])) {
        secondArray[1] = firstArray[1];
} else if ((firstArray[0] < firstArray[2] || firstArray[0] < firstArray[1]) && (firstArray[0] > firstArray[2]
        || firstArray[0] > firstArray[1])) {
            secondArray[1] = firstArray[0];
}
//assigning the index[2] of the sorted array
if (firstArray[2] < firstArray[1] && firstArray[2] < firstArray[0]) {
    secondArray[0] = firstArray[2];
} else if (firstArray[1] < firstArray[2] && firstArray[1] < firstArray[0]) {
    secondArray[0] = firstArray[1];
} else if (firstArray[0] < firstArray[1] && firstArray[0] < firstArray[2]) {
    secondArray[0] = firstArray[0];
}
document.write(secondArray);

// exercise 4: printing the largest element from an array:
let thirdArray = [5, 4, 3, 2, 1]
document.write('<br> exercise #4 - The largest number in the array is: ')
if (thirdArray[0] >= thirdArray[1] && thirdArray[0] >= thirdArray[2] && thirdArray[0] >= thirdArray[3] && thirdArray[0] >= thirdArray[4]) {
    document.write(thirdArray[0]);
} else if (thirdArray[1] >= thirdArray[0] && thirdArray[1] >= thirdArray[2] && thirdArray[1] >= thirdArray[3] && thirdArray[1] >= thirdArray[4]) {
    document.write(thirdArray[1]);
} else if (thirdArray[2] >= thirdArray[0] && thirdArray[2] >= thirdArray[1] && thirdArray[2] >= thirdArray[3] && thirdArray[2] >= thirdArray[4]) {
    document.write(thirdArray[2]);
} else if (thirdArray[3] >= thirdArray[0] && thirdArray[3] >= thirdArray[1] && thirdArray[3] >= thirdArray[2] && thirdArray[3] >= thirdArray[4]) {
    document.write(thirdArray[3]);
} else if (thirdArray[4] >= thirdArray[0] && thirdArray[4] >= thirdArray[1] && thirdArray[4] >= thirdArray[2] && thirdArray[4] >= thirdArray[3]) {
    document.write(thirdArray[4]);
} 

// exercise 5: printing if each of the numbers in an array is even or odd
let fourthArray = [1, 2, 3, 4, 5]
document.write('<br> exercise #5 - even or odd:');
if ((fourthArray[0] % 2) != 0) {
    document.write('<br> first number: odd');
} else {
    document.write('<br> first number: even');
}
if ((fourthArray[1] % 2) != 0) {
    document.write('<br> second number: odd');
} else {
    document.write('<br> second number: even');
}
if ((fourthArray[2] % 2) != 0) {
    document.write('<br> third number: odd');
} else {
    document.write('<br> fourth number: even');
}
if ((fourthArray[3] % 2) != 0) {
    document.write('<br> fourth number: odd');
} else {
    document.write('<br> fourth number: even');
}
if ((fourthArray[4] % 2) != 0) {
    document.write('<br> fifth number: odd');
} else {
    document.write('<br> fifth number: even');
}