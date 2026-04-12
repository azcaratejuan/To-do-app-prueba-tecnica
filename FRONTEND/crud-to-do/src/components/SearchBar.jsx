export default function SearchBar({ searchType, setSearchType, search, setSearch }) {
  return (
    <div className='flex gap-2 mt-4 mb-4 w-full max-w-md'>
      <select
        value={searchType}
        onChange={(e) => { setSearchType(e.target.value); setSearch('') }}
        className='border rounded px-3 py-2 text-gray-700'
      >
        <option value='title'>Nombre</option>
        <option value='description'>Descripción</option>
        <option value='state'>Estado</option>
        <option value='user'>Usuario</option>
      </select>
      {searchType === 'state' ? (
        <select
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border rounded px-3 py-2 text-gray-700 w-full'
        >
          <option value=''>Todos</option>
          <option value='pending'>Pendiente</option>
          <option value='completed'>Completada</option>
          <option value='in_progress'>En Progreso</option>
        </select>
      ) : searchType === 'user' ? (
        <input
          type='text'
          placeholder='Buscar por nombre de usuario...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border rounded px-3 py-2 w-full text-gray-700'
        />
      ) : (
        <input
          type='text'
          placeholder={`Buscar por ${searchType === 'title' ? 'nombre' : 'descripción'}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border rounded px-3 py-2 w-full text-gray.700'
        />
      )}
    </div>
  )
}