import request from 'superagent'
import { ProductList } from '@/models/Product'


const coreURL = 'https://api.escuelajs.co/api/v1/products'

export async function getProducts(): Promise<ProductList[]> {
  const response = await request
  .get(coreURL)

  return response.body
}


export async function getSingleProduct(id: number) {
  const response = await request
  .get(`${coreURL}/:id`)

  return response.body
}