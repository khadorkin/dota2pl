import { UPDATE_STREAM_LIST } from '../constants';


const reducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_STREAM_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

export const updateStreamList = (streamList) => ({
  type: UPDATE_STREAM_LIST,
  payload: streamList,
});
