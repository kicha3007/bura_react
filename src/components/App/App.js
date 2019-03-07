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
        term: "",
        filter: "all"
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

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    filter(items, filter) {
        switch(filter) {
            case "all":
                return items;
            case "active":
                return items.filter((el) => {
                    return !el.done;
                })
            case "done":
                return items.filter((el) => {
                    return el.done;
                })
            default:
                return items;
        }
    }

    render() {

        const { todoData, term, filter } = this.state;

        const visibliItems = this.filter(this.search(todoData, term), filter);

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
                    filter={filter}
                    onFilterChange={this.onFilterChange}
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