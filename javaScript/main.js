const display = document.getElementById("display");

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteDisplay() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    let expression = display.value;
    expression = expression.replace(/π/g, Math.PI);
    expression = expression.replace(/e/g, Math.E);
    const result = eval(expression);
    display.value = isFinite(result) ? result : "Error";
  } catch (e) {
    display.value = "";
  }
}

function calculate(func) {
  try {
    let result;
    const currentValue = parseFloat(display.value) || 0;

    switch (func) {
      case "sin":
        result = Math.sin((currentValue * Math.PI) / 180);
        break;
      case "cos":
        result = Math.cos((currentValue * Math.PI) / 180);
        break;
      case "tan":
        result = Math.tan((currentValue * Math.PI) / 180);
        break;
      case "ln":
        result = Math.log(currentValue);
        break;
      case "log":
        result = Math.log10(currentValue);
        break;
      case "sqrt":
        result = Math.sqrt(currentValue);
        break;
      case "pi":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      case "square":
        result = currentValue ** 2;
        break;
      case "power":
        appendToDisplay("**");
        return;
      case "factorial":
        result = factorial(currentValue);
        break;
      default:
        result = currentValue;
    }

    display.value = isFinite(result) ? result : "Error";
  } catch (e) {
    display.value = "Error";
  }
}

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) appendToDisplay(key);
  if (key === ".") appendToDisplay(".");
  if (key === "+") appendToDisplay("+");
  if (key === "-") appendToDisplay("-");
  if (key === "*") appendToDisplay("*");
  if (key === "/") appendToDisplay("/");
  if (key === "(") appendToDisplay("(");
  if (key === ")") appendToDisplay(")");
  if (key === "Enter") calculateResult();
  if (key === "Escape") clearDisplay();
  if (key === "Backspace") display.value = display.value.slice(0, -1);
});
