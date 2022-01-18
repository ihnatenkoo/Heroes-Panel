const initialState = {
  activeFilter: 'all',
  filters: []
}

const filters = (state = initialState, action) => {
  switch (action.type) {
      case 'FILTER_CHANGE': 
          return {
              ...state,
              activeFilter: action.payload,
          }
      case 'GET_ALL_FILTERS': {
          return {
              ...state,
              filters: action.payload
          }
      }
      default: return state
  }
}

export default filters;