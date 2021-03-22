import "./App.css";
import RecordedDataList from "./components/RecordedDataList";
import Stats from "./components/Stats";
import taskRecordings from "./task.recording.json";
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3004/records";
// use this key to get a bigger dataset (the previous one but duplicated,PS: looking at the stats with this JSON won't make sense)
const API_URL_BIG_ARRAY = "http://localhost:3004/recordsBig";

function App() {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState(null);
  const [from, setFrom] = useState(null);

  function saveRecords() {
    // File will be saved in the in default Download folder, we can't directly force it to go to the 'Downloads' folder
    const objectData = [...records];
    let filename = "records.json";
    let contentType = "application/json;charset=utf-8;";

    var a = document.createElement("a");
    a.download = filename;
    a.href =
      "data:" +
      contentType +
      "," +
      encodeURIComponent(JSON.stringify(objectData));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  function showStats() {
    setStats(generateStats(records));
  }

  function deleteRecord(selectedRecTime) {
    setRecords(records.filter((rec) => rec.time !== selectedRecTime));
  }
  // this can be placed in another file
  function generateStats() {
    // console.time('stats')

    let stats = {};

    // eventTypes
    let eventTypes = {};
    records.forEach((rec) => {
      if (eventTypes[rec.event.type]) {
        eventTypes[rec.event.type] = eventTypes[rec.event.type] + 1;
      } else {
        eventTypes[rec.event.type] = 1;
      }
    });
    stats.eventTypes = eventTypes;

    //interactionDuration
    let interactionDuration =
      records[records.length - 1].time - records[0].time;
    stats.interactionDuration = interactionDuration;

    //longestSequence
    let longestSequence = [];
    let sequences = [];
    let currSeq = [];
    records.forEach((rec) => {
      if (rec.event.type !== "focus") {
        currSeq.push(rec.event.type);
        if (currSeq.length > longestSequence.length) {
          longestSequence = [...currSeq];
        }
      } else {
        if (currSeq.length) {
          sequences.push(currSeq);
          currSeq = [];
        }
      }
    });
    stats.longestSequence = longestSequence;

    //timeDelayBetweenInteractions
    let timeDelayArray = [];
    let timeDelayBetweenInteractions = {
      min: Infinity,
      max: 0,
      mean: 0,
    };
    for (let i = 1; i < records.length - 1; i++) {
      const neighboursDiff = records[i].time - records[i - 1].time;
      timeDelayArray.push(neighboursDiff);

      // we are calculating min and max here to use the same itteration along the way
      if (neighboursDiff < timeDelayBetweenInteractions.min) {
        timeDelayBetweenInteractions.min = neighboursDiff;
      }
      if (neighboursDiff > timeDelayBetweenInteractions.max) {
        timeDelayBetweenInteractions.max = neighboursDiff;
      }
    }
    timeDelayBetweenInteractions.mean =
      timeDelayArray.reduce((acc, cv) => acc + cv, 0) / timeDelayArray.length;
    stats.timeDelayBetweenInteractions = timeDelayBetweenInteractions;
    // console.timeEnd('stats')

    // for all of the tasks I went with separate for loop (but keeping complexity to maximum of one loop O(n))
    // if speed was really the required trait then I would put all logic into one single loop and calculate everything
    // i can along the way. But that ruins readibility and code separation

    // Another way to get better speed is to use webWorkers to computate things in another thred, and not have our main thread be blocked and busywith computations so that the UI is broken and events are not caught on time


    return { ...stats };
  }

  useEffect(() => {
    async function fetchRecords() {
      // ideally we would use axios as a more depenant lib
      fetch(API_URL)
        .then((resp) => resp.json())
        .then((data) => setRecords(data));
      // the file is served with json-server
    }
    fetchRecords();
  }, []);

  useEffect(() => {
    setStats(null);
  }, [records]);

  function arrayMove(arr, oldPos, newPos) {
    // console.time("move");
    arr.splice(newPos, 0, arr.splice(oldPos, 1)[0]);
    // console.timeEnd("move");

    return arr; // for testing
  }

  function moveElementFrom(position) {
    console.log('ae', position)
    setFrom(position);
  }
  function moveElementTo(position) {
    console.log('ae', position)

    if (from || from === 0) {
      setRecords(
        arrayMove([...records]), from, position)
      ;
    }
  }

  return (
    <div className="App">
      <div>
        <button className="btn" onClick={saveRecords}>
          SAVE
        </button>
        <button className="btn" onClick={showStats}>
          STATS
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <RecordedDataList
          records={records}
          deleteRecord={deleteRecord}
          moveElementFrom={moveElementFrom}
          moveElementTo={moveElementTo}
        />
        <Stats stats={stats} />
      </div>
    </div>
  );
}

export default App;
