import { Fragment, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllQuotes } from './store/quote-slice';
import MainHeader from './components/layout/MainHeader';
import Notification from './components/UI/Notification';
import AllQuotes from './pages/AllQuotes';
import AddQuote from './pages/AddQuote';
import QuoteDetails from './pages/QuoteDetails';
import NotFound from './pages/NotFound';

function App() {
  const notificationAlertOpen = useSelector(
    (state) => state.quote.notificationAlertOpen
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuotes());
  }, [dispatch]);

  return (
    <Fragment>
      <MainHeader />
      {notificationAlertOpen && <Notification />}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes/all" />
        </Route>
        <Route path="/quotes/all" exact>
          <AllQuotes />
        </Route>
        <Route path="/quotes/add" exact>
          <AddQuote />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetails />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
