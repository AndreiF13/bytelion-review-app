import { createStore } from 'redux';
import reviewsReducer from './reviewsReducer';

const store = createStore(reviewsReducer);

export default store;