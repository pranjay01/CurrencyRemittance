import { logOut, updateConversionRates } from '../constants/action-types';

const defaultState = {
  ConversionRateStore: {
    conversionRates: [],
  },
};

const ConversionRateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case updateConversionRates: {
      return {
        ...state,
        ConversionRateStore: { ...state.ConversionRateStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }
    case logOut: {
      return {
        ...state,
        ConversionRateStore: { conversionRates: [] },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default ConversionRateReducer;
