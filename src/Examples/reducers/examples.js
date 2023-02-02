const initialState = {
isLoading: false,
isError: false,
list: [],
name: "BE Examples",
calculatedArray: [],
};

const examplesReducer = (state = initialState, action) => {
    switch (action.type) {
     case 'REQUEST_EXAMPLES': {
         return {
             ...state,
             isLoading: true,
         };
     }
     case 'RECEIVE_EXAMPLES': {
         const {
            examples,
         } = action;
         return {
             ...state,
             isLoading: false,
             list: examples,
         };
     }
     default: return state;
    }
};

export default examplesReducer;
