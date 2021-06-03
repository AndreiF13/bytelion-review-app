import React from 'react';
import { View, Text, SafeAreaView, Modal, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { setIsFilterinReviews, setOriginalReviewList, setReviewList } from '../../redux/Actions';
import { IReviewItem } from '../../interfaces/Common';
import moment from 'moment';

export interface IReviewsFilterProps {
    startDate: Date;
    endDate: Date;
}

export default function ReviewsFilter(props: IReviewsFilterProps): JSX.Element {
    const isVislbe = useSelector((state: RootStateOrAny) => state.isFilteringReviews);
    const reviewList = useSelector((state: RootStateOrAny) => state.reviewList);
    const originalReviewList = useSelector((state: RootStateOrAny) => state.originalReviewList);

    const dispatch = useDispatch();
    const [startDate, setStartDate] = React.useState(props.startDate);
    const [endDate, setEndDate] = React.useState(props.endDate);

    const closeModal = () => {
        dispatch(setIsFilterinReviews(false));
    };

    const filterReviews = (reviews: IReviewItem[]): IReviewItem[] => {
        const filteredArray = reviews.filter((item) => {
            const date = new Date(item.created_at);
            return (
                moment(date).startOf('day') >= moment(startDate).startOf('day') &&
                moment(date).startOf('day') <= moment(endDate).endOf('day')
            );
        });
        return filteredArray;
    };

    const doFilter = () => {
        if (endDate < startDate) {
            Alert.alert('You must to provide a valid period of time.');
        } else {
            dispatch(setOriginalReviewList(reviewList));
            dispatch(setReviewList(filterReviews(originalReviewList)));
            closeModal();
        }
    };

    return (
        <Modal animationType="slide" visible={isVislbe}>
            <SafeAreaView>
                <View
                    style={{
                        height: '100%',
                        paddingTop: 20,
                        paddingHorizontal: 20,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => closeModal()}>
                            <MaterialCommunityIcons name="close" size={28} color="gray" />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Filter reviews</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            height: '90%',
                            justifyContent: 'center',
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%' }}>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 16 }}>Select the Start Date</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={startDate}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate) {
                                                setStartDate(selectedDate);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ width: '50%' }}>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 16 }}>Select the End Date</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={endDate}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            if (selectedDate) {
                                                setEndDate(selectedDate);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, width: '100%' }}>
                            <View>
                                <Button
                                    color={Colors.misc.colorPrimary}
                                    icon={<View />}
                                    textColor="#FFFFFF"
                                    disabled={false}
                                    text="Apply Filter"
                                    action={() => {
                                        doFilter();
                                    }}
                                />
                            </View>
                            <View>
                                <Button
                                    color={Colors.misc.colorSecondary}
                                    icon={<View />}
                                    textColor="#FFFFFF"
                                    disabled={false}
                                    text="Clear Filter"
                                    action={() => {
                                        dispatch(setReviewList(originalReviewList));
                                        closeModal();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}
