import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  })
}

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => api.getProducts(category),
  })
}