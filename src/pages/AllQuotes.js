import { useSelector } from 'react-redux';

import QuotesList from '../components/QuotesList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Error from '../components/UI/Error';

const AllQuotes = () => {
  const notification = useSelector((state) => state.quote.notification);

  if (notification?.status === 'loading') {
    return <LoadingSpinner />;
  }

  if (notification?.status === 'error') {
    return <Error errorMsg={notification.message} />;
  }

  return <QuotesList />;
};

export default AllQuotes;
