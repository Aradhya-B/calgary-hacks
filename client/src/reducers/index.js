import { combineReducers } from 'redux';
import keywordReducer from './keyword';
import modalReducer from './modal';
import summaryReducer from './summary';
import originalReducer from './original';

const rootReducer = combineReducers({
  keywordMap: keywordReducer,
  modals: modalReducer,
  summary: summaryReducer,
  original: originalReducer
});

export default rootReducer