import {
  ADD_UI_ERROR,
  REMOVE_UI_ERROR
} from '../../constants/ActionTypes';

const initialState = {
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_UI_ERROR:
      return {
        ...state,
        error: true
      };
    case REMOVE_UI_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return {...state}
  }
};

export default reducer;
