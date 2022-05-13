import { configureStore } from '@reduxjs/toolkit';

import quoteSlice from './quote-slice';

const store = configureStore({
  reducer: { quote: quoteSlice },
});

export default store;
