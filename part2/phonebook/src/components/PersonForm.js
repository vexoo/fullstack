import { useState } from 'react';

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if (newName.trim() === '') {
            alert('Name can not be empty')
            return
        }

        const duplicateCheck = persons.some(person => person.name === newName)
        if (duplicateCheck) {
            alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNumber('')
            return
        }

        const personObject = {
            name: newName,
            number: newNumber,
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        //console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        //console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number: <input value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm