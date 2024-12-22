// import { IGalleryCreate } from 'src/interfaces';
import { APIRequest } from './api-request'

export class OrderService extends APIRequest {
  search(payload:any) {
    return this.get(this.buildUrl('/orders/search', payload))
  }

  findById(id:any) {
    return this.get(`/orders/${id}`)
  }

  update(id:any, data:any) {
    return this.put(`/orders/${id}/update`, data)
  }
}

export const orderService = new OrderService()
