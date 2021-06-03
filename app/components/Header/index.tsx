import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { IGoogleAuthUserInfo } from '../../interfaces/Common';
import RatingStar from '../RatingStar';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export interface IHeaderProps {
    userInfo: IGoogleAuthUserInfo;
    averageRating: number;
    reviewCount: number;
    filterAction: () => void;
}

export default function Header(props: IHeaderProps): JSX.Element {
    return (
        <View style={styles.headerWrapper}>
            <View>
                <View style={styles.headerChildWrapper}>
                    <View>
                        <Image
                            resizeMode="contain"
                            source={{ uri: props.userInfo?.picture }}
                            style={styles.profilePhoto}
                        />
                    </View>
                    <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                        <Text style={styles.userName}>{props.userInfo?.given_name}</Text>
                        <Text style={styles.userEmail}>{props.userInfo?.email}</Text>
                    </View>
                </View>
                <View style={styles.headerRatingWrapper}>
                    <View>
                        <Text style={styles.headerRatingRate}>{props.averageRating.toFixed(1)}</Text>
                    </View>
                    <View style={{ marginLeft: 5, paddingTop: 8, width: '72%' }}>
                        <RatingStar starSize={32} rating={props.averageRating} />
                        <Text numberOfLines={2} style={styles.headeRatingDetailsText}>
                            Overall review rate based in {`${props.reviewCount}`} review(s).
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity onPress={props.filterAction}>
                            <MaterialCommunityIcons name="filter" size={32} color={Colors.misc.colorPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
