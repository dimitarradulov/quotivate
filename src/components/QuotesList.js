import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

import { quoteActions } from '../store/quote-slice';
import Quote from './Quote';
import Layout from './layout/Layout';

const QuotesList = () => {
  const quotes = useSelector((state) => state.quote.quotes);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const isAscending = searchParams.get('sort') === 'asc';

  const changeSortingHandler = () => {
    dispatch(quoteActions.sortQuotes({ asc: isAscending }));
    history.push('/quotes/all?sort=' + (isAscending ? 'desc' : 'asc'));
  };

  return (
    <Layout fixed={true}>
      <Button variant="outlined" size="large" onClick={changeSortingHandler}>
        Sort {isAscending ? 'Descending' : 'Ascending'}
      </Button>
      {quotes.map((quote) => (
        <Quote
          key={quote.id}
          id={quote.id}
          text={quote.text}
          author={quote.author}
        />
      ))}
    </Layout>
  );
};

export default QuotesList;
