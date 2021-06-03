/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    VOTE_REVIEW,
    REPLY_REVIEW,
    SET_REVIEWS_LIST,
    SET_IS_FILTERING_REVIEWS,
    FILTER_REVIEWS,
    SET_ORIGINAL_REVIEWS_LIST,
} from './Types';
import { IReviewItem } from '../interfaces/Common';

const initialState = {
    reviewList: [],
    originalReviewsList: [],
    isReplyingReview: false,
    isFilteringReviews: false,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const rootReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case FILTER_REVIEWS:
        case SET_REVIEWS_LIST: {
            return {
                ...state,
                reviewList: action.payload,
            };
        }

        case SET_ORIGINAL_REVIEWS_LIST: {
            return {
                ...state,
                originalReviewList: action.payload,
            };
        }
        case VOTE_REVIEW: {
            return {
                ...state,
                reviewList: state.reviewList.map((review: IReviewItem) =>
                    review.id === action.id
                        ? { ...review, up_voted: action.payload.up, down_voted: action.payload.down }
                        : review,
                ),
            };
        }
        case REPLY_REVIEW: {
            return {
                ...state,
                reviewList: state.reviewList.map((review: IReviewItem) =>
                    review.id === action.id
                        ? { ...review, replied: true, reply: action.payload.reply, repliedBy: action.payload.repliedBy }
                        : review,
                ),
            };
        }
        case SET_IS_FILTERING_REVIEWS: {
            return {
                ...state,
                isFilteringReviews: action.payload,
            };
        }
        default:
            return state;
    }
};

export default rootReducer;
