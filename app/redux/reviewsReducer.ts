import { UPDATE_REVIEW } from './Types';

const initialState = {
  savedReviews: []
};

const reviewsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_REVIEW: {
      let updatedSavedReviews = state.savedReviews.concat(action.payload);
      return {
        ...state,
        savedReviews: updatedSavedReviews
      }
    }
    default:
      return state
  }
}

export default reviewsReducer;