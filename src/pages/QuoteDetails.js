import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { getSingleQuote } from '../store/quote-slice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';
import Layout from '../components/layout/Layout';

const QuoteDetails = () => {
  const params = useParams();
  const quote = useSelector((state) => state.quote.singleQuote);
  const notification = useSelector((state) => state.quote.notification);
  const dispatch = useDispatch();

  const { quoteId } = params;

  useEffect(() => {
    dispatch(getSingleQuote(quoteId));
  }, [dispatch, quoteId]);

  if (notification?.status === 'loading') {
    return <LoadingSpinner />;
  }

  if (notification?.status === 'error') {
    return <Error errorMsg={notification.message} />;
  }

  return (
    <Layout maxWidth="sm">
      <Paper elevation={4} sx={{ padding: 5 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ marginBottom: 5 }}
        >
          {quote.text}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Typography variant="subtitle1" display="block">
            {quote.author}
          </Typography>
        </Box>
      </Paper>
    </Layout>
  );
};

export default QuoteDetails;
