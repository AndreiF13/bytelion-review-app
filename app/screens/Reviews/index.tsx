import * as React from 'react';
// Components
import { ActivityIndicator, Text, View, FlatList, Alert, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ReviewListitem from '../../components/ReviewListItem';
import Header from '../../components/Header';
import Dialog from 'react-native-dialog';
// Utils
import { getItem } from '../../helpers/AsynStorage';
import apiRequest from '../../services/APIRequest';
import {
    setReviewReply,
    setReviewList,
    setReviewVote,
    setIsFilterinReviews,
    setOriginalReviewList,
} from '../../redux/Actions';
// Constants
import { styles } from './styles';
import { googleAuthUserInfoKeyStore } from '../../constants/LocalStorage';
import { apiBaseUrl } from '../../constants/Api';
import Colors from '../../constants/Colors';
import { apiEndpoints } from '../../constants/Api';
// Interfaces
import { IReviewItem, IGoogleAuthUserInfo } from '../../interfaces/Common';
import { RootStateOrAny } from 'react-redux';
import ReviewsFilter from '../../components/ReviewsFilter';

export default function ReviewsScreen(): JSX.Element {
    const reviewList = useSelector((state: RootStateOrAny) => state.reviewList);
    const originalReviewList = useSelector((state: RootStateOrAny) => state.originalReviewList);
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = React.useState<IGoogleAuthUserInfo | undefined>(undefined);
    const [averageRating, setAverageRate] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isReplyingReview, setIsReplyingReview] = React.useState(false);
    const [selectedReviewItem, setSelectedReviewItem] = React.useState<IReviewItem | undefined>(undefined);
    const [replyingText, setReplyingText] = React.useState('');

    const getAuthUserInfo = async () => {
        const authUserInfo: IGoogleAuthUserInfo = await getItem(googleAuthUserInfoKeyStore);
        if (authUserInfo) {
            setUserInfo(authUserInfo);
        }
    };

    const calculateAverageRate = (reviewList: IReviewItem[]) => {
        const reviewCount = reviewList?.length;
        let totalReview = 0;
        reviewList.forEach((item: IReviewItem) => {
            totalReview += item.rating;
        });
        setAverageRate(reviewCount > 0 ? Math.round(totalReview / reviewCount) : 0);
    };

    const fetchReviews = async () => {
        setIsLoading(true);
        apiRequest(apiBaseUrl, {
            url: apiEndpoints.reviews.get,
            method: 'GET',
        })
            .then((response: unknown) => {
                if (response) {
                    setIsLoading(false);
                    const reviews = response as IReviewItem[];
                    calculateAverageRate(reviews);
                    setReviewList(reviews);
                    dispatch(setReviewList(reviews));
                    dispatch(setOriginalReviewList(reviews));
                }
            })
            .catch(() => {
                setIsLoading(false);
            });
    };

    const renderListItem = ({ item }: { item: IReviewItem }) => {
        return (
            <ReviewListitem
                reviewItem={item}
                upVote={() => {
                    dispatch(setReviewVote(item, true, false));
                }}
                downVote={() => {
                    dispatch(setReviewVote(item, false, true));
                }}
                reply={() => {
                    setSelectedReviewItem(item);
                    setReplyingText(item.reply);
                    setIsReplyingReview(true);
                }}
            />
        );
    };

    React.useEffect(() => {
        getAuthUserInfo();
        // Fetching the review once from API and saving it on Redux Persist, after that, I'm just using local storage
        if (reviewList?.length <= 0) {
            fetchReviews();
        }
        // As I'm using ReduxPersist and saving things locally in the app startup I restore the original review list
        if (originalReviewList?.length > reviewList?.length) {
            dispatch(setReviewList(originalReviewList));
        }
        calculateAverageRate(reviewList);
    }, []);

    const getUserName = () => {
        if (userInfo?.given_name) {
            return userInfo?.given_name;
        } else {
            return '';
        }
    };

    return (
        <View style={styles.mainWrapper}>
            <ReviewsFilter startDate={new Date()} endDate={new Date()} />
            <Dialog.Container visible={isReplyingReview}>
                <Dialog.Title>Reply Review</Dialog.Title>
                <Dialog.Description>Provide a reply to the selected review.</Dialog.Description>
                <Dialog.Input
                    value={replyingText}
                    autoFocus
                    onChangeText={(text) => setReplyingText(text)}
                ></Dialog.Input>
                <Dialog.Button
                    label="Reply"
                    onPress={() => {
                        if (replyingText?.length <= 0) {
                            Alert.alert("Reply text can't be empty.");
                        } else {
                            setIsReplyingReview(false);
                            dispatch(setReviewReply(selectedReviewItem as IReviewItem, getUserName(), replyingText));
                        }
                    }}
                />
                <Dialog.Button
                    label="Cancel"
                    color={Colors.misc.colorSecondary}
                    onPress={() => {
                        setSelectedReviewItem(undefined);
                        setIsReplyingReview(false);
                    }}
                />
            </Dialog.Container>
            <Header
                reviewCount={reviewList?.length}
                userInfo={userInfo as IGoogleAuthUserInfo}
                averageRating={averageRating}
                filterAction={() => dispatch(setIsFilterinReviews(true))}
            />
            {isLoading && (
                <View style={styles.contentWrapper}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="large" color={Colors.misc.colorPrimary} />
                    </View>
                    <View style={styles.defaultMarginTop}>
                        <Text style={styles.loadginText}>Loading reviews...</Text>
                    </View>
                </View>
            )}
            {!isLoading && reviewList?.length > 0 && (
                <View style={styles.contentWrapper}>
                    {reviewList?.length >= 0 && (
                        <FlatList
                            data={reviewList}
                            renderItem={renderListItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}
                </View>
            )}
            {reviewList?.length <= 0 && (
                <View style={styles.contentWrapper}>
                    <View style={styles.activityIndicatorWrapper}>
                        <Image
                            resizeMode="contain"
                            style={styles.emptyStateImage}
                            source={require('../../assets/images/empty_state.png')}
                        />
                    </View>
                    <View style={styles.defaultMarginTop}>
                        <Text style={styles.emptyStateText}>{"Hey, we didn't found any reviews"}</Text>
                        <Text style={styles.emptyStateTextInfo}>{'Check your filter and try again...'}</Text>
                    </View>
                </View>
            )}
        </View>
    );
}
