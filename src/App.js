import React, { Fragment, useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllQuotes } from './store/quote-slice';
import MainHeader from './components/layout/MainHeader';
import Notification from './components/UI/Notification';
import LoadingSpinner from './components/UI/LoadingSpinner';

const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const AddQuote = React.lazy(() => import('./pages/AddQuote'));
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

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
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </Fragment>
  );
}

export default App;
