import thunk from 'redux-thunk';
import { createStore, applyMiddleware	} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer/index';

const store = createStore( rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

// composeWithDevTools(applyMiddleware(thunk)) es una libreria que permite traer 
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; y trabajar con las herrammientas de redux