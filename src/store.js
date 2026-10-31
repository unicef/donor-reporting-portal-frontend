import {
  configureStore
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './slices';
import rootSaga from './sagas';
const sagas = createSagaMiddleware();

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);

//   middleware.push(logger);
// }

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagas)
});
sagas.run(rootSaga);

export default store;
