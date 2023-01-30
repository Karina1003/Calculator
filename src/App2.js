import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Examples from './containers/Examples.js';
import examplesReducer from './reducers/examples.js';


const store = createStore(examplesReducer);

const App2 = () => {
    return (
        <div>
            <Provider store = {store}>
                <Examples />
            </Provider>
        </div>
    )
}

export default App2;