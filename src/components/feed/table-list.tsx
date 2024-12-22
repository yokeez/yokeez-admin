import { PureComponent } from 'react'
import { Table, Tag } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PushpinFilled,
  PushpinOutlined
} from '@ant-design/icons'
import { formatDate } from '@lib/date'
import Link from 'next/link'
import { DropdownAction } from '@components/common/dropdown-action'
import { IFeed } from 'src/interfaces'

interface IProps {
  dataSource: [];
  rowKey: string;
  loading: boolean;
  pagination: {};
  onChange: Function;
  deleteFeed: Function;
  onPin: Function;
}
export class TableListFeed extends PureComponent<IProps> {
  render() {
    const { deleteFeed, onPin } = this.props
    const columns = [
      {
        title: 'Creator',
        dataIndex: 'name',
        render(data: any, record: any) {
          return (
            <span>
              {record?.performer?.name || record?.performer?.username || 'N/A'}
            </span>
          )
        }
      },
      // {
      //   title: 'Description',
      //   dataIndex: 'text',
      //   render(data, record) {
      //     return (
      //       <div
      //         style={{
      //           whiteSpace: 'nowrap',
      //           textOverflow: 'ellipsis',
      //           overflow: 'hidden',
      //           width: '300px',
      //         }}
      //       >
      //         {record.text}
      //       </div>
      //     );
      //   },
      // },
      {
        title: 'Type',
        dataIndex: 'type',
        render(type: any) {
          switch (type) {
            case 'video':
              return <Tag color="blue">Video</Tag>
            case 'photo':
              return <Tag color="orange">Photo</Tag>
            case 'text':
              return <Tag color="pink">Text</Tag>
            default:
              return <Tag color="#936dc9">{type}</Tag>
          }
        }
      },
      // {
      //   title: 'PPV',
      //   dataIndex: 'isSale',
      //   render(data, record) {
      //     if (!record.isSale) {
      //       return <Tag color='red'>N</Tag>;
      //     }
      //     return <Tag color='green'>Y</Tag>;
      //   },
      // },
      // {
      //   title: 'Price',
      //   dataIndex: 'price',
      //   render(price: number) {
      //     return <span>{price ? `$${price?.toFixed(2)}` : '-'}</span>;
      //   },
      // },
      {
        title: 'Pinned',
        dataIndex: 'isPinned',
        render(isPinned: boolean) {
          if (!isPinned) {
            return <Tag color="red">N</Tag>
          }
          return <Tag color="green">Y</Tag>
        }
      },
      {
        title: 'Access type',
        dataIndex: 'accessType',
        render(data: any, record: any) {
          if (record.isSale && record.price !== 0) {
            return <span>PPV</span>
          } if (record?.tiersAccess?.length > 0) {
            return <span>Subscriber only</span>
          }
          return <span>Free</span>
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render(status: any) {
          if (status === 'inactive') {
            return <Tag color="red">Inactive</Tag>
          }
          return <Tag color="green">Active</Tag>
        }
      },
      {
        title: 'Updated On',
        dataIndex: 'updatedAt',
        sorter: true,
        render(date: Date) {
          return <span>{formatDate(date)}</span>
        }
      },
      {
        title: 'Action',
        dataIndex: '_id',
        render: (id: string, record: IFeed) => (
          <DropdownAction
            menuOptions={[
              {
                key: 'update',
                name: 'Update',
                children: (
                  <Link
                    href={{
                      pathname: '/feed/update',
                      query: { id }
                    }}
                    as={`/feed/update?id=${id}`}
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
                  <span>
                    {record.isPinned ? <PushpinFilled /> : <PushpinOutlined />}
                    {' '}
                    {record.isPinned ? 'Unpin from Profile' : 'Pin to Profile'}
                  </span>
                ),
                onClick: () => onPin(record)
              },
              {
                key: 'delete',
                name: 'Delete',
                children: (
                  <span>
                    <DeleteOutlined />
                    {' '}
                    Delete
                  </span>
                ),
                onClick: () => deleteFeed(id)
              }
            ]}
          />
        )
      }
    ]
    const {
      dataSource, rowKey, loading, pagination, onChange
    } = this.props
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={rowKey}
        loading={loading}
        pagination={pagination}
        onChange={onChange.bind(this)}
      />
    )
  }
}
