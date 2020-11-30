import { UpdateUserProfile } from '../constants/action-types';

const defaultState = {
  UserInfoStore: {
    UserProfile: { UserName: 'ps@gmail.com', Nickname: 'pran' },
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
