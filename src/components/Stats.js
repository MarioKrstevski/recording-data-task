import React from "react";

export default function Stats({ stats }) {
  if (!stats) {
    return (
      <div className="stats">you can click on STATS button to generate </div>
    );
  }

  function msToTime(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;

    return hrs + " hrs, " + mins + "mins, " + secs + " secs. " + ms + " ms";
  }
  const presentableTime = msToTime(stats.interactionDuration);

  return (
    <div className="stats">
      <div>Number of event types: {Object.keys(stats.eventTypes).length}</div>
      <div>{JSON.stringify(stats.eventTypes, null, 2)}</div>
      <hr />
      <div>
        Total time of interaction: {stats.interactionDuration}ms ={" "}
        {presentableTime}
      </div>
      <hr />
      <div>
        Length of the longest sequence of following input events is :{" "}
        {stats.longestSequence.length} events
      </div>
      <div>
        As follows:{" "}
        {stats.longestSequence.map((event, index) => (
          <span key={index}>
            {event} {index === stats.longestSequence.length - 1 ? "" : "->"}
          </span>
        ))}
      </div>
      <hr />
        <div>
            Time delay between interactions 
        </div>
        <div>
            Min : {stats.timeDelayBetweenInteractions.min} = {msToTime(stats.timeDelayBetweenInteractions.min)}
        </div>
        <div>
            Max : {stats.timeDelayBetweenInteractions.max} = {msToTime(stats.timeDelayBetweenInteractions.max)}
        </div>
        <div>
            Mean : {stats.timeDelayBetweenInteractions.mean} = {msToTime(stats.timeDelayBetweenInteractions.mean)}
        </div>
    </div>
  );
}
