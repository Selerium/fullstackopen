const Filter = ({searchFilter, setSearchFilter}) => {
    return (
        <div>
            filter shown with <input value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} />
        </div>
    )
}

export default Filter;