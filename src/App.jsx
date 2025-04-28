import { useState } from "react";
import "./App.css";
import ExcelSheet from "./components/ExcelShett";

function App() {
  const [gridDimensions, setGridDimensions] = useState({
    row: 5,
    col: 5,
  });

  const [inputDimensions, setInputDimensions] = useState({
    row: gridDimensions.row,
    col: gridDimensions.col,
  });

  const generateExcel = () => {
    if (
      isNaN(inputDimensions.row) ||
      isNaN(inputDimensions.col) ||
      inputDimensions.row <= 0 ||
      inputDimensions.col <= 0
    ) {
      alert("Please enter valid positive numbers");
      return;
    }
    setGridDimensions({
      row: Number(inputDimensions?.row),
      col: Number(inputDimensions?.col),
    });
  };
  return (
    <div>
      Enter row :
      <input
        type="number"
        onChange={(e) =>
          setInputDimensions((dimensions) => ({
            ...dimensions,
            row: e.target.value,
          }))
        }
        value={inputDimensions?.row}
      />
      Enter Column :
      <input
        type="number"
        onChange={(e) =>
          setInputDimensions((dimensions) => ({
            ...dimensions,
            col: e.target.value,
          }))
        }
        value={inputDimensions?.col}
      />
      <button onClick={generateExcel}>Generate</button>
      <ExcelSheet rows={gridDimensions.row} cols={gridDimensions.col} />;
    </div>
  );
}

export default App;
