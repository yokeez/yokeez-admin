import Page from '@components/common/layout/page'
import ReportTableList from '@components/report/report-table-list'
import { reportService } from '@services/report.service'
import { message } from 'antd'
import Head from 'next/head'
import React, { PureComponent } from 'react'
import './index.less'

export default class Index extends PureComponent {
  state = {
    loading: false,
    submiting: false,
    limit: 10,
    offset: 0,
    reportList: [],
    totalReport: 0
  }

  componentDidMount() {
    this.getData()
  }

  async handleTabChange(data: any) {
    await this.setState({ offset: data.current - 1 })
    this.getData()
  }

  async getData() {
    const {
      limit, offset
    } = this.state
    try {
      await this.setState({ loading: true })
      const resp = await reportService.search({
        limit,
        offset: offset * limit
      })
      await this.setState({
        reportList: resp.data.data,
        totalReport: resp.data.total
      })
    } catch (error: any) {
      message.error(error?.message || 'An error occured. Please try again.')
    } finally {
      this.setState({ loading: false })
    }
  }

  async deleteReport(id: string) {
    if (!window.confirm('Are you sure you want to remove it?')) {
      return
    }
    try {
      await reportService.delete(id)
      message.success('Report deleted successfully')
    } catch (e) {
      const err: any = (await Promise.resolve(e)) || {}
      message.error(err.message || 'An error occurred, please try again!')
    }
  }

  render() {
    const {
      limit, loading, submiting, reportList, totalReport
    } = this.state
    return (
      <>
        <Head>
          <title>Reports </title>
        </Head>
        <div className="main-container">
          <h1 className="page-heading">Reports</h1>
          <Page>
            <div className="report-list-table">
              <ReportTableList
                items={reportList}
                searching={loading}
                total={totalReport}
                onChange={this.handleTabChange.bind(this)}
                pageSize={limit}
                submiting={submiting}
                onDelete={this.deleteReport}
              />
            </div>
          </Page>
        </div>
      </>
    )
  }
}
