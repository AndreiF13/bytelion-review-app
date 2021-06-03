import { StyleSheet } from 'react-native';
import * as screenUtils from '../../helpers/ScreenUtils';

export const styles = StyleSheet.create({
    mainWrapper: {
        marginTop: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
    },
    headerWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: screenUtils.heightPercentToDP('22%'),
    },
    headerChildWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        paddingTop: 20,
        alignItems: 'center',
    },
    profilePhoto: {
        borderRadius: 50,
        width: 64,
        height: 64,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 15,
    },
    headerRatingWrapper: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerRatingRate: {
        fontSize: 42,
        color: '#424242',
        fontWeight: 'bold',
    },
    headeRatingDetailsText: {
        marginTop: 5,
        marginLeft: 5,
        fontSize: 13,
        color: '#424242',
        fontWeight: '400',
    },
});
