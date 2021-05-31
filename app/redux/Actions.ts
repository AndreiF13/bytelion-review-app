import { IReviewItem } from '../interfaces/Common';
import { UPDATE_REVIEW } from './Types';

export const updateReviews = (reviewsList: IReviewItem[]) => ({
  type: UPDATE_REVIEW,
  payload: reviewsList
})