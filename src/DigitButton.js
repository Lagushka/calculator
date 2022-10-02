import React from "react";
import { ACTIONS } from "./App";

export default function DigitButton({ digit, dispatch }) {
  return (
    <button
      onClick={
        (event) => {
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } } );
          event.target.blur()
        }
      }
    >
      {digit}
    </button>
  );
}
