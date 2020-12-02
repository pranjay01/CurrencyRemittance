import ProfileReducer from './ProfileReducer';
import ConversionRateReducer from './ConversionRateReducer';
import OfferListReducer from './OfferListReducer';
import SignupModalViewReducer from './SignupModalViewReducer';

import { combineReducers } from 'redux';

const finalReducers = combineReducers({
  ProfileReducer: ProfileReducer,
  ConversionRateReducer: ConversionRateReducer,
  OfferListReducer: OfferListReducer,
  SignupModalViewReducer: SignupModalViewReducer,
});

export default finalReducers;
