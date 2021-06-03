import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IReviewListItemProps } from '../../interfaces/Common';
import Colors from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

export default function ReviewActions(props: IReviewListItemProps): JSX.Element {
    return (
        <View style={styles.mainWrapper}>
            <TouchableOpacity onPress={props.upVote}>
                <MaterialCommunityIcons
                    name="thumb-up"
                    size={24}
                    color={props.reviewItem.up_voted ? Colors.misc.upVoted : Colors.misc.disabledItem}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.downVote} style={styles.defaultMarginLeft}>
                <MaterialCommunityIcons
                    name="thumb-down"
                    size={24}
                    color={props.reviewItem.down_voted ? Colors.misc.downVoted : Colors.misc.disabledItem}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.reply} style={{ marginLeft: 10 }}>
                <View style={styles.iconTransformationStyle}>
                    <MaterialCommunityIcons name="reply" size={28} color={Colors.misc.colorPrimary} />
                </View>
            </TouchableOpacity>
        </View>
    );
}
