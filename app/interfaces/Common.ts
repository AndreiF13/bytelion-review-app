export interface IGoogleAuthUserInfo {
  email: string;
  family_name: string;
  given_name: string;
  hd: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface IReviewItem {
  id: number;
  rating: number;
  message: string;
  created_at: Date;
  up_voted: boolean;
  down_voted: boolean;
  replied: boolean;
  reply: string;
}