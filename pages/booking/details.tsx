import {
  Form, Layout, Tag, Input
} from 'antd';
import Head from 'next/head';
import { bookingCameoService } from '@services/booking-cameo.service';
import { IBooking } from 'src/interfaces';
import { BreadcrumbComponent } from '@components/common';
import { formatDate } from '@lib/date';
import './index.less';
import { renderQuestion, renderBookingStatus } from '@lib/cameo';

interface IProps {
  booking: IBooking;
}

function BookingDetailPage({ booking }: IProps) {
  const recipient = booking?.recipient || { name: '', pronouns: '' };
  const sender = booking?.sender || { name: '', pronouns: '' };

  return (
    <Layout>
      <Head>
        <title>
          Personal Video booking details
        </title>
      </Head>
      <BreadcrumbComponent breadcrumbs={[{ title: 'Booking Details' }]} />
      <div className="booking-page">
        <div className="user-grp">
          <img
            alt="user avatar"
            src={booking?.performerInfo?.avatar || '/static/no-avatar.png'}
          />
          {booking?.performerInfo?.name || booking?.performerInfo?.username || 'N/A'}
        </div>
        <Form.Item label="Recipient">
          {`${recipient.name} (${recipient.pronouns})`}
        </Form.Item>
        <Form.Item label="Sender">
          {`${sender.name} (${sender.pronouns})`}
        </Form.Item>
        <Form.Item label="Release date">
          {formatDate(booking.releaseDate, 'll')}
        </Form.Item>
        <Form.Item label="Occasion">
          <Tag className="secondary-color">{booking.occasionType.toUpperCase()}</Tag>
        </Form.Item>
        {booking?.questions && booking.questions.map((question) => (
          <div className="question-bl" key={question.key}>
            <div className="question">
              {renderQuestion(question.key, booking.recipientSource, booking.occasionType, booking.performerInfo)}
            </div>
            <div className="anwser">{question?.answer || ''}</div>
          </div>
        ))}
        {booking?.attachedFile && (
        <Form.Item label="Attached file">
          <a href={booking.attachedFile.url} target="_.blank">Download here</a>
        </Form.Item>
        )}
        {booking?.releaseFile && (
        <Form.Item label="Released file">
          <a href={booking.releaseFile.url} target="_.blank">Download here</a>
        </Form.Item>
        )}
        <Form.Item>
          <Input.TextArea
            disabled
            value={booking.performerNote}
            style={{ width: '100%' }}
            placeholder="Note something to user"
            autoSize={{ minRows: 3 }}
          />
        </Form.Item>
        <Form.Item label="Status">
          {renderBookingStatus(booking.status)}
        </Form.Item>
      </div>
    </Layout>
  );
}

BookingDetailPage.getInitialProps = async ({ ctx }) => {
  const { query } = ctx;
  const resp = await bookingCameoService.findById(query?.id, {
    Authorization: ctx.token || ''
  });
  return {
    booking: resp?.data
  };
};

export default BookingDetailPage;
