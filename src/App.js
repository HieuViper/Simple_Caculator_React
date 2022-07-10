import { useReducer } from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import ClearButton from './ClearButton';
import { IoCellular } from 'react-icons/io5'
import { BiWifi } from 'react-icons/bi'
import { BsBatteryFull } from 'react-icons/bs'
import EvaluateButton from './EvaluateButton';
import DeleteButton from './DeleteButton';
import Clock from './Clock';

export const ACTIONS = {
  'ADD_DIGIT': 'add-digit',
  'DELETE_DIGIT': 'delete-digit',
  'CHOOSE_OPERATION': 'choose-operation',
  'CLEAR': 'clear',
  'EVALUATE': 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (state.currentOperand == null && payload.digit === ".") return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return { state }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation
      }

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand:null,
          previousOperand: null,
          overwrite:false
        }
      }
      if(state.currentOperand == null){
        return state
      }
      if(state.currentOperand.length === 1 ){
        return {
          ...state,
          currentOperand: null
        }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0 , -1)
      }

    case ACTIONS.EVALUATE:
      if (state.previousOperand == null || state.currentOperand == null || state.operation == null) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
  }

}

function evaluate({ currentOperand, previousOperand, operation }) {
  let prev = parseFloat(previousOperand)
  let current = parseFloat(currentOperand)

  if (isNaN(prev) || isNaN(current)) return ""

  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "x":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }
  return computation
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0
})

function NumberFormat(operand) {
  if (operand == null) return 
  let numnber = operand.toString()
  const [integer , decimal] = numnber.split(".")
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})
  const date = new Date()


  return (
    <div className="App absolute top-[50%] -translate-x-[50%] -translate-y-[50%] left-[50%] w-[320px] h-[568px] mx-auto bg-[#FFFFFF] rounded-[20px] flex flex-col">
      <div className="header h-[44px] mx-3 flex items-center justify-between">
        {/* <div className="time"></div> */}
        <Clock />
        <div className="icon-header flex gap-1">
          <div><IoCellular /></div>
          <div><BiWifi /></div>
          <div><BsBatteryFull /></div>
        </div>
      </div> {/* End of header */}

      <div className="output h-[157px] text-right relative bg-[#FAFAFA]">
        <div className="pt-16 pr-3 bottom-1 right-5 flex flex-col">
          <div className="previous-operand text-[24px] ">
            {/* <span className="previous-number">{previousNumber}</span>
            <span className="previous-operator text-[#FF6060] font-semibold mx-1">{operation}</span>
            <span className="previous-number">{previousNumber}</span> */}
            <span className="previous-operand">{NumberFormat(previousOperand)}</span>
            <span className="previous-operator text-[#FF6060] font-semibold mx-1"> {operation} </span>
          </div>
          <div className="current-operand font-semibold text-[32px]">{NumberFormat(currentOperand)}</div>
        </div>
      </div> {/* End of output */}

      <div className="caculator-grid pt-4 pb-8 px-4 bg-[#E9F6FF] flex-1 rounded-2xl relative">
        <div className="grid grid-cols-4">
          <ClearButton operation="AC" dispatch={dispatch} />
          <DeleteButton operation="⌫" dispatch={dispatch} />
          <OperationButton operation="÷" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton operation="x" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <EvaluateButton operation="=" dispatch={dispatch} />
        </div>
        <div className="h-[2.5px] bg-[#C4C4C4] w-[124px] absolute mx-auto left-0 right-0 text-center bottom-3 rounded"></div>
      </div> {/* End of grid calc */}
    </div>
  );
}

export default App;
