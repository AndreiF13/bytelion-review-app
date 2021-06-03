import * as React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export default function SettingnsScreen(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This second tab can be used as a Settings screen.</Text>
        </View>
    );
}
