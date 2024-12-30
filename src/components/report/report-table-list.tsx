/* eslint-disable react/destructuring-assignment */
import { formatDate } from '@lib/date'
import { Collapse, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { DropdownAction } from '@components/common'
import Link from 'next/link'

interface IProps {
  items: any[];
  total: number;
  pageSize: number;
  searching: boolean;
  submiting: boolean;
  onChange: Function;
  onDelete: Function;
}

const reportTableList = ({
  items,
  total,
  pageSize,
  searching,
  onChange,
  onDelete
}: IProps) => {
  const columns = [
    {
      title: 'User',
      dataIndex: 'sourceInfo',
      key: 'sourceInfo',
      render: (user: any) => (
        <span>
          {user?.name || user?.username || 'N/A'}
        </span>
      )
    },
    {
      title: 'Creator',
      dataIndex: 'performerInfo',
      key: 'performerInfo',
      render: (performer: any) => (
        <span>
          {performer?.name || performer?.username || 'N/A'}
        </span>
      )
    },
    {
      title: 'Reason',
      key: 'description',
      render: (record: any) => (
        <Collapse ghost accordion expandIconPosition="right">
          <Collapse.Panel
            header={record?.title || record?.description}
            key="1"
          >
            {record?.description}
          </Collapse.Panel>
        </Collapse>
      )
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: Date) => <span>{formatDate(createdAt)}</span>,
      sorter: true
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render(id: string, record: any) {
        return (
          <DropdownAction
            menuOptions={[
              {
                key: 'update',
                name: 'Update',
                children: (
                  <Link
                    href={{
                      pathname: '/feed/update?id=',
                      query: { id: record?.feed?.slug }
                    }}
                    as={`/feed/update?id=${record?.feed?.slug}`}
                  >
                    <EditOutlined />
                    {' '}
                    Update
                  </Link>
                )
              },
              {
                key: 'delete',
                name: 'Delete',
                children: (
                  <a aria-hidden onClick={() => onDelete(record.key)}>
                    <DeleteOutlined />
                    {' '}
                    Delete
                  </a>
                )
              }
            ]}
          />
        )
      }
    }
    // {
    //   title: 'Action',
    //   key: '_id',
    //   render: (report: any) => (
    //     <button
    //       type="button"
    //       style={{ backgroundColor: 'white', border: '0px', cursor: 'pointer' }}
    //       onClick={() => onDelete(report.key)}
    //     >
    //       <DeleteOutlined />
    //       Delete
    //     </button>
    //   )
    // }
  ]

  const dataSource = items.map((p) => ({ ...p, key: p._id }))

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      className="table"
      pagination={{
        total,
        pageSize
      }}
      rowKey="_id"
      loading={searching}
      onChange={onChange.bind(this)}
    />
  )
}

export default reportTableList
