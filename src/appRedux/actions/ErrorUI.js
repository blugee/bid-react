import {
  ADD_UI_ERROR,
  REMOVE_UI_ERROR
} from '../../constants/ActionTypes'

export const addUIError = () => {
    return {
        type: ADD_UI_ERROR
    };
};

export const removeUIError = () => {
    return {
        type: REMOVE_UI_ERROR
    };
};
