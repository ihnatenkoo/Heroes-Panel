const initialState = {
    heroes: [],
    filteredHeroes: [],
    heroesLoadingStatus: 'idle',
    activeFilter: 'all',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroes: state.activeFilter === 'all' 
                                ? action.payload
                                : action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE': 
            const newArr = state.heroes.filter(hero => hero.id !== action.payload);
            return {
                ...state,
                heroes: newArr,
                filteredHeroes: state.activeFilter === 'all' 
                                ? newArr
                                : newArr.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_ADD': {
            const newArr = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newArr,
                filteredHeroes: state.activeFilter === 'all' 
                                ? newArr
                                : newArr.filter(item => item.element === state.activeFilter)
            }
        }
        case 'FILTER_CHANGE': 
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' 
                                ? state.heroes
                                : state.heroes.filter(item => item.element === action.payload)
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

export default reducer;