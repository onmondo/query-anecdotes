const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

export const createNew = async (anecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...anecdote, votes: 0 })
  })

  if (!response.ok) {
    throw new Error('Failed to create new anecdote')
  }

  return await response.json()
}

const getAnecdote = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdote')
  }

  return await response.json()
}

export const voteAnecdote = async (id) => {
  const anecdote = await getAnecdote(id)

  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ votes: anecdote.votes += 1 })
  })

  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }

  return await response.json()
}
