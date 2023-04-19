import { createAction, props, Action } from '@ngrx/store';
import { SelectedMovieState } from '../state/selected-movie.state';

export enum SelectedMovieActionType{
  SELECTED_MOVIE= '[SM] Selected Movie',
}

export class SelectedMovieAction implements Action{
  readonly type=SelectedMovieActionType.SELECTED_MOVIE;
  constructor(public payload :SelectedMovieState){}
  
}






