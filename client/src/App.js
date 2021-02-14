import { createStore } from 'redux';
import { Provider} from 'react-redux';
import Summary from './views/Summary';
import Upload from './views/Upload';

import reducers from './reducers';

const store = createStore(reducers, {modals: [], keywordMap: {}});

const App = () => {
  return (
    <Provider store={store}>
      <Summary />
    </Provider>
  );
}

export default App;
