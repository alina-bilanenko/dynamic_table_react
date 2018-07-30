import React, { Component } from 'react'
import { DynamicTable } from "./DynamicTable"
import { Button } from "./Button"

class App extends Component {
  constructor (props) {
    super(props);
    this.initialWidth = props.initialWidth;
    this.initialHeight = props.initialHeight;
    this.cellSize = props.cellSize;
    this.state = {
      table: this.buildTableArray(),
      currentRowInd: 0,
      currentColumnInd: 0,
      rowVisibility: false,
      columnVisibility: false
    }
  }

  buildTableArray () {
    let tableArr = [];

    for(let i = 0; i < this.initialHeight; i++) {
      tableArr.push(Array(this.initialWidth).fill(null));
    }

    return [...tableArr];
  }

  buttonAddRow = () => {
    const { table } = this.state;
    const tableArr = [...table, Array(table[0].length).fill(null)];

    this.setState({ table: [...tableArr] });
  };

  buttonAddColumn = () => {
    const { table } = this.state;
    const tableArr = table.map((item) => {
      return [...item, null]
    });

    this.setState({ table: [...tableArr] });
  };

  buttonRemoveRow = () => {
    const { table, currentRowInd } = this.state;

    if (table.length <= 1) return;

    const tableArr = table.filter((item, i) => {
      return i !== currentRowInd;
    });

    const newCurrentRowInd =
      (tableArr.length === currentRowInd)
        ? currentRowInd - 1
        : currentRowInd;

    this.setState({
      table: [...tableArr],
      rowVisibility: (tableArr.length > 1),
      currentRowInd: newCurrentRowInd
    });
  };

  buttonRemoveColumn = () => {
    const { table, currentColumnInd } = this.state;

    if(table[0].length <= 1) return;

    const tableArr = table.map((item) => {
      return item.filter((el, j) => {
        return j !== currentColumnInd;
      })
    });

    const newCurrentColumnInd =
      (tableArr[0].length === currentColumnInd)
        ? currentColumnInd - 1
        : currentColumnInd;

    this.setState({
      table: [...tableArr],
      columnVisibility: (tableArr[0].length > 1),
      currentColumnInd: newCurrentColumnInd
    });
  };

  mouseOver = (e) => {
    const event = e.target;
    const newRowIndex = event.parentElement.rowIndex;
    const newColumnIndex = event.cellIndex;
    const { table } = this.state;

    if(newRowIndex == null || newColumnIndex == null) return;

    this.setState({
      currentRowInd: newRowIndex,
      currentColumnInd: newColumnIndex,
      rowVisibility: (table.length > 1),
      columnVisibility: (table[0].length > 1)
    });
  };

  render() {
    const { table, currentRowInd, currentColumnInd, rowVisibility, columnVisibility } = this.state;
    const rowPosition = (currentRowInd + 1) * (this.cellSize + 4);
    const columnPosition = (currentColumnInd + 1) * (this.cellSize + 4);

    return (
      <div className='container'  style={{padding: this.cellSize + 4}}>
        <DynamicTable
          cellSize={this.cellSize}
          table={table}
          mouseOver={this.mouseOver}
        />
        <Button
          buttonClass={'add-row'}
          cellSize={this.cellSize}
          buttonClick={this.buttonAddRow}
        />
        <Button
          buttonClass={'add-column'}
          cellSize={this.cellSize}
          propertyStyle={'top'}
          buttonClick={this.buttonAddColumn}
        />
        <Button
          buttonClass={[rowVisibility? 'visibility': '', 'remove-row'].join(' ')}
          cellSize={this.cellSize}
          propertyStyle={'top'}
          valueStyle={rowPosition}
          text={'-'}
          buttonClick={this.buttonRemoveRow}
        />
        <Button
          buttonClass={[columnVisibility? 'visibility': '', 'remove-column'].join(' ')}
          cellSize={this.cellSize}
          valueStyle={columnPosition}
          text={'-'}
          buttonClick={this.buttonRemoveColumn}
        />
      </div>
    );
  }
}

App.defaultProps = {
  initialWidth: 5,
  initialHeight: 5,
  cellSize: 60
};

export default App;
