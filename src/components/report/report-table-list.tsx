/* eslint-disable react/destructuring-assignment */
import { formatDate } from '@lib/date'
import { Collapse, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

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
      key: '_id',
      render: (report: any) => (
        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(report.key)}
        >
          <DeleteOutlined />
          Delete
        </button>
      )
    }
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
