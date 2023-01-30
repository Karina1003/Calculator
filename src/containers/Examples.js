import React  from 'react';
import { connect } from 'react-redux';

class Examples extends React.Component{
    render() {
        console.log(this.props);
        return(
            <div>
                Examples
            </div>
        );
    }
}

 const mapReduxStateToProps = (reduxState) => ({
     ...reduxState,
 });

 const mapDispatchToProps = (dispatch) => ({
  dispatch,
 });

export default connect(mapReduxStateToProps, mapDispatchToProps)(Examples);