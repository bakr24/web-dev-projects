import { useState } from "react";
import Display from "./Display";
import Button from "./Button";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForValue, setWaitingForValue] = useState(false);

  function handleNumber(value) {
    if (display === "Error") {
      setDisplay(value);
      setExpression(value);
      setPreviousValue(null);
      setOperator(null);
      setWaitingForValue(false);
      return;
    }

    if (waitingForValue) {
      setDisplay(value);
      setExpression(`${expression} ${value}`);
      setWaitingForValue(false);
      return;
    }

    if (display === "0") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  }

  function handleOperator(value) {
    const currentValue = Number(display);

    if (operator && previousValue !== null) {
      const result = calculate(
        previousValue,
        currentValue,
        operator
      );

      if (result === "Error") {
        setDisplay("Error");
        setExpression("");
        setPreviousValue(null);
        setOperator(null);
        setWaitingForValue(true);
        return;
      }

      setPreviousValue(result);
      setDisplay(String(result));
      setExpression(`${result} ${value}`);
    } else {
      setPreviousValue(currentValue);
      setExpression(`${currentValue} ${value}`);
    }

    setOperator(value);
    setWaitingForValue(true);
  }

  function calculate(firstValue, secondValue, selectedOperator) {
    if (selectedOperator === "+") {
      return firstValue + secondValue;
    }

    if (selectedOperator === "-") {
      return firstValue - secondValue;
    }

    if (selectedOperator === "×") {
      return firstValue * secondValue;
    }

    if (selectedOperator === "÷") {
      if (secondValue === 0) {
        return "Error";
      }

      return firstValue / secondValue;
    }

    return secondValue;
  }

  function handleEquals() {
    if (
      operator === null ||
      previousValue === null ||
      display === "Error"
    ) {
      return;
    }

    const currentValue = Number(display);

    const result = calculate(
      previousValue,
      currentValue,
      operator
    );

    setDisplay(String(result));
    setExpression("");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForValue(true);
  }

  function handleClear() {
    setDisplay("0");
    setExpression("");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForValue(false);
  }

  function handleButton(value) {
    if (!isNaN(value)) {
      handleNumber(value);
      return;
    }

    if (value === "C") {
      handleClear();
      return;
    }

    if (value === "=") {
      handleEquals();
      return;
    }

    handleOperator(value);
  }

  const buttons = [
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "÷", type: "operator" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "×", type: "operator" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "-", type: "operator" },
    { value: "0" },
    { value: "C", type: "clear" },
    { value: "=", type: "equals" },
    { value: "+", type: "operator" }
  ];

  return (
    <div className="calculator">
      <Display expression={expression} value={display} />
      <div className="button-grid">
        {buttons.map((button) => (
          <Button
            key={button.value}
            value={button.value}
            type={button.type}
            onClick={handleButton}
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;