export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDelete = (heroes) => {
    return {
        type: 'HERO_DELETE',
        payload: heroes
    }
}

export const heroAdd = (heroes) => {
    return {
        type: 'HERO_ADD',
        payload: heroes
    }
}

export const onFilterChange = (activeFilter) => {
    return {
        type: 'FILTER_CHANGE',
        payload: activeFilter
    }
}

export const getAllFilters = (filters) => {
    return {
        type: 'GET_ALL_FILTERS',
        payload: filters
    }
}