import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getPersons = async () => {
    return axios.get(baseUrl)
    .then((response) => response.data)
}

const addPerson = async (newName, newNumber) => {
    return axios.post(baseUrl, {name: newName, number: newNumber})
    .then((response) => response.data)
}

const updatePerson = async (id, newData) => {
    return axios.put(`${baseUrl}/${id}`, newData)
    .then((response) => response.data)
}

const deletePerson = async(id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
}

export default {getPersons, addPerson, updatePerson, deletePerson}