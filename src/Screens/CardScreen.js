import React, { useEffect, useState ,useContext} from 'react';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import InputField from "../Components/InputField";
import Buttons from "../Components/Buttons";
import { Text, View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../Config';
import ShareModal from './ShareModal';
import { AuthContext } from '../Context/AuthContext';

const CardScreen = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [userId, setuserId] = useState('');
    const [password, setpassword] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const { signIn } = useContext(AuthContext);

    const navigateToMainScreen = () => {
        navigation.navigate("MainScreen");
    };
    const getUserName = async () => {
        const name = await AsyncStorage.getItem('name');
        const id = await AsyncStorage.getItem('id');
        const email = await AsyncStorage.getItem('email');

        console.log(name);
        setFirstName(name);
        setuserId(id)
    };
    const openModal = (content) => {
        setModalContent(content);
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };
    // const HandlerLoginWithCard2 = (password, userId) => {
    //     console.log("handler Running");      
    //     axios.post(baseUrl + '/auth/cardIn', {
    //       password: password,
    //       userId: userId
    //     })
    //       .then(async (response) => {
    //         console.log("jhjjj", response.data);
    //         if (response.data && response.data.accessToken != null) {
    //           const user = response.data;
    //           await AsyncStorage.setItem('token', user.accessToken);
    //           signIn(user.accessToken);
    //           const token = await AsyncStorage.getItem('token');
    //           console.log(token);
    //           setError("");
    //           navigateToMainScreen();
    //         } else {
    //           setError("Invalid credentials");
    //         }
    //       })
    //       .catch((error) => {
    //         console.log("hhbb", error.message)
    //       });
    //   };
    const HandlerLoginWithCard2 = async () => {
        try {
            //   await AsyncStorage.clear();
            //   setDisable(true);
            const response = await axios.post(baseUrl + '/auth/cardIn', {
                userId,
                password,
            });
            console.log(response.data);
            if (response.data) {
                const user = response.data;
                await AsyncStorage.setItem('token', user.accessToken);
                await AsyncStorage.setItem('id', user.id);
                await AsyncStorage.setItem('email', user.email);

                // signIn(user.accessToken); 
                signIn(user.accessToken);
                const token = await AsyncStorage.getItem('token');
                console.log(token);
                // setError("");
                navigateToMainScreen();
            } else {
                setError("Invalid credentials");
            }
        } catch (error) {
            console.error('Login failed', error);
            //   if (error.response && error.response.data) {
            //     setError(error.response.data.message);
            //   } else {
            //     setError('Login failed');
            //   }
        } finally {
            //   setDisable(false);
        }
    };
    // useEffect(() => {
    //     getUserName();
    // }, []);
    useEffect(() => {
        const updateUserInfo = () => {
            getUserName();
        };

        // Add an event listener for the 'focus' event
        const unsubscribeFocus = navigation.addListener('focus', () => {
            updateUserInfo();
        });

        // Clean up the event listener when the component is unmounted
        return () => {
            unsubscribeFocus();
        };
    }, [navigation]);
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <ImageBackground source={require('../Images/2.gif')} style={{ ...styles.backgroundImage, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    behavior='height'
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -140}
                >
                    <View style={styles.overlay} />
                    <View style={{ marginBottom: responsiveHeight(10) }}>
                        <Image source={require("../Images/Logo.png")} style={styles.logoImage} resizeMode="contain" />
                        <View style={{ marginVertical: 10 * 2, marginTop: responsiveHeight(10) }}>
                            <View style={styles.inputContainer}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.welheading}>Welcome back</Text>
                                    <Text style={styles.harheading}>{firstName}</Text>
                                </View>
                                <Text style={styles.subHeading}>Please enter your password to proceed</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <InputField placeholder="Password" secureTextEntry={true} icon="lock" onChangeText={(text) => setpassword(text.trim())} />
                            </View>
                            <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => openModal('Forget')}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signInButtonContainer}>
                            <Buttons title="Sign In" style={styles.buttonSign} textStyle={styles.textLogin} onPress={(() => HandlerLoginWithCard2(userId, password))} />
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
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
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
    logoImage: {
        width: responsiveWidth(90),
        height: responsiveHeight(13),
        alignSelf: "center",
    },
    textLogin: {
        color: 'black',
        fontSize: responsiveFontSize(1.7),
    },
    buttonSign: {
        backgroundColor: "#EDC02C",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasswordLink: {
        marginTop: 2,
        marginLeft: responsiveWidth(8),
        alignSelf: "flex-start",
    },
    signInButtonContainer: {
        alignSelf: "center",
    },
    forgotPasswordText: {
        color: "grey",
        fontSize: responsiveFontSize(2),
    },
    inputContainer: {
        marginTop: "1%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        alignItems: 'center',
    },
    harheading: {
        fontSize: responsiveFontSize(2.6),
        fontWeight: 'bold',
        color: 'white',
    },
    welheading: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'white',
    },
    subHeading: {
        color: 'white',
        alignSelf: "center",
        marginTop: 20
    },
});

