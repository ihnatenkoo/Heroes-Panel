import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { heroAdd } from "../../actions";
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [element, setElement] = useState("");

    const {heroes, filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();


    const onSubmit = (event) => {
        event.preventDefault();
        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        }
      
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        .then(dispatch(heroAdd([...heroes, newHero])))
        .catch(console.log("Error"))
      
        setName("");
        setDescription("");
        setElement("")
    }

    const renderOptions = (filters) => {
        return filters.map(item => {
            if (item.name === "all") return;
            return (
                <option value={item.name} key={uuidv4()}>{item.label}</option>
            )
        })
    }

    return (
        <form onSubmit={onSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    onChange={e => setName(e.target.value)}
                    value={name}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={e => setElement(e.target.value)}
                    value={element}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {renderOptions(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;