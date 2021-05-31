import { IReviewItem } from '../interfaces/Common';

export const createOrUpdateVoteItem = (reviewList: IReviewItem[], reviewItem: IReviewItem) => {
  let resultArray: IReviewItem[] = reviewList;
  const itemExists = reviewList.filter((item: IReviewItem) => {
    return item.id == reviewItem.id;
  }).length >= 1;
  if (itemExists) {
    for (let i = 0; i < resultArray.length; i++) {
      let ele: IReviewItem = resultArray[i];
      if (ele.id == reviewItem.id) {
        resultArray[i].up_voted = reviewItem.up_voted;
        resultArray[i].down_voted = reviewItem.down_voted;
        resultArray[i].replied = reviewItem.replied;
        resultArray[i].reply = reviewItem.reply;
        break;
      }
    }
  } else {
    resultArray.push(reviewItem);
  }
  return resultArray;
}