import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import exampleActions from 'D:/CalculatorClass/calculator/src/Examples/actions/examples';

class Examples extends React.Component {

     receiveExamplesFromBE() {
              return exampleActions.fetchExamples({ count: 5, })(this.props.dispatch);
     };

    render() {
        this.props.getExamplesFromBackEnd(this.props.list);

        return (
            <div>
                <Button variant="contained" onClick = {() => this.receiveExamplesFromBE()}>
                  Отримати та вирішити приклади
                </Button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    ...reduxState,
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default (connect(mapReduxStateToProps,mapDispatchToProps))(Examples);