import { useCallback, useEffect, useRef, useState } from "react";

const ExcelSheet = ({ rows = 4, cols = 4 }) => {
  const generateCells = useCallback(() => {
    return Array(rows)
      .fill(0)
      .map(() =>
        Array(cols)
          .fill(0)
          .map(() => ({ value: "", color: "white" }))
      );
  }, [rows, cols]);
  const [cells, setCells] = useState(generateCells());
  console.log(cells);

  const [selectedCell, setSelectedCell] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef(null);

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
    setIsEditing(false);
  };
  const handleCellDoubleClick = (row, col) => {
    setSelectedCell({ row, col });
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  };

  useEffect(() => {
    setCells(generateCells());
  }, [rows, cols]);

  const handleCellChange = (e) => {
    if (!selectedCell) return;
    const newCells = [...cells];
    newCells[selectedCell.row][selectedCell.col].value = e.target.value;

    setCells(newCells);
  };

  const handleCellBlur = () => {
    setIsEditing(false);
  };

  const handleColorChange = (color) => {
    if (!selectedCell) return;
    const newCells = [...cells];
    newCells[selectedCell.row][selectedCell.col].color = color;
    setCells(newCells);
  };

  const colors = [
    "white",
    "#f8d7da",
    "#d1e7dd",
    "#cfe2ff",
    "#fff3cd",
    "#e2e3e5",
    "#d3d3d3",
    "#ffcccc",
    "#ccffcc",
    "#ccccff",
  ];
  return (
    <div className="excel-container">
      <div className="toolbar">
        {selectedCell && (
          <div className="cell-label">
            Cell : {String.fromCharCode(65 + selectedCell.col)}
            {selectedCell.row + 1}
          </div>
        )}

        <div>
          <div className="color-grid">
            {colors.map((color) => (
              <div
                key={color}
                className="color-box"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>
      </div>

      <table className="excel-table">
        <tbody>
          {cells?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row?.map((col, colIndex) => {
                const isSelected =
                  selectedCell?.col === colIndex &&
                  selectedCell?.row === rowIndex;

                return (
                  <td
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`excel-cell ${
                      isSelected ? "selected-cell" : ""
                    }`}
                    style={{ backgroundColor: col.color }}
                    key={`${rowIndex}-${colIndex}`}
                    onDoubleClick={() =>
                      handleCellDoubleClick(rowIndex, colIndex)
                    }
                  >
                    {isEditing && isSelected ? (
                      <input
                        className="cell-input"
                        type="text"
                        value={col.value}
                        ref={inputRef}
                        onChange={handleCellChange}
                        onBlur={handleCellBlur}
                      />
                    ) : (
                      <div className="cell-text">{col.value}</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelSheet;
