import React from 'react';
// Components
import { View, Text, Image } from 'react-native';
import RatingStar from '../../components/RatingStar';
import ReviewActions from '../../components/ReviewActions';
// Interfaces
import { IReviewListItemProps } from '../../interfaces/Common';
// Utils
import moment from 'moment';
import { styles } from './styles';
// Consts
import Colors from '../../constants/Colors';

export default function ReviewListItem(props: IReviewListItemProps): JSX.Element {
    return (
        <View style={styles.mainWrapper}>
            <View>
                <View style={styles.childWrapper}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../../assets/images/user_avatar.png')}
                            style={{ width: 52, height: 52 }}
                        />
                    </View>
                    <View style={styles.reviewWrapper}>
                        <View>
                            <Text style={styles.reviewDae}>
                                {moment(props.reviewItem.created_at).format('dddd, MMMM DD, yyyy')}
                            </Text>
                        </View>
                        <View style={styles.dafaultMarginTop}>
                            <View style={styles.dafaultMarginTop}>
                                <RatingStar rating={props.reviewItem.rating} starSize={28} />
                            </View>
                            <View style={styles.dafaultMarginTop}>
                                <Text numberOfLines={3} style={styles.review}>
                                    {props.reviewItem.message}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {props.reviewItem.replied && (
                    <View style={{ marginTop: 10 }}>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: Colors.misc.disabledItem }} />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontStyle: 'italic', fontSize: 15 }}>
                                Replied by
                                <Text style={{ fontStyle: 'italic', fontSize: 14, fontWeight: 'bold' }}>
                                    {' ' + props.reviewItem.repliedBy}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontStyle: 'italic', fontSize: 16 }}>{props.reviewItem.reply}</Text>
                        </View>
                    </View>
                )}
                <View>
                    <ReviewActions
                        reviewItem={props.reviewItem}
                        upVote={props.upVote}
                        downVote={props.downVote}
                        reply={props.reply}
                    />
                </View>
            </View>
        </View>
    );
}
