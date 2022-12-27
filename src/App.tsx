import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<ToDo[]>([]);

  type ToDo = {
    id: number;
    inputValue: string;
    checked: boolean;
  }

  const handoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 画面のリロードを行わないように出来る

    const newToDo: ToDo = {
      id: todos.length + Math.floor(Math.random() * 1000000),
      inputValue: inputValue,
      checked: false,
    }

    setTodos([newToDo, ...todos]);
    // console.log(todos);
    setInputValue('');
  }

  const handoleEdit = (id: number, inputValue: string) => {
    const newToDos = todos.map(todo => {
      if(todo.id === id) {
        todo.inputValue = inputValue
      }
      return todo;
    })
    setTodos(newToDos);
  }

  const handoleChecked = (id: number, checked: boolean) => {
    const newToDos = todos.map(todo => {
      if(todo.id === id) {
        todo.checked = !checked
      }
      return todo;
    })
    setTodos(newToDos);
  }

  const handleDelete = (id: number) => {
    const newToDos = todos.filter(todo => todo.id !== id);
    setTodos(newToDos);
  }

  return (
    <div className="App">
      <div>
        <h2>ToDoリスト</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => handoleChange(e)} className="inputText" value={inputValue} />
          <input type="submit" value="作成" className="submitButton"/>
        </form>
        <ul>
          {
            todos.map(todo => (
              <li key={todo.id} className="todoList">
                <input 
                  type="text" 
                  onChange={(e) => handoleEdit(todo.id, e.target.value)} 
                  className="inputText" 
                  value={todo.inputValue} 
                  disabled={todo.checked}
                />
                <input 
                  type="checkbox" 
                  onChange={() => handoleChecked(todo.id, todo.checked)}
                />
                <button onClick={() => handleDelete(todo.id)}>削除</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
