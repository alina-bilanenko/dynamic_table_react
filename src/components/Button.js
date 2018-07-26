import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

export const Button = ({
                         index: {
                           currentRowInd,
                           currentColumnInd
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

  const rowPosition = (currentRowInd + 1) * (cellSize + 4);
  const columnPosition = (currentColumnInd + 1) * (cellSize + 4);
  return (
    <Fragment>
      <button className='add-row'
              style={{
                width: cellSize,
                height: cellSize,
                left: cellSize
              }}
              onClick={buttonAddRow}
      >
        +
      </button>
      <button className='add-column'
              style={{
                width: cellSize,
                height: cellSize,
                top: cellSize
              }}
              onClick={buttonAddColumn}
      >
        +
      </button>
      <button className={[rowShow? 'visibility': '', 'remove-row'].join(' ')}
              style={{
                width: cellSize,
                height: cellSize,
                top: rowPosition
              }}
              onClick={buttonRemoveRow}
      >
        -
      </button>
      <button className={[columnShow? 'visibility': '', 'remove-column'].join(' ')}
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
  currentRowInd: PropTypes.number,
  currentColumnInd: PropTypes.number,
  rowShow: PropTypes.bool,
  columnShow: PropTypes.bool,
  buttonAddRow: PropTypes.func,
  buttonAddColumn: PropTypes.func,
  buttonRemoveRow: PropTypes.func,
  buttonRemoveColumn: PropTypes.func,
  cellSize: PropTypes.number
};