import useSortableTable, { TableDataItem } from './useSortableTable'
import styles from './SortableTable.module.css'

interface TableComponentProps {
  data: TableDataItem[]
  columns: string[]
}

export default function SortableTable({ data, columns }: TableComponentProps) {
  const { sortedData, sortKey, sortDirection, sortByKey, toggleSelect } =
    useSortableTable(data, columns[0])

  const handleToggleSelect = (id: string) => {
    toggleSelect(id)
  }

  return (
    <table className={styles.sortableTable}>
      <thead>
        <tr>
          <th>Select</th>

          {columns.map((column) => (
            <th
              key={column}
              onClick={() =>
                sortByKey(column, sortDirection === 'asc' ? 'desc' : 'asc')
              }
            >
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
          <tr key={item.id} className={item.selected ? styles.selected : ''}>
            <td>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleToggleSelect(item.id)}
              />
            </td>
            {columns.map((column) => (
              <td key={column}>{item[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
