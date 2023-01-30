import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
//import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "./Styles.css";

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
    const [expression, setExpression] = useState({
            sign: "",
            result: 0,
          });

    const numClick = (value) => {
      const strNumber = new String(num);
      //e.preventDefault();
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
                                          (sign === "/")?
                                          (result/valueForCalc):
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
          //e.preventDefault();
          setDisplay("");
          setNum(0);
          setExpression({
              sign: "",
              result: 0,
          })
    };

    const receiveExamples = () => {
              fetch("http://localhost:8080/math/examples?count=5")
              .then(result => console.log(result.json()))
               .catch(error => console.log("no"))
               .finally(() => console.log('Викликаємо цей код у будь-якому випадку'));
    };

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
                onClick={()=>{receiveExamples()}}>
          Отримати та вирішити приклади
        </Button>
        </div>
    </div>
    );
}

export default App; //withStyles(styles)(App);
