import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { View, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Button } from '../../components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { saveItem } from '../../helpers/AsynStorage';
import { googleAuthDataKeyStore, googleAuthUserInfoKeyStore } from '../../constants/LocalStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiRequest from '../../services/APIRequest';
import Colors from '../../constants/Colors';
import { googleAutBaseUrl } from '../../constants/Api';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }: any) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '35884054930-aqrlrersduh7n490mdsjqk23hgg1l0l9.apps.googleusercontent.com',
    iosClientId: '35884054930-aqrlrersduh7n490mdsjqk23hgg1l0l9.apps.googleusercontent.com',
    androidClientId: '35884054930-aqrlrersduh7n490mdsjqk23hgg1l0l9.apps.googleusercontent.com',
    webClientId: '35884054930-aqrlrersduh7n490mdsjqk23hgg1l0l9.apps.googleusercontent.com',
  });
  const [isLoading, setIsLoading] = useState(false);

  const doLogin = async (accessToken: any) => {
    if (accessToken) {
      apiRequest(googleAutBaseUrl, {
        url: "userinfo/v2/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response: any) => {
        if (response) {
          setIsLoading(false);
          saveItem(googleAuthUserInfoKeyStore, response);
          navigation.replace("Root");
        }
      }).catch((error: any) => {
        setIsLoading(false);
        //console.log(error.status);
      });
    }
  }

  React.useEffect(() => {
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
    if (response?.type === 'success') {
      const { authentication } = response;
      saveItem(googleAuthDataKeyStore, response);
      navigation.replace("Root");
    }
  }, [response]);

  return (
    <SafeAreaView>
      <View style={styles.mainWrapper}>
        {isLoading && (<View>                       
                        <ActivityIndicator size="large" color={Colors.misc.googleSigninButton} />
                        <Text style={[styles.textStyle, { textAlign: "center", fontSize: 18}]}>Fetching data, please wait...</Text>
                      </View>)}
        {!isLoading && (<View style={styles.loginWraper}>
                          <View style={styles.logoWrapper}>
                            <Image resizeMode="contain" source={require("../../assets/images/logo.png")} />
                            <Text style={styles.textStyle}>Welcome to the ByteLion Company Review App</Text>
                          </View>
                          <View style={styles.buttonWrapper}>
                            <Button
                              color={Colors.misc.googleSigninButton}
                              icon={ <MaterialCommunityIcons name="google" size={22} color="#FFFFFF" />}
                              textColor="#FFFFFF"
                              disabled={false} text="Sign in with Google"
                              action={() => { promptAsync() }}/>
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
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginWraper: {
    width: "100%",
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20
  },
  textStyle: {
    fontSize: 15,
    marginTop: 20
  },
  buttonWrapper: {
    width: "100%"
  }
});
