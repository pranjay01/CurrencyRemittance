import ProfileReducer from './ProfileReducer';

import { combineReducers } from 'redux';

const finalReducers = combineReducers({
  ProfileReducer: ProfileReducer,
});

export default finalReducers;
