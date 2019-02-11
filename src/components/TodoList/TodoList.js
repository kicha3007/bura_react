import React from "react";

import TodoListItem from "../TodoListItem";

const TodoList = () => {
    return (
        <ul>
            <li><TodoListItem label="Drink Coffee"/></li>
            <li><TodoListItem label="Build React App"/></li>
        </ul>
    )
}

export default TodoList;