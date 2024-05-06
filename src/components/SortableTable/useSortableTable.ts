import { useState } from 'react'

export type TableDataItem = {
  id: string
  [key: string]: string
}

type SortableTableState = {
  sortedData: TableDataItem[]
  sortKey: string
  sortDirection: string
}

type UseSortableTableReturnType = SortableTableState & {
  sortByKey: (key: string) => void
}

export default function useSortableTable(
  data: TableDataItem[],
  defaultSortKey: string
): UseSortableTableReturnType {
  const [state, setState] = useState<SortableTableState>({
    sortedData: data,
    sortKey: defaultSortKey,
    sortDirection: 'asc',
  })

  const sortByKey = (key: string) => {
    const direction =
      key === state.sortKey && state.sortDirection === 'asc' ? 'desc' : 'asc'

    const sorted = [...state.sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })

    setState({
      sortedData: sorted,
      sortKey: key,
      sortDirection: direction,
    })
  }

  return {
    ...state,
    sortByKey,
  }
}
