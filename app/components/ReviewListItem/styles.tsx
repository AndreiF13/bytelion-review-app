import { StyleSheet } from 'react-native';
import * as screenUtils from '../../helpers/ScreenUtils';

export const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'stretch',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
    },
    childWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    imageWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    reviewWrapper: {
        paddingHorizontal: 10,
        width: screenUtils.widthPercentToDP('80%'),
    },
    reviewDae: {
        fontSize: 14,
        color: '#616161',
    },
    dafaultMarginTop: {
        marginTop: 5,
    },
    review: {
        fontSize: 16,
    },
});
