import SortableTable from './components/SortableTable/SortableTable'

export default function App() {
  return (
    <div>
      <h1>SortableTable example</h1>
      <SortableTable
        data={[
          { id: '1', name: 'Mario', age: '35' },
          { id: '2', name: 'Luigi', age: '40' },
          { id: '3', name: 'Peach', age: '30' },
        ]}
        columns={['id', 'name', 'age']}
        onItemSelectChange={(id, selected) => {
          console.log(`Item ${id} selected: ${selected}`)
        }}
      />
    </div>
  )
}
