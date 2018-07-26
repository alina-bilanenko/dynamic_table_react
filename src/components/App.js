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
        currentRowInd: 0,
        currentColumnInd: 0
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

    this.setState(({ table: prevTable }) => {
      const tableArr = [...prevTable, Array(prevTable[0].length).fill(null)];
      return {table: [...tableArr]}
    });
  };

  buttonAddColumn = () => {

    this.setState(({ table: prevTable }) => {
      const tableArr = prevTable.map((item) => {
        return [...item, null]
      });
      return {table: [...tableArr]}
    });
  };

  buttonRemoveRow = () => {

    this.setState((prevState) => {
      const {
        table: prevTable,
        index: {
          currentRowInd: prevCurrentRowInd,
          currentColumnInd: prevCurrentColumnInd
        }} = prevState;

      if (prevTable.length <= 1) return prevState;

      const tableArr = prevTable.filter((item, i) => {
        return i !== prevCurrentRowInd;
      });

      return {
        table: [...tableArr],
        visibility: {
          rowShow: (tableArr.length > 1),
          columnShow: false
        },
        index: {
          currentRowInd:
            (tableArr.length === prevCurrentRowInd)
              ? prevCurrentRowInd - 1
              : prevCurrentRowInd,
          currentColumnInd: prevCurrentColumnInd
        }
      }
    })
  };

  buttonRemoveColumn = () => {

    this.setState((prevState) => {

      const {
        table: prevTable,
        index: {
          currentRowInd: prevCurrentRowInd,
          currentColumnInd: prevCurrentColumnInd
        }} = prevState;

      if(prevTable[0].length <= 1) return prevState;

      const tableArr = prevTable.map((item) => {
        return item.filter((el, j) => {
          return j !== prevCurrentColumnInd;
        })
      });

      return {
        table: [...tableArr],
        visibility: {
          rowShow: false,
          columnShow: (tableArr[0].length > 1)
        },
        index: {
          currentRowInd: prevCurrentRowInd,
          currentColumnInd:
            (tableArr[0].length === prevCurrentColumnInd)
              ? prevCurrentColumnInd - 1
              : prevCurrentColumnInd
        }
      }
    })
  };

  mouseOver = (e) => {
    const event = e.target;
    const newRowIndex = event.parentElement.rowIndex;
    const newColumnIndex = event.cellIndex;

    if(newRowIndex == null || newColumnIndex == null) return;

    this.setState(({
                     index: {
                       currentRowInd: prevCurrentRowInd,
                       currentColumnInd: prevCurrentColumnInd
                     },
                     table: prevTable
                   }) => {
      return {
        index: {
          currentRowInd:
            (newRowIndex === prevCurrentRowInd)
              ? prevCurrentRowInd
              : newRowIndex,
          currentColumnInd:
            (newColumnIndex === prevCurrentColumnInd)
              ? prevCurrentColumnInd
              : newColumnIndex
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
