import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mainWrapper: {
        marginTop: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
    },
    defaultMarginLeft: {
        marginLeft: 10,
    },
    iconTransformationStyle: {
        transform: [{ rotate: '-180deg' }],
    },
});
