const requestExamples = () => {
    type: 'REQUEST_EXAMPLES',
};

const receiveExamples = examples => {
    examples,
    type: 'RECEIVE_EXAMPLES',
};

const errorReceiveExamples = () => {
    type: 'ERROR_RECEIVE_EXAMPLES',
};

const getExamples = (count) => {
    fetch("http://localhost:8080/math/examples?count="+count, {method: "GET"})
                  .then(result => result.json())
                  .then(exampleArray => parseExamples(exampleArray))
                  .catch(error => console.log(error));
};

const fetchExamples = (count) => (dispatch) => {
    dispatch(requestExamples());
    return getExamples(count)
    .then(examples => dispatch(receiveExamples()))
    .catch(examples => dispatch(errorReceiveExamples()));
};

export default { fetchExamples };