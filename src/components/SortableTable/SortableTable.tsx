import useSortableTable, { TableDataItem } from './useSortableTable'
import styles from './SortableTable.module.css'

interface TableComponentProps {
  data: TableDataItem[]
  columns: string[]
}

export default function SortableTable({ data, columns }: TableComponentProps) {
  const { sortedData, sortKey, sortDirection, sortByKey } = useSortableTable(
    data,
    columns[0]
  )

  return (
    <table className={styles.sortableTable}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} onClick={() => sortByKey(column)}>
              {column}
              {sortKey === column && (
                <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
