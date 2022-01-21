import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onFilterChange, fetchFilters} from "../heroesFilters/filtersSlice";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active

const HeroesFilters = () => {
    const {activeFilter, filters, filterLoadingStatus} = useSelector(state=> state.filters);
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(fetchFilters())
         // eslint-disable-next-line
    }, [])


    const renderFilterBtn = (filters) => {
        return filters.map(item => 
            (<button 
                key={item.id}
                onClick={() => dispatch(onFilterChange(item.name))} 
                className={`btn ${item.className} ${item.name === activeFilter   ? "active" : ""}`}>
                {item.label}
            </button>))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterLoadingStatus === "loading" && <Spinner/>}  
                    {filterLoadingStatus === "error" && "Ошибка загрузки списка фильтров"}  
                    {filters.length > 0 && renderFilterBtn(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;