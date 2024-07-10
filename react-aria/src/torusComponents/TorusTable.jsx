import React, { useEffect, useState } from "react";
import {
  Button,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";
import {
  Checkbox,
  Collection,
  useTableOptions,
  lis,
} from "react-aria-components";
function TorusColumn(props) {
  return (
    <Column {...props}>
      {({ allowsSorting, sortDirection }) => (
        <>
          {props.children}
          {allowsSorting && (
            <span aria-hidden="true" className="sort-indicator">
              {sortDirection === "ascending" ? "▲" : "▼"}
            </span>
          )}
        </>
      )}
    </Column>
  );
}

function TorusTableHeader({ columns, children }) {
  let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();

  useEffect(() => {}, [columns, children]);

  return (
    <TableHeader>
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}
      {selectionBehavior === "toggle" && (
        <Column>
          {selectionMode === "multiple" && (
            <TorusCheckbox slot="selection" className="cursor-pointer" />
          )}
        </Column>
      )}
      {/* {children} */}
      <Collection items={columns}>{children}</Collection>
    </TableHeader>
  );
}

function TorusRow({ id, columns, children, ...otherProps }) {
  let { selectionBehavior, allowsDragging } = useTableOptions();
  console.log(columns, "rows");
  return (
    <Row id={id} {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell slot="selection">
          <TorusCheckbox slot="selection" className="cursor-pointer" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
      {/* {children} */}
      {/* <RenderTableChildren key={id} columns={columns} data={children} /> */}
    </Row>
  );
}

function TorusCheckbox({ children, ...props }) {
  return (
    <Checkbox {...props}>
      {({ isIndeterminate }) => (
        <>
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}

export function TorusTable({
  primaryColumn,
  tableData,
  onChange,
  selectionMode,
  selectionBehavior,
}) {
  const [columns, setColumns] = useState([]);
  const [sortDescriptor, setSortDescriptor] = useState(null);
  const [page, setPage] = useState(1);
  const items = React.useMemo(() => {
    try {
      const rowsPerPage = 5;
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return tableData.slice(start, end);
    } catch (e) {
      console.error(e);
    }
  }, [page, tableData]);

  const sortedItems = React.useMemo(() => {
    try {
      if (!sortDescriptor) return items;
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor?.column];
        const second = b[sortDescriptor?.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.error(e);
    }
  }, [sortDescriptor, items]);
  const sort = (sortDescriptor) => {
    setSortDescriptor(sortDescriptor);
  };
  const getColumns = (tableData) => {
    let newColumns = new Set([]);
    tableData.forEach((item) => {
      if (typeof item == "object")
        Object.keys(item).forEach((key) => newColumns.add(key));
    });

    if (columns && columns.length > 0) return;
    setColumns(
      Array.from(newColumns).map((key) => ({
        id: key,
        name: key,
        key: key,
        isRowHeader: key == primaryColumn ? true : false,
      }))
    );
  };
  let [selectedKeys, setSelectedKeys] = React.useState(new Set());
  useEffect(() => {
    if (Array.isArray(tableData)) {
      getColumns(tableData);
      setSortDescriptor({
        column: primaryColumn,
        direction: "ascending",
      });
    } else {
      console.error("tableData is not an array");
    }
  }, [tableData, primaryColumn]);

  return (
    <>
      {columns.length > 0 && sortDescriptor && (
        <Table
          selectionMode="multiple"
          selectionBehavior="toggle"
          selectedKeys={selectedKeys}
          onSortChange={setSortDescriptor}
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          className={"w-[50%] h-[50%]"}
        >
          <TorusTableHeader columns={columns}>
            {(column) => (
              <TorusColumn allowsSorting isRowHeader={column.isRowHeader}>
                {column.name}
              </TorusColumn>
            )}
          </TorusTableHeader>
          <TableBody key={page} items={sortedItems} renderEmptyState={true}>
            {(item) => (
              <TorusRow id={item?.[primaryColumn]} columns={columns}>
                {(column) => <Cell children={item?.[column.id]} />}
              </TorusRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
