import { UserLoginState, initialUserLoginState } from './user-login.state';
import { SelectedMovieState, initialSelectedMovieState } from './selected-movie.state';


export interface ApplicationState {
  userLoggedStatus:UserLoginState,
  selectedMovie:SelectedMovieState

}

export const initialAppState:ApplicationState={
  userLoggedStatus: initialUserLoginState,
  selectedMovie: initialSelectedMovieState
};

export function getInitialState():ApplicationState{
  return initialAppState;
}


