const Filter = ({ searchName, setSearchName }) => {

    const handleSearchNameChange = (event) => {
        //console.log(event.target.value)
        setSearchName(event.target.value)
    }

    return (
        <div>
            find countries: <input value={searchName}
                onChange={handleSearchNameChange} />
        </div>
    )
}

export default Filter