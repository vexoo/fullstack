import { useState } from 'react'
import personService from '../services/persons'
import { displayMessage } from './Notification'

const PersonForm = ({ persons, setPersons, setErrorMessage, setErrorColor }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if (newName.trim() === '') {
            displayMessage('Name can not be empty', true, setErrorMessage, setErrorColor)
            return
        }

        const currentPerson = persons.find(person =>
            person.name.toLowerCase() === newName.toLowerCase())

        if (currentPerson && currentPerson.number === newNumber) {
            displayMessage(`${newName} is already added to phonebook`, true, setErrorMessage, setErrorColor)
            setNewName('')
            setNewNumber('')
            return
        } else if (currentPerson) {
            if (window.confirm(
                `${currentPerson.name} is already added to phonebook, replace the old number with a new one?`
            )) {
                const updatedPerson = { ...currentPerson, number: newNumber }
                personService
                    .update(currentPerson.id, updatedPerson)
                    .then((updatedPerson) => {
                        setPersons(
                            persons.map(person =>
                                person.id === updatedPerson.id ? updatedPerson : person
                            )
                        )
                        displayMessage(`Changed the phone number of ${newName}`, false, setErrorMessage, setErrorColor)
                        setNewName('')
                        setNewNumber('')
                        return
                    })
                    .catch(error => {
                        displayMessage(`Information of ${currentPerson.name} has already been removed from server`, true, setErrorMessage, setErrorColor)
                        setPersons(persons.filter(person => person.id !== currentPerson.id))
                    })
            }
        } else {
            const personObject = createPersonObject(newName, newNumber)

            personService
                .create(personObject)
                .then((response) => {
                    setPersons(persons.concat(response))
                    displayMessage(`Added ${newName}`, false, setErrorMessage, setErrorColor)
                    setNewName('')
                    setNewNumber('')
                    return
                })
                .catch(error => {
                    displayMessage(`${error.response.data.error}`, true, setErrorMessage, setErrorColor)
                    console.log(error.response.data.error)
                })
        }
    }

    const createPersonObject = (name, number) => {
        return {
            name: name,
            number: number,
        }

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