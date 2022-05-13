import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quotes: [],
  singleQuote: {},
  notification: null,
  notificationAlertOpen: false,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    getData(state, action) {
      if (action.payload.type === 'GET') {
        const receivedData = action.payload.data;

        Object.keys(receivedData).forEach((dataKey) => {
          const quoteObj = {
            id: dataKey,
            author: receivedData[dataKey].author,
            text: receivedData[dataKey].text,
          };

          state.quotes.push(quoteObj);
        });
      }

      if (action.payload.type === 'POST') {
        state.quotes.push(action.payload.data);
      }
    },
    notificationAlertToggler(state, action) {
      if (action.payload.type === 'open') {
        state.notificationAlertOpen = true;
      }

      if (action.payload.type === 'close') {
        state.notificationAlertOpen = false;
      }
    },
    sortQuotes(state, action) {
      state.quotes.sort((quoteA, quoteB) => {
        if (action.payload.asc) {
          return quoteA.id > quoteB.id ? 1 : -1;
        } else {
          return quoteA.id < quoteB.id ? 1 : -1;
        }
      });
    },
    getSingleQuote(state, action) {
      state.singleQuote = action.payload;
    },
  },
});

export const sendQuote = (quote) => {
  return async (dispatch) => {
    try {
      dispatch(
        quoteSlice.actions.showNotification({
          method: 'post',
          status: 'pending',
          title: 'Sending...',
          message: 'Adding your quote...',
        })
      );

      const response = await fetch(
        'https://quotivate-d9c28-default-rtdb.europe-west1.firebasedatabase.app/quotes.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quote),
        }
      );

      if (!response.ok) {
        throw new Error('Oops... Something went wrong!');
      }

      const id = await response.json();

      dispatch(
        quoteSlice.actions.showNotification({
          method: 'post',
          status: 'success',
          title: 'Success!',
          message: 'Quote added successfully!',
        })
      );

      dispatch(
        quoteSlice.actions.getData({
          type: 'POST',
          data: { id: id.name, ...quote },
        })
      );
    } catch (err) {
      dispatch(
        quoteSlice.actions.showNotification({
          method: 'post',
          status: 'error',
          title: 'Error!',
          message: 'Error ' + err.message,
        })
      );
    }
  };
};

export const getAllQuotes = () => {
  return async (dispatch) => {
    try {
      dispatch(
        quoteSlice.actions.showNotification({
          status: 'loading',
          title: 'Loading...',
          message: 'Loading quotes...',
        })
      );

      const response = await fetch(
        'https://quotivate-d9c28-default-rtdb.europe-west1.firebasedatabase.app/quotes.json'
      );

      if (!response.ok)
        throw new Error('Failed retrieving the quotes from the server!');

      const data = await response.json();

      dispatch(
        quoteSlice.actions.showNotification({
          status: 'completed',
          title: '',
          message: '',
        })
      );

      dispatch(quoteSlice.actions.getData({ type: 'GET', data }));
    } catch (err) {
      dispatch(
        quoteSlice.actions.showNotification({
          status: 'error',
          title: 'Error!',
          message: err.message,
        })
      );
    }
  };
};

export const getSingleQuote = (quoteId) => {
  return async (dispatch) => {
    try {
      dispatch(
        quoteSlice.actions.showNotification({
          status: 'loading',
          title: 'Loading...',
          message: 'Loading quotes...',
        })
      );

      const response = await fetch(
        `https://quotivate-d9c28-default-rtdb.europe-west1.firebasedatabase.app/quotes/${quoteId}.json`
      );

      if (!response.ok)
        throw new Error('Failed retrieving the quote from the server!');

      const data = await response.json();

      dispatch(
        quoteSlice.actions.showNotification({
          status: 'completed',
          title: '',
          message: '',
        })
      );

      dispatch(quoteSlice.actions.getSingleQuote(data));
    } catch (err) {
      dispatch(
        quoteSlice.actions.showNotification({
          status: 'error',
          title: 'Error!',
          message: err.message,
        })
      );
    }
  };
};

export const quoteActions = quoteSlice.actions;
export default quoteSlice.reducer;
