import React from 'react';
import { useTable, useSticky, useBlockLayout } from 'react-table';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    flatColumns,
  } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSticky
  );

  const { startRow, endRow } = state;

  return (
    <div {...getTableProps()} style={{ overflowX: 'auto' }}>
      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <div
                {...column.getHeaderProps()}
                style={{
                  position: 'sticky',
                  left: column.sticky === 'left' ? 0 : undefined,
                  zIndex: column.sticky === 'left' ? 1 : undefined,
                }}
              >
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()}>
        {rows.slice(startRow, endRow).map(row => {
          prepareRow(row);
          return (
            <div {...row.getRowProps()}>
              {row.cells.map(cell => (
                <div {...cell.getCellProps()}>{cell.render('Cell')}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
