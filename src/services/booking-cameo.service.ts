import { APIRequest } from './api-request';

export class BookingCameoService extends APIRequest {
  search(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/booking/admin/search', query));
  }

  findById(id: string, headers?: any) {
    return this.get(`/booking/admin/${id}/view`, headers);
  }
}

export const bookingCameoService = new BookingCameoService();
