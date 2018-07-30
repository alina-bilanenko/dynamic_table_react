import React from 'react'
import PropTypes from 'prop-types'

export const DynamicTable = ({ cellSize, table, mouseOver }) => {

  return (
    <table className="table" onMouseOver={mouseOver}>
      <tbody>
      {table.map((item) => (
        <tr key={item.id} className="row">
          {item.tableArr.map((el) => (
            <td key={el}
                style={{
                  width: cellSize,
                  height: cellSize
                }}
                className="cell"
            />
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
};

DynamicTable.propTypes = {
  cellSize: PropTypes.number,
  table: PropTypes.arrayOf(PropTypes.object),
  mouseOver: PropTypes.func
};