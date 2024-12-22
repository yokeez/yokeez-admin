import { PureComponent } from 'react'
import {
  Form, Button, message, InputNumber, Switch, Row, Col
} from 'antd'
import { IPerformer } from 'src/interfaces'

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
}

const validateMessages = {
  required: 'This field is required!'
}

interface IProps {
  onFinish: Function;
  performer: IPerformer;
  submiting: boolean;
}

export class SubscriptionForm extends PureComponent<IProps> {
  state = {
    isFreeSubscription: false
  }

  componentDidMount() {
    const { performer } = this.props
    this.setState({ isFreeSubscription: !!performer?.isFreeSubscription })
  }

  render() {
    const { performer, onFinish, submiting } = this.props
    const { isFreeSubscription } = this.state
    return (
      <Form
        {...layout}
        name="form-performer"
        onFinish={onFinish.bind(this)}
        onFinishFailed={() => message.error('Please complete the required fields in tab general info')}
        validateMessages={validateMessages}
        initialValues={
          performer || ({
            isFreeSubscription: false,
            yearlyPrice: 99.99,
            monthlyPrice: 9.99,
            publicChatPrice: 1,
            cameoPrice: 9.99,
            bookingEnabled: true
          })
        }
      >
        <Row>
          <Col xs={24} md={12}>
            <Form.Item name="isFreeSubscription" valuePropName="checked">
              <Switch unCheckedChildren="Paid Subscription" checkedChildren="Unpaid Subscription" onChange={(val) => this.setState({ isFreeSubscription: val })} />
            </Form.Item>
            {isFreeSubscription && (
            <Form.Item
              name="durationFreeSubscriptionDays"
              label="Duration (days)"
              help="Free subscription for xx days (CCbill)"
              extra="Free subscription for xx days then $xx per month (Stripe)"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            )}
            <Form.Item
              key="yearly"
              name="yearlyPrice"
              label="Yearly Subscription Price ($)"
              rules={[{ required: true }]}
            >
              <InputNumber min={2.95} max={300} />
            </Form.Item>
            <Form.Item
              key="monthly"
              name="monthlyPrice"
              label="Monthly Subscription Price ($)"
              rules={[{ required: true }]}
            >
              <InputNumber min={2.95} max={300} />
            </Form.Item>
            <Form.Item
              key="publicChatPrice"
              name="publicChatPrice"
              label="Default Streaming Price (token)"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="bookingEnabled"
              label="Enable/Disable booking"
              valuePropName="checked"
            >
              <Switch unCheckedChildren="Off" checkedChildren="On" />
            </Form.Item>
            <Form.Item
              name="cameoPrice"
              label="Personal Video shout out price"
              rules={[{ required: true, message: 'Please enter a price!' }]}
            >
              <InputNumber min={2.95} max={300} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit" disabled={submiting} loading={submiting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
