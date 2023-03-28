const Persons = ({ personsList }) => {

    return (
        <div>
            {personsList.map(person =>
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
            )}
        </div>
    )
}

export default Persons
