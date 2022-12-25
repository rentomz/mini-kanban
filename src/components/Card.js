import checklist from '../assets/checklist.png';
import dotHorizontal from '../assets/fi_more-horizontal.png';
import icEdit from '../assets/ic_edit.png';
import icDelete from '../assets/ic_delete.png';
import icRight from '../assets/ic_right.png';
import icLeft from '../assets/ic_left.png';
import React, { useEffect, useState } from 'react';
import Popup from './Popup';
import axios from 'axios';
import DialogDelete from './DialogDelete';

export default function Card({ parentData, dataTodos, indexTodos }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [popupButton, setPopupButton] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);

  //Popup
  const [targetId, setTargetId] = useState('');
  const [idItem, setIdItem] = useState('');
  const [name, setName] = useState('');
  const [progress, setProgress] = useState('');

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: '/todos/' + parentData.id + '/items',
    })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('finish');
      });
  }, []);

  const storeItem = async (e) => {
    //send data to server
    const data = {
      name: name,
      progress_percentage: progress,
      target_todo_id: parentData.id,
    };
    await axios({
      method: 'patch',
      url: '/todos/' + parentData.id + '/items/' + idItem,
      data: data,
    })
      .then((response) => {
        console.log(response.data);
        window.location.reload(false);
        setPopupButton(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('finish');
      });
  };

  // Move Item
  const moveItem = async (e) => {
    //send data to server
    const data = {
      target_todo_id: targetId,
    };
    await axios({
      method: 'patch',
      url: '/todos/' + parentData.id + '/items/' + idItem,
      data: data,
    })
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('finish');
      });
  };

  const deleteItem = async (e) => {
    //send data to server
    await axios({
      method: 'delete',
      url: '/todos/' + parentData.id + '/items/' + idItem,
    })
      .then((response) => {
        window.location.reload(false);
        setPopupDelete(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('finish');
      });
  };

  return (
    <div>
      {items.map((v, index) => {
        var isMiddle = true;

        if(indexTodos == 0){
          isMiddle = false;
        }else if (indexTodos == dataTodos.length-1) {
          isMiddle = false;
        }
        return (
          <div
            className="card py-4 px-4 border bg-[#FAFAFA] rounded"
            key={index}
          >
            <h1 className="font-bold text-sm ">{v.name}</h1>
            <hr className="mt-2 mb-3 border-natural border-dashed" />
            <div className="flex flex-wrap align-middle items-center">
              <div className="left basis-8/12">
                <div className="Progress_Status">
                  {v.progress_percentage >= 100 ? (
                    <div className="myprogressBarSuccess"></div>
                  ) : (
                    <div
                      className="myprogressBar"
                      style={{ width: v.progress_percentage }}
                    ></div>
                  )}
                </div>
              </div>
              <div className="percent w-2/12 p-2">
                {v.progress_percentage >= 100 ? (
                  <img src={checklist} alt="Checklist" />
                ) : (
                  <h1 className="text-xs" style={{ color: '#757575' }}>
                    {v.progress_percentage} %
                  </h1>
                )}
              </div>
              <div className="right basis-2/12">
                <div className="popover__wrapper">
                  <button onClick={toggleOverlay}>
                    <img src={dotHorizontal} alt="More" className="ml-auto" />
                  </button>
                  <div className="popover__content py-4 px-8">
                    <button
                      className="flex mb-4"
                      onClick={() => {
                        setIdItem(v.id);
                        
                        if(dataTodos.length - 1 == indexTodos) {
                          setTargetId(dataTodos[indexTodos-1].id)
                          // console.log(dataTodos[indexTodos-1])
                        } else {
                          setTargetId(dataTodos[indexTodos+1].id)
                        }
                        moveItem()
                      }}
                    >
                      <img src={dataTodos.length - 1 == indexTodos ? icLeft : icRight} alt="Icon Edit" />
                      <h1 className="ml-4 font-semibold text-sm">
                        {dataTodos.length - 1 == indexTodos ? 'Move Left' : 'Move Right'}
                      </h1>
                    </button>
                    {
                      isMiddle ?  (
                        <button
                        className="flex mb-4"
                        onClick={() => {
                          setIdItem(v.id);
                          
                          if(dataTodos.length - 1 != indexTodos) {
                            setTargetId(dataTodos[indexTodos-1].id)
                            // console.log(dataTodos[indexTodos-1])
                          } else {
                            setTargetId(dataTodos[indexTodos+1].id)
                          }
                          moveItem()
                        }}
                      >
                        <img src={dataTodos.length - 1 != indexTodos ? icLeft : icRight} alt="Icon Edit" />
                        <h1 className="ml-4 font-semibold text-sm">
                          {dataTodos.length - 1 != indexTodos ? 'Move Left' : 'Move Right'}
                        </h1>
                      </button>
                      ) : (
                        ""
                      )
                    }
                    <button
                      className="flex mb-4"
                      onClick={() => {
                        setPopupButton(true);
                        setIdItem(v.id);
                        setName(v.name);
                        setProgress(v.progress_percentage);
                      }}
                    >
                      <img src={icEdit} alt="Icon Edit" />
                      <h1 className="ml-4 font-semibold text-sm">Edit</h1>
                    </button>

                    <button
                      className="flex"
                      onClick={() => {
                        setPopupDelete(true);
                        setIdItem(v.id);
                      }}
                    >
                      <img src={icDelete} alt="Icon Delete" />
                      <h1 className="ml-4 font-semibold text-sm">Delete</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Popup
              trigger={popupButton}
              setTrigger={setPopupButton}
              valName={name}
              setName={setName}
              valProgress={progress}
              setProgress={setProgress}
              saveData={storeItem}
            />

            <DialogDelete
              trigger={popupDelete}
              setTrigger={setPopupDelete}
              deleteData={deleteItem}
            />
          </div>
        );
      })}
    </div>
  );
}
