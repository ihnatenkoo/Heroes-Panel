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

export const heroDelete = (id) => {
    return {
        type: 'HERO_DELETE',
        payload: id
    }
}

export const heroAdd = (newHero) => {
    return {
        type: 'HERO_ADD',
        payload: newHero
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