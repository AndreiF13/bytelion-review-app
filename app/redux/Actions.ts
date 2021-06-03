// Interfaces
import { IReduxBaseAction, IReviewItem } from '../interfaces/Common';
// Types
import {
    REPLY_REVIEW,
    SET_IS_FILTERING_REVIEWS,
    SET_ORIGINAL_REVIEWS_LIST,
    SET_REVIEWS_LIST,
    VOTE_REVIEW,
} from './Types';

export function setReviewList(reviewsList: IReviewItem[]): IReduxBaseAction {
    const action: IReduxBaseAction = {
        type: SET_REVIEWS_LIST,
        id: 0,
        payload: reviewsList,
    };
    return action;
}

export function setOriginalReviewList(reviewsList: IReviewItem[]): IReduxBaseAction {
    const action: IReduxBaseAction = {
        type: SET_ORIGINAL_REVIEWS_LIST,
        id: 0,
        payload: reviewsList,
    };
    return action;
}

export function setReviewVote(review: IReviewItem, up: boolean, down: boolean): IReduxBaseAction {
    const action: IReduxBaseAction = {
        type: VOTE_REVIEW,
        id: review.id,
        payload: { up: up, down: down },
    };
    return action;
}

export function setReviewReply(review: IReviewItem, repliedBy: string, reply: string): IReduxBaseAction {
    const action: IReduxBaseAction = {
        type: REPLY_REVIEW,
        id: review.id,
        payload: { repliedBy: repliedBy, reply: reply },
    };
    return action;
}

export function setIsFilterinReviews(isFiltering: boolean): IReduxBaseAction {
    const action: IReduxBaseAction = {
        type: SET_IS_FILTERING_REVIEWS,
        id: 0,
        payload: isFiltering,
    };
    return action;
}
