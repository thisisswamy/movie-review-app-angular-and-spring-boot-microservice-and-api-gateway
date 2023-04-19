import { UserLoginState, initialUserLoginState } from '../state/user-login.state';
import { UserStatusType } from '../action/user-login.actions';
export function UserLoggedStatusReducer(state:UserLoginState =initialUserLoginState,action:any):UserLoginState{

  if(action.type===UserStatusType.USER_STATUS){
    return {
      ...state,
      isUserLoggedIn:action.payload.isUserLoggedIn,
    }
  }
  else{
    return state
  }
}
