import { Alert } from 'antd';

function Warning() {
  return (
    <Alert
      message="Something went wrong! Check your credentials and try again!"
      type="error"
    />
  );
}

export default Warning;
