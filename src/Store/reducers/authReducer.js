import { USER_LOGIN, USER_LOGOUT } from "../actions/authAction";
import { authItem } from "../initialValues/authItem";

const initialState = {
  authItem: authItem,
};

export default function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        authItem: [...[payload]],
      };

    case USER_LOGOUT:
      return {
        ...state,
        authItem: [
          {
            token: "",
            user: {
              email: "",
              id: 0,
              mailVerify: false,
              name: "",
              surname: "",
              userType: { id: 0, name: "anonim" },
            },
          },
        ],
      };

    default:
      return state;
  }
}
