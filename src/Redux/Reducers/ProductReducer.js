import { FETCH_DATA, CHANGE_SIZE_INDEX } from '../Actions/ActionTypes';

const initialState = {
  items: [],
  indexArray: [],
};

export default function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        items: action.payload.data,
        indexArray: action.payload.indexArray,
      };
    case CHANGE_SIZE_INDEX:
      return {
        ...state,
        indexArray: action.payload.indexArray,
      };
    default:
      return state;
  }
}
