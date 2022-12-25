import React from 'react';
import icClose from '../assets/close.png';

function Popup(props) {
  return (
    <div
      className={props.trigger ? 'modal display-block' : 'modal display-none'}
    >
      <section className="modal-main p-6 rounded-xl">
        <div className="flex justify-between top">
          <h1 className="text-lg font-bold text-primary-black ">Create Task</h1>
          <button type="button" onClick={() => props.setTrigger(false)}>
            <img src={icClose} alt="cLose" />
          </button>
        </div>
        <div className="main mt-6">
          <div>
            <label
              htmlFor="small-input"
              className="block mb-2 text-xs font-bold text-gray-900"
            >
              Task Name
            </label>
            <input
              type="text"
              id="small-input"
              className="block w-full p-2 text-gray-900 border rounded-lg text-xs"
              placeholder='Type your Task'
              value={props.valName} 
              onChange={(e) => props.setName(e.target.value)}
            ></input>
          </div>
          <div className='mt-4'>
            <label
              htmlFor="small-input"
              className="block mb-2 text-xs font-bold text-gray-900"
            >
              Progress
            </label>
            <input
              type="number"
              id="small-input"
              className="block w-fit p-2 text-gray-900 border rounded-lg text-xs"
              placeholder='70 %'
              value={props.valProgress} 
              max={100}
              onChange={(e) => {
                if(e.target.value > 100){ 
                  window.alert("Progress shouldn't exceed 100")
                } else {
                  props.setProgress(e.target.value)
                }
              }}
            ></input>
          </div>
          <div className='footer float-right mt-6'>
            <button className='border py-1 px-4 text-sm font-bold rounded mx-2' onClick={() => props.setTrigger(false)}>
            Cancel
            </button>
            <button className='shadow-sm py-1 px-4 text-sm text-white font-bold rounded mx-2 bg-[#01959F]' onClick={() => {
              props.saveData()
            }}>
            Save Task
            </button>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Popup;
