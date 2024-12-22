import { APIRequest } from './api-request'

export class ReportService extends APIRequest {
  search(data:any) {
    return this.get(this.buildUrl('/reports', data))
  }
}

export const reportService = new ReportService()
