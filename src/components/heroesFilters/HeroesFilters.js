import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onFilterChange } from "../../actions";
import { getAllFilters } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active

const HeroesFilters = () => {
    const {activeFilter, filters} = useSelector(state=> state);
    const dispatch = useDispatch();
    const {request} = useHttp();
   
    useEffect(() => {
        getFilters();
    }, [])

    const getFilters = () => {
        request("http://localhost:3001/filters")
        .then(console.log("OK"))                    /// в консоли и ОК и Error?
        .then(data => dispatch(getAllFilters(data)))
        .catch(console.log("Error"))     
    }

    const addFilter = (filter) => {
        dispatch(onFilterChange(filter))
    }

    const renderFilterBtn = (filters) => {
        return filters.map((item,i) => 
            (<button 
                key={uuidv4()}
                onClick={() => addFilter(item.name)} 
                className={`btn ${item.className} ${item.name === activeFilter   ? "active" : ""}`}>
                {item.label}
            </button>))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilterBtn(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;