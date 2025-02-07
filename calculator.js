// Ambil elemen-elemen yang dibutuhkan dari DOM
const display = document.querySelector(".display-content p");
const buttons = document.querySelectorAll("button");

// Variabel untuk menyimpan nilai dan operasi
let currentInput = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let expression = ""; // Variabel untuk menyimpan ekspresi lengkap

// Fungsi untuk memperbarui tampilan kalkulator
function updateDisplay() {
  display.textContent = expression || currentInput;
}

// Fungsi untuk menangani input angka
function inputDigit(digit) {
  if (waitingForSecondOperand) {
    currentInput = digit;
    waitingForSecondOperand = false;
    expression += digit; // Tambahkan digit ke ekspresi
  } else {
    currentInput = currentInput === "0" ? digit : currentInput + digit;
    expression += digit; // Tambahkan digit ke ekspresi
  }
}

// Fungsi untuk menangani input desimal
function inputDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    expression += "."; // Tambahkan titik desimal ke ekspresi
  }
}

// Fungsi untuk menghapus satu karakter terakhir dari input
function deleteLastInput() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
    expression = expression.slice(0, -1); // Hapus karakter terakhir dari ekspresi
  } else {
    currentInput = "0";
    expression = ""; // Reset ekspresi jika tidak ada input lagi
  }
}

// Fungsi untuk mereset kalkulator
function resetCalculator() {
  currentInput = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  expression = ""; // Reset ekspresi
  updateDisplay();
}

// Fungsi untuk menangani operasi matematika
function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    expression = expression.slice(0, -1) + nextOperator; // Ganti operator sebelumnya
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    currentInput = String(result);
    expression += `=${result}`; // Tambahkan hasil ke ekspresi
    firstOperand = result;
    waitingForSecondOperand = true;
    return; // Berhenti agar operator tidak ditambahkan setelah hasil
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
  expression += nextOperator; // Tambahkan operator ke ekspresi
}

// Fungsi untuk melakukan perhitungan
function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "/":
      return b === 0 ? "Error" : a / b;
    default:
      return b;
  }
}

// Fungsi untuk menangani tombol =
function handleEquals() {
  if (operator && firstOperand !== null && !waitingForSecondOperand) {
    const inputValue = parseFloat(currentInput);
    const result = calculate(firstOperand, inputValue, operator);
    currentInput = String(result);
    expression += `=${result}`; // Tambahkan hasil ke ekspresi
    firstOperand = result;
    operator = null;
    waitingForSecondOperand = true;
  } else {
    // Jika tidak ada angka kedua, tampilkan pesan error atau abaikan
    expression += "=Error";
  }
}

// Tambahkan event listener ke tombol
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      inputDigit(value);
    } else if (value === ".") {
      inputDecimal();
    } else if (value === "DEL") {
      deleteLastInput();
    } else if (value === "RESET") {
      resetCalculator();
      return;
    } else if (value === "=") {
      handleEquals();
    } else {
      handleOperator(value);
    }

    updateDisplay();
  });
});

// Inisialisasi tampilan awal
updateDisplay();
