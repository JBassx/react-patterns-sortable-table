import { useReducer } from 'react'

export type TableDataItem = {
  id: string
  selected?: boolean
  [key: string]: string | boolean | null | undefined
}

type SortDirection = 'asc' | 'desc'

type SortableTableState = {
  sortedData: TableDataItem[]
  sortKey: string
  sortDirection: SortDirection
}

enum ActionType {
  SORT = 'SORT',
  TOGGLE_SELECT = 'TOGGLE_SELECT',
}

type SortPayload = {
  key: string
  direction: SortDirection
}

type ToggleSelectPayload = {
  id: string
}

type Action =
  | { type: ActionType.SORT; payload: SortPayload }
  | { type: ActionType.TOGGLE_SELECT; payload: ToggleSelectPayload }

const sortData = (state: SortableTableState, payload: SortPayload) => {
  const { key, direction } = payload
  const sorted = [...state.sortedData].sort((a, b) => {
    const valueA = a[key] || ''
    const valueB = b[key] || ''
    if (valueA < valueB) return direction === 'asc' ? -1 : 1
    if (valueA > valueB) return direction === 'asc' ? 1 : -1
    return 0
  })

  return {
    ...state,
    sortedData: sorted,
    sortKey: key,
    sortDirection: direction,
  }
}

const toggleSelect = (
  state: SortableTableState,
  payload: ToggleSelectPayload
) => {
  const { id } = payload
  const updatedData = state.sortedData.map((item) =>
    item.id === id ? { ...item, selected: !item.selected } : item
  )

  return {
    ...state,
    sortedData: updatedData,
  }
}

const sortReducer = (state: SortableTableState, action: Action) => {
  switch (action.type) {
    case ActionType.SORT:
      return sortData(state, action.payload)
    case ActionType.TOGGLE_SELECT:
      return toggleSelect(state, action.payload)
    default:
      return state
  }
}

export default function useSortableTable(
  data: TableDataItem[],
  defaultSortKey: string
) {
  const initialState: SortableTableState = {
    sortedData: data,
    sortKey: defaultSortKey,
    sortDirection: 'asc',
  }

  const [state, dispatch] = useReducer(sortReducer, initialState)

  const sortByKey = (key: string, direction: SortDirection = 'asc') => {
    dispatch({ type: ActionType.SORT, payload: { key, direction } })
  }

  const toggleSelect = (id: string) => {
    dispatch({ type: ActionType.TOGGLE_SELECT, payload: { id } })
  }

  return {
    ...state,
    sortByKey,
    toggleSelect,
  }
}
