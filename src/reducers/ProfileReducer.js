import { UpdateUserProfile } from '../constants/action-types';

const defaultState = {
  UserInfoStore: {
    UserProfile: { userName: '', nickname: '' },
  },
};

const ProfileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UpdateUserProfile: {
      return {
        ...state,
        UserInfoStore: { ...state.UserInfoStore, ...action.payload },
        //   return Object.assign(state, action.payload);
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default ProfileReducer;