export default CardScreen;




// import React from 'react';
// import { Text, View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
// import InputField from '../Components/InputField';
// import Buttons from '../Components/Buttons';
// import { useNavigation } from "@react-navigation/native";

// function Login() {
//     const navigation = useNavigation();

//     const navigateToSplash = () => {
//         navigation.navigate("Splash");
//     };

//     const navigateToMainScreen = () => {
//         navigation.navigate("MainScreen");
//     };

//     return (
// <View style={{ flex: 1, backgroundColor: "black" }}>
//     <ImageBackground source={require('../Images/2.gif')} style={{ ...styles.backgroundImage, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
//         <KeyboardAvoidingView
//             style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//             behavior='height'
//             keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -140}
//         >
//             <View style={styles.overlay} />
//             <Image source={require("../Images/Logo.png")} style={styles.logoImage} resizeMode="contain" />
//                     <View style={{ marginTop: responsiveHeight(5), padding: 10, width: responsiveWidth(100) }}>
//                         <View style={styles.inputContainer}>
//                             <View style={styles.textContainer}>
//                                 <Text style={styles.welheading}>Welcome back</Text>
//                                 <Text style={styles.harheading}>Harry</Text>
//                             </View>
//                             <Text style={styles.subHeading}>Please enter your password to proceed</Text>
//                         </View>
//                         <InputField placeholder="Password" secureTextEntry={true} icon="lock" />
//                         <TouchableOpacity style={styles.forgotPasswordLink}>
//                             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//                         </TouchableOpacity>
//                         <View style={styles.signInButtonContainer}>
//                             <Buttons title="Sign In" style={styles.buttonSign} textStyle={styles.textLogin} onPress={navigateToMainScreen} />
//                         </View>
//                     </View>
//                 </KeyboardAvoidingView>
//             </ImageBackground>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
// backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     height: responsiveHeight(100),
//     width: responsiveWidth(100),
// },
// overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.86)',
// },
// logoImage: {
//     width: responsiveWidth(90),
//     height: responsiveHeight(13),
//     alignSelf: "center",
// },
//     forgotPasswordLink: {
//         marginTop: 2,
//         marginLeft: responsiveWidth(8),
//     },
//     forgotPasswordText: {
//         color: "grey",
//         fontSize: 16,
//     },
//     signInButtonContainer: {
//         margin: responsiveHeight(2),
//         alignSelf: "center",
//     },
//     textLogin: {
//         color: 'black',
//         fontSize: responsiveFontSize(1.9),
//     },
//     buttonSign: {
//         backgroundColor: "#EDC02C",
//         borderRadius: 8,
//         paddingVertical: 5,
//         paddingHorizontal: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     inputContainer: {
//         marginTop: "1%",
//         width: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     textContainer: {
//         alignItems: 'center',
//     },
//     harheading: {
//         fontSize: responsiveFontSize(2.6),
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     welheading: {
//         fontSize: responsiveFontSize(2),
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     subHeading: {
//         color: 'white',
//         alignSelf: "center",
//         marginTop: 20
//     },
// });

// export default Login;
