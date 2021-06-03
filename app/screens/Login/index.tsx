import React, { useState } from 'react';
// Components
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { View, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Button } from '../../components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Utiils
import { saveItem } from '../../helpers/AsynStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from '../../services/APIRequest';
// Constants
import { googleAuthDataKeyStore, googleAuthUserInfoKeyStore } from '../../constants/LocalStorage';
import Colors from '../../constants/Colors';
import { googleAutBaseUrl } from '../../constants/Api';
import { NavigationScreenProp } from 'react-navigation';
import {
    GOOGLE_AUTH_EXPO_ID,
    GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_ANDROID_CLIENT_ID,
    GOOGLE_AUTH_IOS_CLIENT_ID,
    apiEndpoints,
} from '../../constants/Api';

// Setting webbrowser to be able to come up and ask for authentication
WebBrowser.maybeCompleteAuthSession();

type Props = {
    navigation: NavigationScreenProp<{ screenName: string }>;
};

export default function LoginScreen({ navigation }: Props): JSX.Element {
    const [, response, promptAsync] = Google.useAuthRequest({
        expoClientId: GOOGLE_AUTH_EXPO_ID,
        iosClientId: GOOGLE_AUTH_CLIENT_ID,
        androidClientId: GOOGLE_AUTH_ANDROID_CLIENT_ID,
        webClientId: GOOGLE_AUTH_IOS_CLIENT_ID,
    });
    const [isLoading, setIsLoading] = useState(false);

    const doLogin = async (accessToken: string) => {
        if (accessToken) {
            apiRequest(googleAutBaseUrl, {
                url: apiEndpoints.google.me,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (response) {
                        setIsLoading(false);
                        saveItem(googleAuthUserInfoKeyStore, response);
                        navigation.replace('Root');
                    }
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }
    };

    const readAuthSettingsAndLogin = () => {
        AsyncStorage.getItem(googleAuthDataKeyStore).then((value) => {
            if (value) {
                if (value) {
                    const data = JSON.parse(value);
                    const accessToken = data?.params?.access_token;
                    if (accessToken) {
                        setIsLoading(true);
                        doLogin(accessToken);
                    }
                }
            }
        });
    };

    React.useEffect(() => {
        readAuthSettingsAndLogin();
        if (response?.type === 'success') {
            saveItem(googleAuthDataKeyStore, response);
            readAuthSettingsAndLogin();
        }
    }, [response]);

    return (
        <SafeAreaView>
            <View style={styles.mainWrapper}>
                {isLoading && (
                    <View>
                        <ActivityIndicator size="large" color={Colors.misc.colorPrimary} />
                        <Text style={[styles.textStyle, { textAlign: 'center', fontSize: 18 }]}>
                            Fetching data, please wait...
                        </Text>
                    </View>
                )}
                {!isLoading && (
                    <View style={styles.loginWraper}>
                        <View style={styles.logoWrapper}>
                            <Image resizeMode="contain" source={require('../../assets/images/logo.png')} />
                            <Text style={styles.textStyle}>Welcome to the ByteLion Company Review App</Text>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button
                                color={Colors.misc.colorPrimary}
                                icon={<MaterialCommunityIcons name="google" size={22} color="#FFFFFF" />}
                                textColor="#FFFFFF"
                                disabled={false}
                                text="Sign in with Google"
                                action={() => {
                                    promptAsync();
                                }}
                            />
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginWraper: {
        width: '100%',
    },
    logoWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        fontSize: 15,
        marginTop: 20,
    },
    buttonWrapper: {
        width: '100%',
    },
});
