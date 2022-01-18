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
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE': 
            return {
                ...state,
                heroes: state.heroes.filter(hero => hero.id !== action.payload)
            }
        case 'HERO_ADD': {
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
               
            }
        }
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

export default reducer;