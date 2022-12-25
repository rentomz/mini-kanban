import checklist from '../assets/checklist.png';
import dotHorizontal from '../assets/fi_more-horizontal.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Card({ parentData }) {
  const [items, setItems] = useState([]);

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
  return (
    <div>
      {items.map((v, index) => {
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
                <a href="">
                  <img src={dotHorizontal} alt="More" className="ml-auto" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
