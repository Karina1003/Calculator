import React from 'react';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import examplesReducer from './Examples/reducers/examples.js';
import exampleActions from './Examples/actions/examples';
import Examples from './Examples'

const store = createStore(examplesReducer);

const styles = () => ({
    button: {
            color: "black",
            fontSize: 20,
            fontWeight: 700,
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
});

class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            num: 0,
            display: "",
            exampleArray: [],
            expression: {
                sign: "",
                result: 0,
            },
            calculatedArray: [],
        };
      };

      numClick(value) {
          const strNumber = new String(this.state.num);
          if (value === "." || strNumber.includes(".")) {
            this.setState({num: (this.state.num+value)});
          } else {
            this.setState({num: (this.state.num*10+value)});
          }
          this.setState({display: (""+this.state.display+value)});
      };

      operationClick(value) {
        const result = this.calculateExpression(this.state.num, value);
        if (result !=="") {
            this.setState({
                        exampleArray: this.state.exampleArray.concat([result+"\n"]),
            });
          //this.addToArray(this.state.exampleArray, result);
        }
        if (value !== "=") {
          this.setState({num: 0});
        }
      };

      addToArray(array, element) {
            array.push(element+"\n");
      }

      calculateExpression(valueForCalc, signForCalc) {
          const displayStr = String(this.state.display);
          let expressionToReturn = "";
          const result = this.state.expression.result;
          const sign = this.state.expression.sign;

          if (displayStr.endsWith("+") || displayStr.endsWith("-") ||
              displayStr.endsWith("*") || displayStr.endsWith("/")) {
              if (signForCalc === "=") {
                  return expressionToReturn;
              }
              this.setState({
                    expression: {
                        ...this.state.expression,
                        sign: signForCalc,
                    },
                    display: (this.state.display.slice(0,this.state.display.length-1)+
                                        signForCalc)});
            return expressionToReturn;
          }

          if (!displayStr.includes("+") && !displayStr.includes("-") &&
               !displayStr.includes("*") && !displayStr.includes("/")) {
               if (signForCalc === "=") {
                   return expressionToReturn;
               }
          }

          if (sign === "") {
              this.setState({expression: {
                  result: valueForCalc,
                  sign: signForCalc,
              },
              display: (this.state.display+signForCalc)});
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
              expressionToReturn = String(result)+sign+
                                   String(valueForCalc)+"="+currentResult;
              if (signForCalc === "=") {
                    this.setState({num: currentResult,
                                   display: currentResult,
                                   expression: {
                                    sign: "",
                                    result: 0,
                                  }});
              } else {
                this.setState({expression: {
                                   result: currentResult,
                                   sign: signForCalc,
                               },
                               display: (currentResult+signForCalc)});
              }
          }
          return expressionToReturn;
      }

      deleteClick() {
        this.setState({num: 0,
                       display: "",
                       expression: {
                             sign: "",
                             result: 0,
                       }});
      };

      parseExamples(array) {
                let arr = [];
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
                  console.log(this);
//                  this.setState({
//                                exampleArray: this.exampleArray.push(resultExpression),
//                  });
                  //this.addToArray(this.state.exampleArray, resultExpression);
                  arr.push(resultExpression);
              });
          return arr;
      }

      transformArray(array) {
              let joinedString = "";
              if (array !== undefined) {
                  if (array.length > 0) {
                      let arrayWithoutLastElement = array.slice(0, array.length-1);
                      joinedString = arrayWithoutLastElement.join("");
                      joinedString += "-------------------------\n"+
                                      array[array.length-1]+
                                      "-------------------------"
                  }
              }
              return joinedString;
      };

      render() {
      console.log(this.state);
          return (
            <div className = {this.props.classes.wrapper}>
                <div>
                    <TextField id="outlined" multiline maxRows={4}
                               value={this.transformArray(this.state.exampleArray)}
                               variant="outlined" size="medium"
                               inputProps={{style: { textAlign: 'right' }}}/>
                </div>
                <div>
                    <TextField id="outlined" value={this.state.display}
                               variant="filled" size="small" color="secondary"
                               inputProps={{style: { textAlign: 'center' }}}/>
                    </div>
                    <div>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(7)}>
                      7
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(8)}>
                      8
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(9)}>
                      9
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.operationClick('/')}>
                      /
                    </Button>
                    </div>
                    <div>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(4)}>
                      4
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(5)}>
                      5
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(6)}>
                      6
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.operationClick('*')}>
                      *
                    </Button>
                    </div>
                    <div>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(1)}>
                      1
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(2)}>
                      2
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(3)}>
                      3
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.operationClick('-')}>
                      -
                    </Button>
                    </div>
                    <div>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick(0)}>
                      0
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.numClick('.')}>
                      .
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.operationClick('=')}>
                      =
                    </Button>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.operationClick('+')}>
                      +
                    </Button>
                    </div>
                    <div>
                    <Button className = {this.props.classes.button} variant="contained"
                            onClick={() => this.deleteClick()}>
                      Delete
                    </Button>
                    </div>
                    <Provider store = {store}>
                        <Examples getExamplesFromBackEnd = {this.parseExamples} >
                        </Examples>
                    </Provider>
                </div>
          );
      }

}

export default withStyles(styles)(App);