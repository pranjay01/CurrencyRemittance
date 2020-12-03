import ProfileReducer from './ProfileReducer';
import ConversionRateReducer from './ConversionRateReducer';
import OfferListReducer from './OfferListReducer';
import SignupModalViewReducer from './SignupModalViewReducer';
import TransactionReducer from './TransactionReducer';

import { combineReducers } from 'redux';

const finalReducers = combineReducers({
  ProfileReducer: ProfileReducer,
  ConversionRateReducer: ConversionRateReducer,
  OfferListReducer: OfferListReducer,
  SignupModalViewReducer: SignupModalViewReducer,
  TransactionReducer: TransactionReducer,
});

export default finalReducers;
