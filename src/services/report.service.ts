import { APIRequest } from './api-request'

export class ReportService extends APIRequest {
  search(data: any) {
    return this.get(this.buildUrl('/reports', data))
  }

  delete(id: string) {
    return this.del(`/report/${id}`)
  }
}

export const reportService = new ReportService()
