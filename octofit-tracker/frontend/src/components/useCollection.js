import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/api.js'

export function useCollection(apiBaseUrl, collectionKey) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadItems() {
      try {
        setIsLoading(true)
        setError('')
        const nextItems = await fetchCollection(apiBaseUrl, collectionKey)

        if (isMounted) {
          setItems(nextItems)
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load data')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadItems()

    return () => {
      isMounted = false
    }
  }, [apiBaseUrl, collectionKey])

  return { error, isLoading, items }
}
