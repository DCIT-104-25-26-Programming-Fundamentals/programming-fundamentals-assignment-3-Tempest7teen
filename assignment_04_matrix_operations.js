// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join('\t'));
    }
}

function readMatrix(promptName) {
    console.log(`--- Enter ${promptName} ---`);
    const rows = readlineSync.questionInt('Enter number of rows: ');
    const cols = readlineSync.questionInt('Enter number of columns: ');
    
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const rowInput = readlineSync.question(`Enter row ${i + 1} (space-separated): `);
        const row = rowInput.trim().split(' ').map(Number);
        matrix.push(row);
    }
    return matrix;
}

function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = [];

    for (let c = 0; c < cols; c++) {
        const newRow = [];
        for (let r = 0; r < rows; r++) {
            newRow.push(matrix[r][c]);
        }
        transposed.push(newRow);
    }
    return transposed;
}

function addMatrices(matrixA, matrixB) {
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const result = [];

    for (let i = 0; i < rows; i++) {
        const newRow = [];
        for (let j = 0; j < cols; j++) {
            newRow.push(matrixA[i][j] + matrixB[i][j]);
        }
        result.push(newRow);
    }
    return result;
}

function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
    const colsB = matrixB[0].length;

    if (colsA !== rowsB) {
        console.log('Error: Columns of A must match rows of B for multiplication.');
        return null;
    }

    const result = [];
    for (let i = 0; i < rowsA; i++) {
        const newRow = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            newRow.push(sum);
        }
        result.push(newRow);
    }
    return result;
}

function main() {
    console.log('=== PART A: Transpose a Matrix ===');
    const matrixA = readMatrix('Matrix A');
    console.log('\nOriginal Matrix:');
    printMatrix(matrixA);
    console.log('\nTransposed Matrix:');
    printMatrix(transposeMatrix(matrixA));

    console.log('\n=== PART B: Add Two Matrices ===');
    console.log('Enter Matrix 1 for Addition:');
    const add1 = readMatrix('Matrix 1');
    console.log('Enter Matrix 2 for Addition (must be same dimensions):');
    const add2 = readMatrix('Matrix 2');

    if (add1.length !== add2.length || add1[0].length !== add2[0].length) {
        console.log('Error: Matrices must have the exact same dimensions to be added.');
    } else {
        console.log('\nSum of Matrices:');
        printMatrix(addMatrices(add1, add2));
    }

    console.log('\n=== PART C: Multiply Two Matrices ===');
    console.log('Enter Matrix A for Multiplication:');
    const mulA = readMatrix('Matrix A');
    console.log('Enter Matrix B for Multiplication:');
    const mulB = readMatrix('Matrix B');

    const product = multiplyMatrices(mulA, mulB);
    if (product !== null) {
        console.log('\nProduct Matrix (A x B):');
        printMatrix(product);
    }
}

main();