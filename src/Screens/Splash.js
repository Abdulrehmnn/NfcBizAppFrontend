import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, Linking, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Logo from '../Components/Logo';
import Buttons from '../Components/Buttons';
import Icon from 'react-native-vector-icons/FontAwesome';

const Splash = () => {
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  const navigateToLoginSplash = () => {
    navigation.navigate('Cardsplash');
  };
  const openOrderNowLink = () => {
    Linking.openURL('https://nfcbiz.com/');
  };
  const orderNowButtonRef = useRef(null);
  const startContinuousSwingingAnimation = () => {
    setInterval(() => {
      if (orderNowButtonRef.current) {
        orderNowButtonRef.current.swing(1000);
      }
    }, 2000);
  };
  useEffect(() => {
    startContinuousSwingingAnimation();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../Images/2.gif')} style={{ ...styles.backgroundImage, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <View style={styles.overlay} />
        <Logo source={require('../Images/Logo.png')} style={styles.backgroundImagee} />
        <View style={styles.buttonContainer}>
          <Animatable.View ref={orderNowButtonRef} style={styles.button}>
            <Buttons title="Order Now" textStyle={styles.buttonText} onPress={openOrderNowLink} />
          </Animatable.View>
        </View>
      </ImageBackground>
      <View style={styles.SplashbottomContainer}>
        <Buttons title="SIGN IN" style={{ ...styles.Signin, backgroundColor: "white", height: responsiveHeight(7), width: responsiveWidth(32) }}
          textStyle={{ ...styles.textLogin, color: 'black' }} onPress={navigateToLogin} />
        <Buttons style={{ ...styles.Signin, backgroundColor: "black", width: responsiveWidth(60), height: responsiveHeight(7) }}
          textStyle={{ ...styles.textLogin, color: 'white' }} onPress={navigateToLoginSplash} >
          <View style={styles.buttonContent}>
            <Text style={{ ...styles.textLogin, color: 'white' }}>
              SIGN IN WITH  <Icon name="credit-card" size={16} color="white" style={{ fontSize: responsiveFontSize(1.9) }} />
            </Text>
          </View>
        </Buttons>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.86)',
  },
  button: {
    width: responsiveWidth(27),
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: responsiveHeight(15),
  },
  buttonText: {
    color: 'black',
    fontSize: responsiveFontSize(1.7),
    fontWeight: 'bold',
  },
  backgroundImagee: {
    resizeMode: 'contain',
    height: responsiveHeight(70),
    width: responsiveWidth(100),
    alignSelf: 'center',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  SplashbottomContainer: {
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: "center",
    paddingVertical: 10,
    width: responsiveWidth(100)
  },
  Signin: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "black",
  },
  textLogin: {
    color: "black",
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
  },
});

export default Splash;
