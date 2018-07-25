import React, { Component } from 'react'
import { DynamicTable } from "./DynamicTable"
import { Button } from "./Button"

class App extends Component {
  constructor () {
    super();
    this.initialWidth = 4;
    this.initialHeight = 4;
    this.cellSize = 50;
    this.state = {
      table: [],
      index: {
        rowInd: 0,
        columnInd: 0
      },
      visibility: {
        rowShow: false,
        columnShow: false
      }
    }
  }

  componentDidMount () {
    let tableArr = [];

    for(let i = 0; i < this.initialHeight; i++) {
      tableArr.push(Array(this.initialWidth).fill(null));
    }

    this.setState({table: [...tableArr]})
  }

  buttonAddRow = () => {
    let tableArr = [...this.state.table, Array(this.state.table[0].length).fill(null)];

    this.setState({table: [...tableArr]});
  };

  buttonAddColumn = () => {
    let tableArr = this.state.table.map((item) => {
      return [...item, null]
    });

    this.setState({table: [...tableArr]});
  };

  buttonRemoveRow = () => {
    let { table, index } = this.state;

    if (table.length <= 1) return;

    let tableArr = table.filter((item, i) => {
      return i !== index.rowInd;
    });

    this.setState(({ index: { rowInd: prevRowInd, columnInd: prevColumnInd }}) => {
      return {
        table: [...tableArr],
        visibility: {
          rowShow: (tableArr.length > 1),
          columnShow: false
        },
        index: {
          rowInd: (tableArr.length === prevRowInd) ? prevRowInd - 1 : prevRowInd,
          columnInd: prevColumnInd
        }
      }
    })
  };

  buttonRemoveColumn = () => {
    let { table, index } = this.state;

    if(table[0].length <= 1) return;

    let tableMass = table.map((item) => {
      return item.filter((el, j) => {
        return j !== index.columnInd;
      })
    });

    this.setState(({ index: { rowInd: prevRowInd, columnInd: prevColumnInd }}) => {
      return {
        table: [...tableMass],
        visibility: {
          rowShow: false,
          columnShow: (tableMass[0].length > 1)
        },
        index: {
          rowInd: prevRowInd,
          columnInd: (tableMass[0].length === prevColumnInd) ? prevColumnInd - 1 : prevColumnInd
        }
      }
    })
  };

  mouseOver = (e) => {
    let event = e.target;
    let newRowIndex = event.parentElement.rowIndex;
    let newColumnIndex = event.cellIndex;

    if(newRowIndex == null || newColumnIndex == null) return;

    this.setState(({ index: { rowInd: prevRowInd, column: prevColumnInd }, table: prevTable }) => {
      return {
        index: {
          rowInd: (newRowIndex === prevRowInd)? prevRowInd : newRowIndex,
          columnInd: (newColumnIndex === prevColumnInd)? prevColumnInd : newColumnIndex
        },
        visibility: {
          rowShow: (prevTable.length > 1),
          columnShow: (prevTable[0].length > 1)
        }
      }
    });
  };

  render() {
    const { table, index, visibility } = this.state;

    return (
      <div className='container'  style={{padding: this.cellSize + 4}}>
        <DynamicTable
          cellSize={this.cellSize}
          table={table}
          mouseOver={this.mouseOver}
        />
        <Button
          index={index}
          visibility={visibility}
          cellSize={this.cellSize}
          buttonAddRow={this.buttonAddRow}
          buttonAddColumn={this.buttonAddColumn}
          buttonRemoveRow={this.buttonRemoveRow}
          buttonRemoveColumn={this.buttonRemoveColumn}
        />
      </div>
    );
  }
}

export default App;
