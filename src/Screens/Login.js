import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../Context/AuthContext';
import ShareModal from './ShareModal';

import axios from 'axios';
import { baseUrl } from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Login() {
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();
  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateToSplash = () => {
    navigation.navigate("Splash");
  };
  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };
  const navigateToMainScreen = () => {
    navigation.navigate("MainScreen");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      await AsyncStorage.clear();
      setDisable(true);
      const response = await axios.post(baseUrl + '/auth/signin', {
        email,
        password,
      });
      console.log(response.data);
      if (response.data && response.data.accessToken != null) {
        const user = response.data;
        await AsyncStorage.setItem('token', user.accessToken);
        await AsyncStorage.setItem('id', user.id);
        await AsyncStorage.setItem('name', user.firstName + ' ' + user.lastName);
        await AsyncStorage.setItem('email', user.email);

        signIn(user.accessToken);
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        setError("");
        navigateToMainScreen();
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
      // else if (error.response && error.response.data) {
      //   if (error.response.status === 401) {
      //     // Unauthorized, navigate to login screen
      //     await AsyncStorage.clear();
      //     navigation.navigate('first');
      //   } else {
      //     setError(error.response.data.message);
      //   }
      // }
      else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
      setDisable(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>

      <ImageBackground source={require('../Images/2.gif')} style={{ ...styles.backgroundImage, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
          behavior='height'
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -140}
        >
          <View style={styles.overlay} />
          <Image source={require("../Images/Logo.png")} style={styles.logoImage} resizeMode="contain" />
          <View style={{ marginTop: responsiveHeight(5), padding: 10, width: responsiveWidth(100) }}>
            <Text style={styles.titleText}>Sign In</Text>
            <InputField placeholder="Username" icon="user" onChangeText={(text) => setEmail(text.trim())} disable={disable} />
            <InputField placeholder="Password" secureTextEntry={true} icon="lock" onChangeText={(text) => setPassword(text.trim())} disable={disable} />
            <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => openModal('Forget')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <Text style={{ color: "red", textAlign: "center", fontSize: 12 }}>{error}</Text>
            <View style={styles.signInButtonContainer}>
              <Buttons title="Sign In" style={styles.buttonSign} textStyle={styles.textLogin} onPress={handleLogin} disable={disable} />
            </View>
            <View style={styles.arrowLeftButtonContainer}>
              <Buttons style={styles.arrowLeftButton} onPress={navigateToSplash}>
                <Text><AntDesign name="arrowleft" style={styles.arrowLeftIcon} /></Text>
              </Buttons>
            </View>

          </View>
        </KeyboardAvoidingView>
      </ImageBackground>

      <ShareModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        modalContent={modalContent}
      />
    </View>

  );
}

const styles = StyleSheet.create({
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
  logoImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(13),
    alignSelf: "center",
  },
  titleText: {
    fontSize: responsiveFontSize(2.5),
    color: "white",
    marginVertical: 8,
    alignSelf: "center"
  },
  forgotPasswordLink: {
    marginTop: 2,
    marginLeft: responsiveWidth(8),
  },
  forgotPasswordText: {
    color: "grey",
    fontSize: 16,
  },
  signInButtonContainer: {
    margin: responsiveHeight(2),
    alignSelf: "center",
  },
  arrowLeftButtonContainer: {
    justifyContent: 'center',
    alignItems: "center",
    marginTop: responsiveHeight(6),
  },
  arrowLeftButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#EDC02C"
  },
  arrowLeftIcon: {
    fontSize: responsiveFontSize(3.5),
    color: "white",
  },
  textLogin: {
    color: 'black',
    fontSize: responsiveFontSize(1.9),
  },
  buttonSign: {
    backgroundColor: "#EDC02C",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
