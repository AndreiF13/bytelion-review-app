import { StyleSheet } from 'react-native';
import * as screenUtils from '../../helpers/ScreenUtils';

export const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#F2F2F2',
    },
    contentWrapper: {
        backgroundColor: '#F2F2F2',
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenUtils.heightPercentToDP('60%'),
    },
    defaultMarginTop: {
        marginTop: 10,
    },
    loadginText: {
        fontSize: 16,
        color: '#424242',
        fontWeight: 'bold',
    },
    emptyStateText: {
        fontSize: 20,
        color: '#424242',
        fontWeight: 'bold',
    },
    emptyStateTextInfo: {
        marginTop: 5,
        fontSize: 16,
        color: '#424242',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    emptyStateImage: {
        width: screenUtils.widthPercentToDP('40%'),
        height: screenUtils.heightPercentToDP('20%'),
    },
});
