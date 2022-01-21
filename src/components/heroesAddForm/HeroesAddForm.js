import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { heroAdd } from "../heroesList/heroesSlice";
import { nanoid } from "@reduxjs/toolkit";

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

    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();


    const onSubmit = (event) => {
        event.preventDefault();
        const newHero = {
            id: nanoid(),
            name,
            description,
            element
        }
      
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(console.log("OK"))
            .then(dispatch(heroAdd(newHero)))
            .catch(console.log("Error"))
      
        setName("");
        setDescription("");
        setElement("")
    }

    const renderOptions = (filters) => {
        return filters.map(item => {
            if (item.name === "all") return null;
            return (
                <option value={item.name} key={item.id}>{item.label}</option>
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