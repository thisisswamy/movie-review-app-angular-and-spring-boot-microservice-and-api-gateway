import { SelectedMovieState, initialSelectedMovieState } from '../state/selected-movie.state';
import { SelectedMovieAction, SelectedMovieActionType } from '../action/selected-movie.actions';


export function selectedMovieReducer(state:SelectedMovieState=initialSelectedMovieState,action:SelectedMovieAction):SelectedMovieState{
  if(action.type === SelectedMovieActionType.SELECTED_MOVIE){
    return {
      ...state,
      selectedMovie : action.payload.selectedMovie
    }
  }
  else{
    return state;
  }
}

