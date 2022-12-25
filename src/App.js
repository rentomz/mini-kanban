import Header from './components/Header';
import './index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconPlus from './assets/ic_plus.png';

import Card from './components/Card';
import Popup from './components/Popup';

function App() {
  const [todos, setTodos] = useState([]);
  const [popupButton, setPopupButton] = useState(false);

  //Popup
  const [name, setName] = useState('');
  const [progress, setProgress] = useState('');
  const [idTodos, setIdTodos] = useState('');

  useEffect(() => {
    const getDataTodo = async () => {
      await axios({
        method: 'get',
        url: '/todos',
      })
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log('finish');
        });
    };
    getDataTodo();
  }, []);

  //method "storeItem"
  const storeItem = async (e) => {
    //send data to server
    const data = {
      name: name,
      progress_percentage: progress,
    };
    await axios({
      method: 'post',
      url: '/todos/' + idTodos +'/items',
      data: data,
    })
      .then((response) => {
        window.location.reload(false)
        setPopupButton(false)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('finish');
      });
  };
  return (
    <div className="App">
      <Header />
      {/* Board Column */}
      <div className="board flex flex-wrap gap-5 my-5 mx-5 lg:flex-nowrap">
        {todos.map((board, index) => {
          return (
            <div className="board-col w-1/1  lg:w-1/4 basis-full " key={index}>
              <div className="text-xs font-normal group-task">{board.title}</div>
              <h2
                className="text-xl font-bold mt-3"
                style={{ color: '#404040' }}
              >
                {board.description}
              </h2>
              <Card parentData={board} dataTodos={todos} indexTodos={index} />
              <button
                className="flex mt-4 cursor-pointer w-fit"
                onClick={() => {
                  setPopupButton(true)
                  setIdTodos(board.id)
                }}
              >
                <img src={IconPlus} alt="Icon Plus" className="w-4 h-4" />
                <h1 className="ml-2 text-xs">New Task</h1>
              </button>
              <Popup
                trigger={popupButton}
                setTrigger={setPopupButton}
                valName={name}
                setName={setName}
                valProgress={progress}
                setProgress={setProgress}
                saveData={storeItem}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
