import React from 'react'
import PropTypes from 'prop-types'

export const DynamicTable = ({ cellSize, table, mouseOver }) => {

  return (
    <table className="table" onMouseOver={mouseOver}>
      <tbody>
      {table.map((item, key) =>
        <tr key={key} className="row">
          {item.map((el, i) =>
            <td key={i}
                style={{
                  width: cellSize,
                  height: cellSize
                }}
                className="cell"
            />
          )}
        </tr>
      )}
      </tbody>
    </table>
  )
};

DynamicTable.propTypes = {
  cellSize: PropTypes.number,
  table: PropTypes.arrayOf(PropTypes.array),
  mouseOver: PropTypes.func
};