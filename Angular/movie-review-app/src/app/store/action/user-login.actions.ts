import { createAction, props, Action } from '@ngrx/store';
import { UserLoginState } from '../state/user-login.state';

export enum UserStatusType{
   USER_STATUS = '[US] User Status'
}

export class UserStatus implements Action{
  readonly type=UserStatusType.USER_STATUS;

  constructor(public payload:UserLoginState){}
  
}
