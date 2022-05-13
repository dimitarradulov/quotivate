import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Layout from '../components/layout/Layout';
import clock from '../assets/404.png';

const NotFound = () => {
  return (
    <Layout maxWidth="sm">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img
          src={clock}
          alt="broken clokc"
          style={{ width: '300px', marginBottom: '20px' }}
        />
        <Typography variant="h5" component="div" gutterBottom>
          This Page is Broken
        </Typography>
        <Typography variant="body1">
          A broken clock is right twice a day. But if you just have one clock,
          it’s impossible to tell exactly when the clock is right. So it could
          be right at any moment. And that brings you to the crux of the
          conceptualization. What is time? Nothing but an abyss. Clocks are just
          false attempts to harness its power. It’s cruel really.
        </Typography>
      </Box>
    </Layout>
  );
};

export default NotFound;
