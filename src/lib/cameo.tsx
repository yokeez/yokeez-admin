import { IQuestion } from 'src/interfaces/booking-cameo'
import { IPerformer } from 'src/interfaces/performer'
import { Tag } from 'antd'
import { OCCASION_TYPE, QUESTION_KEYS, RECIPIENT_SOURCE } from 'src/components/booking-cameo/constants'

export function getQuestionValue(questions: IQuestion[], key: string) {
  const item = questions.find((s) => s.key === key)
  return item?.answer || ''
}

export function renderQuestion(key: string, recipientSource: string, occasionType: string, performer: IPerformer) {
  if (occasionType === OCCASION_TYPE.BIRTHDAY) {
    switch (key) {
      case QUESTION_KEYS.BIRTHDAY_WHEN: return `When is ${recipientSource === RECIPIENT_SOURCE.MYSELF ? 'your' : 'their'} birthday? (optional)`
      case QUESTION_KEYS.BIRTHDAY_OLD: return `How old are ${recipientSource === RECIPIENT_SOURCE.MYSELF ? 'you' : 'them'} turning? (optional)`
      case QUESTION_KEYS.BIRTHDAY_DOING: return `What are you doing for ${recipientSource === RECIPIENT_SOURCE.MYSELF ? 'your' : 'their'} birthday?`
      case QUESTION_KEYS.TO_KNOW: return `What's something ${recipientSource === RECIPIENT_SOURCE.MYSELF ? '' : 'about recipient '}you want ${performer?.name} to know${recipientSource === RECIPIENT_SOURCE.MYSELF ? ' about you' : ''}?`
      default: return null
    }
  }
  if (occasionType === OCCASION_TYPE.ADVICE) {
    switch (key) {
      case QUESTION_KEYS.ADVICE_ON: return `What do ${RECIPIENT_SOURCE.MYSELF ? 'you' : 'they'} need advice on?`
      case QUESTION_KEYS.ADVICE_HELP: return `How can ${performer?.name} help?`
      case QUESTION_KEYS.BIRTHDAY_DOING: return `What are you doing for ${recipientSource === RECIPIENT_SOURCE.MYSELF ? 'your' : 'their'} birthday?`
      case QUESTION_KEYS.TO_KNOW: return `What's something ${recipientSource === RECIPIENT_SOURCE.MYSELF ? '' : 'about recipient '}you want ${performer?.name} to know${recipientSource === RECIPIENT_SOURCE.MYSELF ? ' about you' : ''}?`
      default: return null
    }
  }
  if (occasionType === OCCASION_TYPE.QUESTION) {
    switch (key) {
      case QUESTION_KEYS.QUESTION_QUESTION: return `What's the question ${recipientSource === RECIPIENT_SOURCE.MYSELF ? 'you' : 'they'} might have for ${performer?.name} ?`
      case QUESTION_KEYS.TO_KNOW: return `What's something ${recipientSource === RECIPIENT_SOURCE.MYSELF ? '' : 'about recipient '}you want ${performer?.name} to know${recipientSource === RECIPIENT_SOURCE.MYSELF ? ' about you' : ''}?`
      default: return null
    }
  }
  if (occasionType === OCCASION_TYPE.OTHER) {
    switch (key) {
      case QUESTION_KEYS.OTHER_RELATION: return `What's ${recipientSource === RECIPIENT_SOURCE.MYSELF ? 'your' : 'their'} relation to the recipient?`
      case QUESTION_KEYS.OTHER_OCCASION: return 'What\'s the occasion?'
      case QUESTION_KEYS.OTHER_REASON: return `Why did you choose to get a Personal Video from ${performer?.name}?`
      case QUESTION_KEYS.TO_KNOW: return `What's something ${recipientSource === RECIPIENT_SOURCE.MYSELF ? '' : 'about recipient '}you want ${performer?.name} to know${recipientSource === RECIPIENT_SOURCE.MYSELF ? ' about you' : ''}?`
      default: return null
    }
  }
  return ''
}

export const renderBookingStatus = (status: string) => {
  switch (status) {
    case 'created':
      return <Tag color="default">Created</Tag>
    case 'payment_success':
      return <Tag color="green">Payment Success</Tag>
    case 'approved':
      return <Tag color="blue">Approved</Tag>
    case 'rejected':
      return <Tag color="red">Rejected</Tag>
    case 'expired':
      return <Tag color="violet">Expired</Tag>
    case 'done':
      return <Tag color="pink">Finished</Tag>
    default: return <Tag color="#FFCF00">{status}</Tag>
  }
}
