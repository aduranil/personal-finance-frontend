import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(reduxThunk))

const Root = ({ store }) => {
  return (
    <Router>
      <Provider store={store}>
        <Route path = '/' component={App} />
      </Provider>
    </Router>
  )
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
