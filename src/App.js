import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./style.scss";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      let f = true;
      if (state.currentOperand && state.currentOperand.length > 0) {
        if ((state.currentOperand.includes('.') && payload.digit == '.')) {
          f = false
        }
      }
      if (f) {
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
        };
      } else return state;
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand) {
        return {
          previousOperand: state.currentOperand,
          currentOperand: "",
          operation: payload.operation
        };
      }
    case ACTIONS.CLEAR:
      return {
        state: {}
      };
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: "",
      };
    case ACTIONS.EVALUATE:
      switch (state.operation) {
        case "÷":
          return {
            state: {},
            currentOperand: +state.previousOperand / +state.currentOperand
          };
        case "*":
          return {
            state: {},
            currentOperand: +state.previousOperand * +state.currentOperand
          };
        case "+":
          return {
            state: {},
            currentOperand: +state.previousOperand + +state.currentOperand
          };
        case "-":
          return {
            state: {},
            currentOperand: +state.previousOperand - +state.currentOperand
          };
      };
  };
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  function handleOperation(operation) {
    if (previousOperand) {
      dispatch({type: ACTIONS.EVALUATE});
    }
    dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}});
  }

  window.onkeydown = function(event) {
    switch (true) {
      case (event.keyCode == 27):
        if (currentOperand == "") {
          dispatch({type: ACTIONS.CLEAR});
        } else {
          dispatch({type: ACTIONS.DELETE_DIGIT});
        }
        break;
      case ((event.keyCode >= 48 && event.keyCode <= 57 && event.key != "*") || (event.keyCode == 190)):
        let digit = String(event.key);
        dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }});
        break;
      case (event.key == "+" || event.key == "*" ||  event.key == "-" || event.key == "/"):
        let operation = event.key;
        if (operation == "/") {
          operation = "÷";
        }
        handleOperation(operation);
        break;
      case (event.keyCode == 13):
        dispatch({type: ACTIONS.EVALUATE});
        break;
    }
  }

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={
        (event) => {
          dispatch({type: ACTIONS.CLEAR});
          event.target.blur();
        }
      }>AC</button>
      <button onClick={
        (event) => {
          dispatch({type: ACTIONS.DELETE_DIGIT});
          event.target.blur();
        }
      }>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} previousOperand={previousOperand} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} previousOperand={previousOperand} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} previousOperand={previousOperand} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} previousOperand={previousOperand} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={
        (event) => {
          dispatch({type: ACTIONS.EVALUATE});
          event.target.blur();
        }
      }>=</button>
    </div>
  );
}

export default App;
