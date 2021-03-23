import React from "react";

export default function Record({
  time,
  event,
  setup,
  deleteRecord,
  index,
  moveElementFrom,
  moveElementTo,
}) {
  const date = new Date(time);
  const formatedDate = date.toLocaleString();
  const htmlTag = setup.nodeName
    ? setup.nodeName
    : (setup.url && event.type) === "navigate"
    ? "No tag, it's browser navigation"
    : "?";

  return (
    <li
      draggable
      className="record-element"
      onDragOver={(e) => {
        e.preventDefault(); 
      }}
      onMouseDown={e => moveElementFrom(index)}
      onDrop={(e)=> moveElementTo(index)}
 
    >
      <div className="record-info">
        <div>Event type : {event.type} </div>
        <div>HTML Tag : {htmlTag} </div>
        <div>Event happened on {formatedDate}</div>
      </div>
      <div className="delete-button" onClick={() => deleteRecord(time)}>
        {" "}
        X{" "}
      </div>
    </li>
  );
}
