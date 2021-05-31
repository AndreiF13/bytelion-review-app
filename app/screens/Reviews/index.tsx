import * as React from 'react';
// Components
import { Image, ActivityIndicator, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import RatingStar from '../../components/RatingStar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
// Utils
import * as screenUtils from '../../helpers/ScreenUtils';
import { getItem, saveItem } from '../../helpers/AsynStorage';
import apiRequest from '../../services/APIRequest';
import moment from 'moment';
import { createOrUpdateVoteItem } from '../../helpers/VotesCRUD';
import {  updateReviews } from '../../redux/Actions';
// Constants
import { styles } from './styles';
import { googleAuthUserInfoKeyStore, savedReviewsKeyStore } from '../../constants/LocalStorage';
import { apiBaseUrl } from '../../constants/Api';
import Colors from '../../constants/Colors';
// Interfaces 
import { IReviewItem, IGoogleAuthUserInfo } from '../../interfaces/Common';

export default function ReviewsScreen() {
  const savedReviews = useSelector(({ savedReviews } : { savedReviews : IReviewItem[] }) => savedReviews);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = React.useState<IGoogleAuthUserInfo | undefined>(undefined);
  const [averageRage, setAverageRate] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reviews, setReviews] = React.useState<IReviewItem[] | undefined>(undefined);
  //const [savedReviews, setSavedReviews] = React.useState<IReviewItem[] | undefined>(undefined);

  const getAuthUserInfo = async() => {
    const authUserInfo: IGoogleAuthUserInfo = await getItem(googleAuthUserInfoKeyStore);
    if (authUserInfo) {
      setUserInfo(authUserInfo);
    }
  }

  const calculateAverageRate = (reviewList: IReviewItem[]) => {
    const reviewCounnt = reviewList?.length;
    let totalReview = 0;
    reviewList.forEach((item: IReviewItem) => {
      totalReview += item.rating;
    });
    setAverageRate(Math.round(totalReview / reviewCounnt));
  }

  const fetchReviews = async () => {
    setIsLoading(true);
    apiRequest(apiBaseUrl, {
      url: "reviews",
      method: "GET"
    }).then((response: any) => {
      if (response) {
        setIsLoading(false);
        calculateAverageRate(response);
        setReviews(response);
        //getLocalStoredReviews();
      }
    }).catch((error: any) => {
      setIsLoading(false);
    });
  }

  const getLocalStoredReviews = () => {
    getItem(savedReviewsKeyStore).then((value) => {
      if (value) {        
        dispatch(updateReviews(JSON.parse(value)));
      }
    });
  }

  const voteReview = (item: IReviewItem, up: boolean, down: boolean) => {
    item.up_voted = up;
    item.down_voted = down;
    /*const updatedReviews: IReviewItem[] = createOrUpdateVoteItem(savedReviews as IReviewItem[], item) as IReviewItem[];
    if (updatedReviews) {
      //saveItem(savedReviewsKeyStore, JSON.stringify(updatedReviews));
      dispatch(updateReviews(updatedReviews));
    }*/
  }

  const isUpVoted = (item: IReviewItem): boolean => {
    /*const filteredArray = savedReviews?.filter((i: IReviewItem) => { return i.id == item.id && i?.up_voted });
    if (filteredArray) {
      return filteredArray.length >= 1;
    }*/
    return false;
  }

  const isDownVoted = (item: IReviewItem): boolean => {
    /*const filteredArray = savedReviews?.filter((i: IReviewItem) => { return i.id == item.id && i?.down_voted });
    if (filteredArray) {
      return filteredArray.length >= 1;
    }*/
    return false;
  }

  const renderListItem = ({ item }: { item : IReviewItem }) => {
    return (
      <View style={{ backgroundColor: "#FFFFFF", alignSelf: "stretch", paddingHorizontal: 10, paddingVertical: 10, marginBottom: 10}}>
        <View style={{flexDirection: "row", paddingVertical: 10 }}>
          <View style={{ justifyContent: "flex-start", alignItems: "center", width: screenUtils.widthPercentToDP("15%")}}>
            <Image source={require("../../assets/images/user_avatar.png")} style={{ width: 52, height: 52 }}/>
          </View>
          <View style={{ paddingHorizontal: 10, width: screenUtils.widthPercentToDP("80%")}}>
            <View>
              <Text style={{ fontSize: 14, color: "#616161" }}>{moment(item?.created_at).format("dddd, MMMM DD, yyyy")}</Text>
            </View>
            <View style={{marginTop: 5}}>
              <View style={{ marginTop: 5 }}>
                <RatingStar rating={item?.rating} starSize={28} />
              </View>
              <View style={{ marginTop: 5 }}>
                <Text numberOfLines={3} style={{ fontSize: 16 }}>{item.message}</Text>
              </View>             
            </View>            
          </View>
        </View>
        <View style={{ marginTop: 10, paddingRight: 10, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-start", alignSelf: "stretch"}}>
          <TouchableOpacity onPress={() => voteReview(item, true, false)}>
            <MaterialCommunityIcons name="thumb-up" size={24} color={isUpVoted(item) ? Colors.misc.upVoted : Colors.misc.disabledItem} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => voteReview(item, false, true)} style={{ marginLeft: 10}}>
            <MaterialCommunityIcons name="thumb-down" size={24} color={isDownVoted(item) ? Colors.misc.downVoted : Colors.misc.disabledItem} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 10,  }}>
            <View style={{ transform: [{ rotate: "-180deg" }] }} >
              <MaterialCommunityIcons name="reply" size={28} color={Colors.misc.googleSigninButton} />
            </View>            
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  React.useEffect(() => {
    getAuthUserInfo();
    fetchReviews();
  }, []);

  return (
    <View style={styles.mainWrapper}>
      <View style={{flexDirection: "row", paddingHorizontal: 10, paddingVertical: 10, height: screenUtils.heightPercentToDP("22%") }}>
        <View>
          <View style={{flexDirection: "row", width: "100%", justifyContent: "flex-start", paddingTop: 20, alignItems: "center"}}>
            <View>
              <Image resizeMode="contain" source={{ uri: userInfo?.picture }} style={{borderRadius: 50, width: 64, height: 64}} />
            </View>
            <View style={{alignItems: "flex-start", marginLeft: 10}}>
              <Text style={{ fontSize: 18, fontWeight: "bold"}}>{userInfo?.given_name}</Text>
              <Text style={{ fontSize: 15}}>{userInfo?.email}</Text>
            </View>
          </View>
          <View style={{ marginTop: 20, flexDirection: "row" }}>
            <View>
              <Text style={{ fontSize: 42, color: "#424242", fontWeight: "bold"}}>{averageRage.toFixed(1)}</Text>
            </View>
            <View style={{ marginLeft: 5, paddingTop: 8, width: "80%"}}>
              <RatingStar starSize={32} rating={averageRage} />
              <Text numberOfLines={2} style={{ marginTop: 5, marginLeft: 5, fontSize: 13, color: "#424242", fontWeight: "400"}}>Average review rate based in {`${reviews?.length}`} review(s).</Text>
            </View>            
          </View>
        </View>
      </View>
      {isLoading && (
        <View style={{backgroundColor: "#F2F2F2", justifyContent: "center", alignItems: "center", height: screenUtils.heightPercentToDP("60%") }}>
          <View style={{backgroundColor: "#F2F2F2"}}>
            <ActivityIndicator size="large" color={Colors.misc.googleSigninButton}/>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, color: "#424242", fontWeight: "bold"}}>Loading reviews...</Text>
          </View>
        </View>
      )}
      {!isLoading && (
        <View style={{backgroundColor: "#F2F2F2", paddingTop: 10, justifyContent: "center", alignItems: "center", height: screenUtils.heightPercentToDP("60%") }}>
          <FlatList
            data={reviews}
            renderItem={renderListItem}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>        
      )}
    </View>
  );
}
