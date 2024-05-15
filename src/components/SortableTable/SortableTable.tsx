import useSortableTable, { TableDataItem } from './useSortableTable'
import styles from './SortableTable.module.css'

type TableComponentProps = {
  data: TableDataItem[]
  columns: string[]
  onItemSelectChange?: (itemId: string, isChecked: boolean) => void
}

export default function SortableTable({
  data,
  columns,
  onItemSelectChange,
}: TableComponentProps) {
  const { sortedData, sortKey, sortDirection, sortByKey, toggleSelect } =
    useSortableTable(data, columns[0])

  // Event handlers should be kept in the component's scope
  const handleToggleSelect = (itemId: string, isChecked: boolean) => {
    toggleSelect(itemId)
    if (typeof onItemSelectChange === 'function') {
      onItemSelectChange(itemId, isChecked)
    }
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
                onChange={(e) => handleToggleSelect(item.id, e.target.checked)}
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
