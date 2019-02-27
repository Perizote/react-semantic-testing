let lastQuery

const setAsLastQuery = query => lastQuery = query

const getLastQuery = () => lastQuery()

export { setAsLastQuery, getLastQuery as lastQuery }