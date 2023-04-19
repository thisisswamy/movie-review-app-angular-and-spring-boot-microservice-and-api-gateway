import { ActionReducer, ActionReducerMap, createReducer } from '@ngrx/store';
import { ApplicationState } from '../state/application.state';
import { UserLoggedStatusReducer } from './user-logged.reducer';
import { selectedMovieReducer } from './selected-movie.reducer';

export const applicationReducers:ActionReducerMap<ApplicationState,any> ={
  userLoggedStatus: UserLoggedStatusReducer,
  selectedMovie: selectedMovieReducer
}

