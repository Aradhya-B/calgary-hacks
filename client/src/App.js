import { createStore } from 'redux';
import { Provider} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Summary from './views/Summary';
import Upload from './views/Upload';

import reducers from './reducers';

const store = createStore(reducers, {modals: [], keywordMap: {}});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Upload} />
          <Route exact path="/notes" component={Summary} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
