export function buildApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
}

export function buildApiEndpoint(collectionKey) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${collectionKey}/`
    : `http://localhost:8000/api/${collectionKey}/`
}

export function extractItems(payload, collectionKey) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[collectionKey])) {
    return payload[collectionKey]
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

export async function fetchCollection(endpoint, collectionKey) {
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return extractItems(payload, collectionKey)
}
