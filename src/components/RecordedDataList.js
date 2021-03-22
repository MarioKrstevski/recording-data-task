import React from "react";
import Record from "./Record";

function RecordedDataList({ records, deleteRecord, moveElementFrom, moveElementTo }) {
  if (!records || records.length === 0) {
    return <div> There are no records yet </div>;
  }
  return (
    <ul className="record-list">
      {records.map((record,idx) => (
        <Record
        moveElementFrom={moveElementFrom}
        moveElementTo={moveElementTo}
          time={record.time}
          index={idx}
          event={record.event}
          setup={record.setup}
          //time is enough as key since it's not repeatable, but I'm adding this random number just in case and also 
          // I have separate json where the original provided is duplicated xMany times so then I have duplicates
          key={record.time.toString()+ Math.random().toString(36).substr(2, 9)}
          deleteRecord={deleteRecord}
        />
      ))}
    </ul>
  );
}

export default RecordedDataList;
