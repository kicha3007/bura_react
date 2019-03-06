import React, {Component} from "react";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";
import "./App.css";

class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch")
        ],
        term: ""
    };

    createTodoItem(text) {
        return {
            label: text,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => {
             return ( el.id === id)
            });

            const newArray = [
                ... todoData.slice(0, idx),
                ... todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }

        });
    };

    addItem = (text) => {

        const newItem = this.createTodoItem(text);


        this.setState(({todoData}) => {

            const newArr = [
                ...todoData,
                newItem
            ]

            return {
                todoData: newArr
            }

        });

    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => {
            return ( el.id === id)
        });

        const oldItem = arr[idx];

        const newItem = {...oldItem,
            [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]

    }

    onToggleImportant = (id) => {
        this.setState(({todoData})=> {
            return {
                todoData: this.toggleProperty(todoData, id, "important")
            }

        });
    };

    onToggleDone = (id) => {
        this.setState(({todoData})=> {
            return {
                todoData: this.toggleProperty(todoData, id, "done")
            }

        });

    };

    iterationItemDisplay = (array, display) => {

        const doneItems = document.querySelectorAll(array);

        doneItems.forEach(function (item, indx) {
            item.parentNode.style.display = display;
        });
    }

    onActiveShow = () => {
        this.iterationItemDisplay(".todo-list-item", "block");
        this.iterationItemDisplay(".todo-list-item.done", "none");
    }

    onDoneShow = () => {
        this.iterationItemDisplay(".todo-list-item", "block");
        this.iterationItemDisplay(".todo-list-item:not(.done)", "none");
    }

    onAllShow = () => {
        this.iterationItemDisplay(".todo-list-item", "block");
    }

    search(items, term) {
        if (term.length == 0){
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });

    }

    onSearchChenage = (term) => {
        this.setState({term});
    };

    render() {

        const { todoData, term } = this.state;

        const visibliItems = this.search(todoData, term);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;


        return (
            

            <div className="todo-app">
                <AppHeader
                toDo={todoCount}
                done={doneCount}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onSearchChenage={this.onSearchChenage}
                    />
                    <ItemStatusFilter
                    onActiveShow={this.onActiveShow}
                    onDoneShow={this.onDoneShow}
                    onAllShow={this.onAllShow}
                    />
                </div>
                <TodoList
                    todos={visibliItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm
                    onItemAdded={this.addItem}
                />
            </div>
        )

    }

}

export default App;