import { Message } from 'semantic-ui-react';

interface Props {
  messagetype: string;
  headermessage: string;
  content: string;
}

export default function MyErrorMessage(props: Props) {
  const { messagetype, headermessage, content } = props;

  return (
    <Message positive={messagetype === 'positive'} negative={messagetype === 'negative'} success={messagetype === 'success'} warning={messagetype === 'warning'} info={messagetype === 'info'}>
      <Message.Header>{headermessage}</Message.Header>
      <p>{content}</p>
    </Message>
  );
}
