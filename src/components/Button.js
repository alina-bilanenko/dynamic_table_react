import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Button = ({
                         index: {
                           rowInd,
                           columnInd
                         },
                         visibility: {
                           rowShow,
                           columnShow
                         },
                         cellSize,
                         buttonAddRow,
                         buttonAddColumn,
                         buttonRemoveRow,
                         buttonRemoveColumn
                       }) => {

  const rowPosition = (rowInd + 1) * (cellSize + 4);
  const columnPosition = (columnInd + 1) * (cellSize + 4);

  return (
    <Fragment>
      <button className='addRow'
              style={{
                width: cellSize,
                height: cellSize,
                left: cellSize
              }}
              onClick={buttonAddRow}
      >
        +
      </button>
      <button className='addColumn'
              style={{
                width: cellSize,
                height: cellSize,
                top: cellSize
              }}
              onClick={buttonAddColumn}
      >
        +
      </button>
      <button className={[rowShow? 'visibility': '', 'removeRow'].join(' ')}
              style={{
                width: cellSize,
                height: cellSize,
                top: rowPosition
              }}
              onClick={buttonRemoveRow}
      >
        -
      </button>
      <button className={[columnShow? 'visibility': '', 'removeColumn'].join(' ')}
              style={{
                width: cellSize,
                height: cellSize,
                left: columnPosition
              }}
              onClick={buttonRemoveColumn}
      >
        -
      </button>
    </Fragment>
  )
};

Button.propTypes = {
  rowInd: PropTypes.number,
  columnInd: PropTypes.number,
  rowShow: PropTypes.bool,
  columnShow: PropTypes.bool,
  buttonAddRow: PropTypes.func,
  buttonAddColumn: PropTypes.func,
  buttonRemoveRow: PropTypes.func,
  buttonRemoveColumn: PropTypes.func,
  cellSize: PropTypes.number
};