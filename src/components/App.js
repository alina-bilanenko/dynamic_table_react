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
      currentRowId: 0,
      currentColumnId: 0,
      rowVisibility: false,
      columnVisibility: false
    }
  }

  buildTableArray () {
    let newTable = [];

    for(let i = 0; i < this.initialHeight; i++) {
      let tdArray = [];
      for (let j = 0; j < this.initialWidth; j++) {
        tdArray.push(j);
      }
      newTable.push({ id: i, tableArr: [...tdArray] });
    }
    return [...newTable];
  }

  buttonAddRow = () => {
    const { table } = this.state;

    const newId = table.reduce((prev, cur) =>  {
      return (prev.id > cur.id)? prev: cur;
    });

    const newTable = [...table, { id: newId.id + 1, tableArr: table[0].tableArr.concat() }];

    this.setState({ table: [...newTable] });
  };

  buttonAddColumn = () => {
    const { table } = this.state;
    let newId = 0;

    const newTable = table.map((item) => {
      const itemId = item.tableArr.reduce((prev, cur) =>  {
        return (prev.id > cur.id)? prev: cur;
      });

      newId = (itemId > newId)? itemId: newId;

      return {...item, tableArr: [...item.tableArr, newId + 1]}
    });

    this.setState({ table: [...newTable] });
  };

  buttonRemoveRow = () => {
    const { table, currentRowId } = this.state;
    const prevRowId = this.getIndexRow();

    if (table.length <= 1) return;

    const newTable = table.filter((item) => {
      return item.id !== currentRowId;
    });

    const newCurrentRowId =
      (newTable.length === prevRowId)
        ? newTable[prevRowId - 1].id
        : newTable[prevRowId].id;

    this.setState({
      table: [...newTable],
      rowVisibility: (newTable.length > 1),
      currentRowId: newCurrentRowId
    });
  };

  buttonRemoveColumn = () => {
    const { table, currentColumnId } = this.state;
    const prevColumnId = this.getIndexColumn();

    if(table[0].tableArr.length <= 1) return;

    const newTable = table.map((item) => {
      const newCell = item.tableArr.filter((el) => {
        return el !== currentColumnId;
      });
      return {...item, tableArr: [...newCell]}
    });

    const newCurrentColumnId =
      (newTable[0].tableArr.length === prevColumnId)
        ? newTable[0].tableArr[prevColumnId - 1]
        : newTable[0].tableArr[prevColumnId];

    this.setState({
      table: [...newTable],
      columnVisibility: (newTable[0].tableArr.length > 1),
      currentColumnId: newCurrentColumnId
    });
  };

  mouseOver = (e) => {
    const event = e.target;
    const newRowId = event.parentElement.rowIndex;
    const newColumnId = event.cellIndex;
    const { table } = this.state;

    if(newRowId == null || newColumnId == null) return;

    const rowId = table[newRowId].id;
    const cellId = table[newRowId].tableArr[newColumnId];

    this.setState({
      currentRowId: rowId,
      currentColumnId: cellId,
      rowVisibility: (table.length > 1),
      columnVisibility: (table[0].tableArr.length > 1)
    });
  };

  getIndexRow = () => {
    const { table, currentRowId } = this.state;
    return (table.findIndex(item => item.id === currentRowId))
  };

  getIndexColumn = () => {
    const { table, currentColumnId } = this.state;
    return (table[0].tableArr.indexOf(currentColumnId))
  };

  render() {
    const { table, rowVisibility, columnVisibility } = this.state;
    const rowPosition = (this.getIndexRow() + 1) * (this.cellSize + 4);
    const columnPosition = (this.getIndexColumn() + 1) * (this.cellSize + 4);

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
  initialWidth: 4,
  initialHeight: 4,
  cellSize: 50
};

export default App;
