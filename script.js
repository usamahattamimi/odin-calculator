// -------------------- ALGORITMA --------------------
// 1. ambil semua tombol untuk dapatkan value
// 2. ambil display content untuk menambahkan setiap value dari tombol ke display
// 3. buat variable untuk menaruh angka yg aktiv sekarang
// 4. buat variable untuk menaruh digit angka pertama
// 5. buat variable untuk menaruh operator
// 6. buat variable untuk cek apakah operator telah diklik
// 7. buat fungsi updateDisplay
// 7. buat fungsi storeDigit
// 8. buat fungsi storeOperator
// 9. buat funsi resetCalculator
// 10. buat fungsi calculate
// 11. buat event klik pada semua button, lalu buat kondisi value yg di klik apa dan dimasukkan ke fungsi yg sesuai dengan valuenya
// 12. jika value adalah digit angka masukkan ke fungsi storeDigit
// 13. jika value adalah operator masukkan ke fungsi storeOperator
// 14 jika value adalah RESET masukkan ke fungsi resetCalculator
// 15. jika value adalah = masukkan ke fungsi calculate

// -------------------- PENGERJAAN --------------------
// 1. ambil semua tombol untuk dapatkan value
const buttons = document.querySelectorAll("button");

// 2. ambil display content untuk menambahkan setiap value dari tombol ke display
const displayContent = document.querySelector(".display-content p");

// 3. buat variable untuk menaruh angka yg aktiv sekarang
let currentValue = "0";

// 4. buat variable untuk menaruh digit angka pertama
let firstOperand = null;

// 5. buat variable untuk menaruh operator
let operator = null;

// 6. buat variable untuk cek apakah operator telah didapatkan
let isOperatorStore = false;

// varible tambahan untuk display tetap terlihat semua
let allContent = null;

// 7. buat fungsi updateDisplay
const updateDisplay = () => {
  displayContent.textContent = allContent || currentValue;
};

// 7. buat fungsi storeDigit
const storeDigit = (digit) => {
  currentValue =
    currentValue === "0" ? (currentValue = digit) : currentValue + digit;
  allContent = allContent === null ? (allContent = digit) : allContent + digit;
};

// 8. buat fungsi storeOperator
const storeOperator = (nextOperator) => {
  const numberValue = parseFloat(currentValue);

  if (currentValue === "0") {
    return;
  }

  if (operator === null && firstOperand === null) {
    firstOperand = numberValue;
    operator = nextOperator;
    allContent = currentValue + nextOperator;
    currentValue = "0";
  }
};

// 9. buat funsi resetCalculator
const resetCalculator = () => {
  currentValue = "0";
  firstOperand = null;
  operator = null;
  isOperatorStore = false;
  allContent = null;
};

// 10. buat fungsi calculate
const calculate = (value) => {
  const secondOperand = parseFloat(currentValue);
  allContent += value;

  console.log("firstOperand: ", firstOperand);
  console.log("operator: ", operator);
  console.log("currentValue: ", currentValue);

  switch (operator) {
    case "+":
      allContent += firstOperand + secondOperand;
      break;
    case "-":
      allContent += firstOperand - secondOperand;
      break;
    case "x":
      allContent += firstOperand * secondOperand;
      break;
    case "/":
      allContent += firstOperand / secondOperand;
      break;
    default:
      break;
  }
};

// 11. buat event klik pada semua button, lalu buat kondisi value yg di klik apa dan dimasukkan ke fungsi yg sesuai dengan valuenya
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      storeDigit(value);
    } else if (value === "RESET") {
      resetCalculator();
    } else if (value === "=") {
      calculate(value);
    } else {
      storeOperator(value);
    }

    // console.log("update display setelah ini");
    updateDisplay();
  })
);

// 12. jika value adalah digit angka masukkan ke fungsi storeDigit
// 13. jika value adalah operator masukkan ke fungsi storeOperator
// 14 jika value adalah RESET masukkan ke fungsi resetCalculator
// 15. jika value adalah = masukkan ke fungsi calculate
