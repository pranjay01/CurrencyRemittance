import { getTransactionList, logOut } from '../constants/action-types';

const defaultState = {
  TransactionListStore: {
    TransactionList: [],
    PageNo: 0,
    TotalCount: 0,
  },
};

const TransactionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case getTransactionList: {
      return {
        ...state,
        TransactionListStore: { ...state.TransactionListStore, ...action.payload },
      };
    }

    case logOut: {
      return {
        ...state,
        TransactionListStore: { TransactionList: [] },
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default TransactionReducer;
