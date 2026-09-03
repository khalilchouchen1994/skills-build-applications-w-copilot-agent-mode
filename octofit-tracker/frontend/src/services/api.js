export function buildApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
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

export async function fetchCollection(apiBaseUrl, collectionKey) {
  const response = await fetch(`${apiBaseUrl}/${collectionKey}/`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return extractItems(payload, collectionKey)
}
