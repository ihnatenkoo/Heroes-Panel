import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { fetchHeroes } from '../heroesList/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === "all") {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector)
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} id={id} {...props}/>
        });   
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {heroesLoadingStatus === "loading" && <h5 className="text-center mt-5">{<Spinner/>}</h5>}
            {heroesLoadingStatus === "error" && <h5 className="text-center mt-5">Ошибка загрузки</h5>}
            {heroesLoadingStatus === "idle" && elements}
        </ul>
    )
}

export default HeroesList;