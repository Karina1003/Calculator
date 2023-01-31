import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import examplesReducer from './reducers/examples.js';
import exampleActions from 'D:/calculator/src/actions/examples';

const store = createStore(examplesReducer);

const styles = {
    button: {
            color: "black",
            fontSize: 20,
            fontWeight: 700,
            margin: 3,
    },
    examples: {
                color: "black",
                fontSize: 12,
                margin: 3,
        },
    wrapper: {
            borderStyle: "solid",
            borderWidth: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "60%",
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
    },
};

const App = () => {

    const [num, setNum] = useState(0);
    const [display, setDisplay] = useState("");
    const [exampleArray, setExampleArray] = useState([]);
    const [backEndExamples, setBackEndExamples] = useState("");
    const [expression, setExpression] = useState({
            sign: "",
            result: 0,
          });

    const numClick = (value) => {
      const strNumber = new String(num);
      if (value === "." || strNumber.includes(".")) {
        setNum(num+value);
      } else {
        setNum(num*10+value);
      }
      setDisplay(""+display+value);
    };

    const operationClick = (value) => {
      const result = calculateExpression(num, value);
      if (result !=="") {
        addToArray(exampleArray, result);
      }
      if (value !== "=") {
        setNum(0);
      }
    };

    const addToArray = (array, element) => {
        array.push(element+"\n");
    }

    const calculateExpression = (valueForCalc, signForCalc) => {
        const displayStr = String(display);
        let expressionToReturn = "";
        const result = expression.result;
        const sign = expression.sign;

        if (displayStr.endsWith("+") || displayStr.endsWith("-") ||
            displayStr.endsWith("*") || displayStr.endsWith("/")) {
            if (signForCalc === "=") {
                return expressionToReturn;
            }
            setExpression({
                           ...expression,
                           sign: signForCalc,
            })
            setDisplay(display.slice(0,display.length-1)+signForCalc);
          return expressionToReturn;
        }

         if (!displayStr.includes("+") && !displayStr.includes("-") &&
             !displayStr.includes("*") && !displayStr.includes("/")) {
             if (signForCalc === "=") {
                 return expressionToReturn;
             }
         }

        if (sign === "") {
            setExpression({
                result: valueForCalc,
                sign: signForCalc,
            })
            setDisplay(display+signForCalc);
        } else {
        const currentResult = (sign === "+")?
                              (Number(result)+Number(valueForCalc)):
                                  (sign === "-")?
                                  (result-valueForCalc):
                                      (sign === "*")?
                                      (result*valueForCalc):
                                          (sign === "/")&&(valueForCalc!==0)?
                                          (result/valueForCalc):
                                              (sign === "/")&&(valueForCalc===0)?
                                              ("Division by zero"):
                                              0;
            setExpression({
                result: currentResult,
                sign: signForCalc,
            })
            expressionToReturn = String(result)+sign+
                                 String(valueForCalc)+"="+currentResult;
            setDisplay(currentResult+signForCalc);
            if (signForCalc === "=") {
                setNum(currentResult);
                setDisplay(currentResult);
                setExpression({
                                sign: "",
                                result: 0,
                            })
            }
        }
        return expressionToReturn
    }

    const deleteClick = () => {
          setDisplay("");
          setNum(0);
          setExpression({
              sign: "",
              result: 0,
          })
    };

    const receiveExamplesFromBE = () => {
            const fetchResult = exampleActions.fetchExamples({ count: 5, })(store.dispatch);
    };
    const returnExamplesFromBE = () => {
                receiveExamplesFromBE();
                const listExamples = store.getState().list;
                const res = parseExamples(listExamples);
                console.log(res);
                return res;
        };

    const parseExamples = (array) => {
        array.forEach(element => {console.log(element);
                            let argument1 = parseInt(element);
                            let argument2 = 0;
                            let result = 0;
                            let resultExpression = "";
                            if (element.includes("+")) {
                                argument2 = parseInt(element.slice(element.indexOf("+")+1));
                                result = argument1+argument2;
                                resultExpression = ""+argument1+"+"+argument2+"="+result;
                            } else if (element.includes("-")) {
                                argument2 = parseInt(element.slice(element.indexOf("-")+1));
                                result = argument1-argument2;
                                resultExpression = ""+argument1+"-"+argument2+"="+result;
                            } else if (element.includes("*")) {
                                argument2 = parseInt(element.slice(element.indexOf("*")+1));
                                result = argument1*argument2;
                                resultExpression = ""+argument1+"*"+argument2+"="+result;
                            } else if (element.includes("/")) {
                                argument2 = parseInt(element.slice(element.indexOf("/")+1));
                                result = argument1/argument2;
                                resultExpression = ""+argument1+"/"+argument2+"="+result;
                            }
                            setBackEndExamples(result+" \n");
                            return addToArray(exampleArray, resultExpression);
        });
    }

    const transformArray = (array) => {
        let joinedString = "";
        if (array.length > 0) {
            let arrayWithoutLastElement = array.slice(0, array.length-1);
            joinedString = arrayWithoutLastElement.join("");
            joinedString += "-------------------------\n"+
                            array[array.length-1]+
                            "-------------------------"
        }
        return joinedString;
    }

    return (
    <div style = {styles.wrapper}>
    <div>
        <TextField id="outlined" multiline maxRows={4} value={transformArray(exampleArray)}
                   variant="outlined" size="medium"
                   inputProps={{style: { textAlign: 'right' }}}/>
    </div>
    <div>
        <TextField id="outlined" value={display}
                   variant="filled" size="small" color="secondary"
                   inputProps={{style: { textAlign: 'center' }}}/>
        </div>
        <div>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(7)}}>
          7
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(8)}}>
          8
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(9)}}>
          9
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {operationClick('/')}}>
          /
        </Button>
        </div>
        <div>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(4)}}>
          4
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(5)}}>
          5
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(6)}}>
          6
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {operationClick('*')}}>
          *
        </Button>
        </div>
        <div>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(1)}}>
          1
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(2)}}>
          2
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(3)}}>
          3
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {operationClick('-')}}>
          -
        </Button>
        </div>
        <div>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick(0)}}>
          0
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {numClick('.')}}>
          .
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {operationClick('=')}}>
          =
        </Button>
        <Button style = {styles.button} variant="contained"
                onClick={() => {operationClick('+')}}>
          +
        </Button>
        </div>
        <div>
        <Button style = {styles.button} variant="contained"
                onClick={() => {deleteClick()}}>
          Delete
        </Button>
        </div>
        <div>
        <Button style = {styles.examples} variant="contained"
                onClick={()=> {returnExamplesFromBE()}}>
          Отримати та вирішити приклади
        </Button>
        </div>
    </div>
    );
}

export default App;
