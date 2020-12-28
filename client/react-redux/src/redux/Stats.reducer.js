const initialState = {
  stats: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_COUNTRY': {
      return action.payload
    }
    default:
      return state;
  }
}