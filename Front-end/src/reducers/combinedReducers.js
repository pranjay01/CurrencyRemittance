import ProfileReducer from './ProfileReducer';
import ConversionRateReducer from './ConversionRateReducer';

import { combineReducers } from 'redux';

const finalReducers = combineReducers({
  ProfileReducer: ProfileReducer,
  ConversionRateReducer: ConversionRateReducer,
});

export default finalReducers;
