import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Layout from '../layout/Layout';

const Error = (props) => {
  return (
    <Layout fixed={true}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {props.errorMsg}
      </Alert>
    </Layout>
  );
};

export default Error;
