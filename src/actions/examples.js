const requestExamples = () => ({
    type: 'REQUEST_EXAMPLES',
});

const receiveExamples = examples => ({
    examples,
    type: 'RECEIVE_EXAMPLES',
});

const errorReceiveExamples = () => ({
    type: 'ERROR_RECEIVE_EXAMPLES',
});


const getExamples = (count) => {
        const response = fetch("http://localhost:8080/math/examples?count="+count, {method: "GET"})
        return response;
};

const fetchExamples = ({count}) => (dispatch) => {
    dispatch(requestExamples());
    return getExamples(count)
    .then(result => result.json())
    .then(examples => console.log(dispatch(receiveExamples(examples))))
    .catch(examples => dispatch(errorReceiveExamples()));
};

export default { fetchExamples };