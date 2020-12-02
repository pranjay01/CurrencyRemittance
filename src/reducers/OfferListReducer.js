import { getOfferLists, logOut, updateFocusOffer } from '../constants/action-types';

const defaultState = {
  OfferListStore: {
    offerLists: [],
    PageNo: 0,
    TotalCount: 0,
  },
  onFocusOfferStore: {
    Offer: {},
  },
};

const OfferListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getOfferLists: {
      return {
        ...state,
        OfferListStore: { ...state.OfferListStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }
    case updateFocusOffer: {
      return {
        ...state,
        onFocusOfferStore: { ...state.onFocusOfferStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }
    case logOut: {
      return {
        ...state,
        OfferListStore: { offerLists: [] },
        onFocusOfferStore: { Offer: {} },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default OfferListReducer;
