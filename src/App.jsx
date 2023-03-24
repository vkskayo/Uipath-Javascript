import { useState, useEffect } from "react";
import "./App.css";
import { UiPathRobot } from "@uipath/robot";
import OutputPanel from "./components/OutputPanel";

function App() {
  const [processList, setProcessList] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [resultsState, setResultsState] = useState({});

  const getProcesses = async () => {
    const processes = await UiPathRobot.getProcesses();
    setProcessList(processes);
    processes.forEach((process, idx) => {
      statusMap[idx] = "RUN";
    });
  };

  async function runProcess(index) {
    const sample = await processList[index];
    const job = sample.start();
    job.onStatus(async (message) => {
      console.log(`${sample.name}: ${message}`);
      if (message == "Aguardando a execução para iniciar...") {
        statusMap[index] = "RUNNING";
        setStatusMap({ ...statusMap, index: "RUNNING" });
      } else if (message == "Instalando pacote...") {
        statusMap[index] = "RUNNING";
        setStatusMap({ ...statusMap, index: "RUNNING" });
      }
    });

    const results = await job;
    setResultsState(results);

    if (results) {
      statusMap[index] = "RUN";
      setStatusMap({ ...statusMap, index: "RUN" });
    }
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    getProcesses();
  }, []);

  return (
    <>
      <h2 className="text-center my-4">Your processes</h2>
      <div className="d-flex flex-column mx-auto col-md-5 bg-light">
        {processList.map((process, idx) => {
          return (
            <div
              className="process-container border p-2 my-0 d-flex justify-content-center"
              id={idx}
            >
              <div className="d-flex justify-content-between w-100 px-4">
                <h4 className="text-center ">{process.name}</h4>
                {statusMap[idx] == "RUN" ? (
                  <button onClick={() => runProcess(idx)}>
                    {statusMap[idx]}
                  </button>
                ) : (
                  <button>{statusMap[idx]}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {!isEmpty(resultsState) ? <OutputPanel output={resultsState} /> : null}
    </>
  );
}

export default App;
