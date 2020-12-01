import ProfileReducer from './ProfileReducer';
import ConversionRateReducer from './ConversionRateReducer';
import OfferListReducer from './OfferListReducer';

import { combineReducers } from 'redux';

const finalReducers = combineReducers({
  ProfileReducer: ProfileReducer,
  ConversionRateReducer: ConversionRateReducer,
  OfferListReducer: OfferListReducer,
});

export default finalReducers;
