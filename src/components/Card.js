import React from 'react';
import checklist from '../assets/checklist.png';
import dotHorizontal from '../assets/fi_more-horizontal.png';

export default function Card() {
  return (
    <div className="card py-4 px-4 border bg-[#FAFAFA] rounded">
      <h1 className="font-bold text-sm ">
        Re-designed the zero-g doggie bags. No more spills!
      </h1>
      <hr className="mt-2 mb-3 border-natural border-dashed" />
      <div className="flex flex-wrap align-middle items-center">
        <div className="left basis-8/12">
          <div className="Progress_Status">
            <div className="myprogressBar"></div>
          </div>
        </div>
        <div className="percent w-2/12 p-2">
          {/* if data belum 100% */}
          <h1 className="text-xs" style={{ color: '#757575' }}>
            30%
          </h1>
          {/* if data 100% */}
          {/* <img src={checklist} alt="Checklist" /> */}
        </div>
        <div className="right basis-2/12">
          <a href="">
          <img src={dotHorizontal} alt="More" className="ml-auto" />

          </a>
        </div>
      </div>
    </div>
  );
}
