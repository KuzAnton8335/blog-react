import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { AppReducer,postReducer, postsReducer, userReducer, usersReducer, } from './reducers';

// редьюсер для настройки store
const reducer = combineReducers({
	app: AppReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
});

// подключаем расширение для redux-devTools compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
