import { StyleSheet, Text, View } from 'react-native';
import { useReducer } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';
import AllClearButton from './components/AllClearButton';
import DeleteButton from './components/DeleteButton';
import EvaluateButton from './components/EvaluateButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
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
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand){
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}


const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  const Col = ({ numRows, children }) => {
    return (
      <View style={styles[`${numRows}col`]}>{children}</View>
    )
  }

  const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.buttonGrid}>
        <Row>
          <Col numRows={1}>
            <View style={styles.output}>
              <Text style={styles.outputText}>{formatOperand(previousOperand)}{operation}</Text>
              <Text style={styles.outputText}>{formatOperand(currentOperand)}</Text>
            </View>
          </Col>
        </Row>

        <Row>
          <Col numRows={2}>
          <AllClearButton operation='AC' dispatch={dispatch}/>
          </Col>
          <Col numRows={2}>
          <DeleteButton operation='DEL' dispatch={dispatch}/>
          </Col>
        </Row>
 
        <Row>
          <Col numRows={4}>
            <DigitButton digit='1' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
            <DigitButton digit='2' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
            <DigitButton digit='3' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
            <OperationButton operation='*' dispatch={dispatch}/>
          </Col>
        </Row>

        <Row>
          <Col numRows={4}>
            <DigitButton digit='4' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
            <DigitButton digit='5' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
            <DigitButton digit='6' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
          <OperationButton operation='+' dispatch={dispatch}/>
          </Col>
        </Row>

        <Row>
          <Col numRows={4}>
            <DigitButton digit='7' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
            <DigitButton digit='8' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
            <DigitButton digit='9' dispatch={dispatch}/>
          </Col>
          <Col numRows={4}>
          <OperationButton operation='-' dispatch={dispatch}/>
          </Col>
        </Row>

        <Row>
          <Col numRows={1}>
            <DigitButton digit='.' dispatch={dispatch}/>
          </Col>
          <Col numRows={1}>
            <DigitButton digit='0' dispatch={dispatch}/>
          </Col>
          <Col numRows={2}>
          <EvaluateButton operation='=' dispatch={dispatch}/>
          </Col>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGrid: {
    flex: 4,
    marginHorizontal: 'auto',
    width: 300,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  "1col": {
    flex: 1
  },
  "2col": {
    flex: 2
  },
  "3col": {
    flex: 3
  },
  "4col": {
    flex: 4
  },
  output: {
    backgroundColor: '#f1f1f1',
    alignItems: 'flex-end',
    padding: 20,
  },
  outputText: {
    fontSize: 20,
  },
});

export default App;
