const baseURL = 'https://dminer-api.herokuapp.com/api/full-calendar'

export const fetchEvents = async () => {
  const response = await fetch(`${baseURL}/all`)
  const json = await response.json()
  return json.data
}

export const storeEvent = async (event) => {
  const response = await fetch(`${baseURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })

  const json = await response.json()
  return json
}

export const mutateEvent = async (event, id) => {
  return await fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
}

export const destroyEvent = async (id) => {
  return await fetch(`${baseURL}/delete/${id}`, {
    method: 'DELETE'
  })
}
