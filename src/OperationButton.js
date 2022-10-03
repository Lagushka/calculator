import React from "react";
import { ACTIONS } from "./App";

export default function OperationButton({ operation, dispatch, previousOperand }) {
  return (
    <button onClick={(event) => {
        if (previousOperand && currentOperand) {
          dispatch({type: ACTIONS.EVALUATE});
        } 
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
        event.target.blur();
      }
    }>{ operation }</button>
  );
}