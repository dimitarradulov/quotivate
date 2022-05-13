import Box from '@mui/material/Box';

import Layout from '../layout/Layout';

const LoadingSpinner = () => {
  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Box>
    </Layout>
  );
};

export default LoadingSpinner;
