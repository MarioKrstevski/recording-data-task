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
      onDragOverCapture={(e) => e.preventDefault()}
      className="record-element"
      onDropCapture={(e) => moveElementTo(index)}
      onDragOver={(e) => {
        e.preventDefault(); console.log(e)
      }}
      onDragStart={(e) => moveElementFrom(index)}
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
