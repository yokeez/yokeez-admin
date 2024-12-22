import { TableListBookingOrder } from '@components/booking-cameo/table-list'
import { BreadcrumbComponent } from '@components/common'
import Page from '@components/common/layout/page'
import { bookingCameoService } from '@services/booking-cameo.service'
import { message } from 'antd'
import Head from 'next/head'
import { useEffect, useState } from 'react'

function BookingOrder() {
  const [searching, setSearching] = useState<boolean>(true)
  const [sortBy, setSortBy] = useState<string>('createdAt')
  const [sort, setSort] = useState<string>('desc')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0
  })
  const [list, setList] = useState<any>([])

  const getBookingOrder = async () => {
    try {
      const resp = await bookingCameoService.search({
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
        sort,
        sortBy
      })
      setList(resp.data.data)
      setSearching(false)
    } catch (e) {
      message.error('An error occurred, please try again!')
      setSearching(false)
    }
  }

  const handleTableChange = async (pagi:any, sorter:any) => {
    const statePagination = {
      ...pagination,
      current: pagi.current
    }
    setPagination(statePagination)
    setSortBy(sorter.field || 'createdAt')
    // eslint-disable-next-line no-nested-ternary
    setSort(sorter.order ? (sorter.order === 'ascend' ? 'asc' : 'desc') : '')
    getBookingOrder()
  }

  useEffect(() => {
    getBookingOrder()
  }, [])

  return (
    <>
      <Head>
        <title>Booking Personal Video</title>
      </Head>
      <BreadcrumbComponent breadcrumbs={[{ title: 'Booking Personal Video' }]} />
      <Page>
        <TableListBookingOrder
          dataSource={list}
          rowKey="_id"
          loading={searching}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Page>
    </>
  )
}

export default BookingOrder
