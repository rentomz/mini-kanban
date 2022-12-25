import React from 'react';
import icClose from '../assets/close.png';
import icWarning from '../assets/dialog_delete.png';

function DialogDelete(props) {
  return (
    <div
      className={props.trigger ? 'modal display-block' : 'modal display-none'}
    >
      <section className="modal-main p-6 rounded-xl">
        <div className="flex justify-between top">
          <div className="flex justify-center items-center">
            <img src={icWarning} alt="Dialog Delete" />
            <h1 className="text-lg font-bold text-primary-black ml-4">
              Delete Task
            </h1>
          </div>
          <button type="button" onClick={() => props.setTrigger(false)}>
            <img src={icClose} alt="cLose" />
          </button>
        </div>
        <div className="main mt-6">
          <h1 className='text-sm '>
            Are you sure want to delete this task? your action can’t be
            reverted.
          </h1>
          <div className="footer float-right mt-6">
            <button
              className="border py-1 px-4 text-sm font-bold rounded mx-2"
              onClick={() => props.setTrigger(false)}
            >
              Cancel
            </button>
            <button
              className="shadow-sm py-1 px-4 text-sm text-white font-bold rounded mx-2 bg-[#E11428]"
              onClick={() => {
                props.deleteData();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DialogDelete;
