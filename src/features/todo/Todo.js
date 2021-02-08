import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit'
import {
  addTodo,
  updateTodo,
  markTodoAsDone,
  deleteTodo,
  selectTodos
} from './todoSlice';
import styles from './Todo.module.css';

export function Todo() {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const renderedList = todos.map(todo => (
      <li key={todo.id}>
          <p style={{ textDecoration: todo.done ? 'line-through' : '' }}>{todo.text}</p>
          <input type="checkbox" onChange={() => dispatch(markTodoAsDone({id: todo.id, done: todo.done}))}/>
          <button
            className={styles.button}
            onClick={() => {
              const newText = window.prompt("Edit todo: ", todo.text)
                if (newText) {
                  dispatch(updateTodo( {id: todo.id, text: newText } ))
                }
              }
            }
          >
            Edit
          </button>
          <button
            className={styles.button}
            onClick={() => {
                dispatch(deleteTodo( { id: todo.id } ))
              }
            }
          >
            Delete
          </button>
      </li>
  ));
  
    return (
      <div>
        <div className={styles.row}>
          <ul>
            {renderedList}
          </ul>
        </div>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label="Write todo text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() => {
                if (text)
                  dispatch(addTodo( {id: nanoid(), text, done: false} ))
              }
            }
          >
            Add todo
          </button>
        </div>
      </div>
    );
  }