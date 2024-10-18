import {
  Avatar, Table
} from 'antd';
import { formatDate } from '@lib/date';
import { IPerformer, IUser } from 'src/interfaces';
import Link from 'next/link';
import { EyeOutlined } from '@ant-design/icons';
import { renderBookingStatus } from '@lib/cameo';

interface IProps {
  dataSource: any;
  rowKey: string;
  loading: boolean;
  pagination: {};
  onChange: Function;
}

export function TableListBookingOrder(props: IProps) {
  const columns = [
    {
      title: 'Booking ID',
      dataIndex: '_id',
      render(id: string) {
        return (
          <Link
            href={{
              pathname: '/booking/details',
              query: { id }
            }}
            as={`/booking/details?id=${id}`}
          >
            <a>{id.slice(0, 12).toUpperCase()}</a>
          </Link>
        );
      }
    },
    {
      title: 'Model',
      dataIndex: 'performerInfo',
      render(performerInfo: IPerformer) {
        const performer = performerInfo;
        return (
          <>
            <Avatar src={performer?.avatar || '/no-avatar.png'} />
            {performerInfo?.name || performerInfo?.username}
          </>
        );
      }
    },
    {
      title: 'User',
      dataIndex: 'userInfo',
      render(userInfo: IUser) {
        const user = userInfo;
        return (
          <>
            <Avatar src={user?.avatar || '/no-avatar.png'} />
            {user?.name || user?.username}
          </>

        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(status: string) {
        return renderBookingStatus(status);
      }
    },
    {
      title: 'Updated On',
      dataIndex: 'updatedAt',
      sorter: true,
      render(date: Date) {
        return <span>{formatDate(date)}</span>;
      }
    },
    {
      title: 'Detail',
      dataIndex: '_id',
      render: (id: string) => (
        <div style={{ whiteSpace: 'nowrap' }}>
          <Link
            href={{
              pathname: '/booking/details',
              query: { id }
            }}
            as={`/booking/details?id=${id}`}
          >
            <a>
              <EyeOutlined />
            </a>
          </Link>
        </div>
      )
    }
  ];
  const {
    dataSource, rowKey, loading, pagination, onChange
  } = props;
  return (
    <Table
      dataSource={dataSource}
      columns={columns as any}
      rowKey={rowKey}
      loading={loading}
      pagination={pagination}
      onChange={onChange.bind(this)}
    />
  );
}
