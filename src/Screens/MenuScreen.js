import React, { useState, useContext, useEffect } from 'react';
import { View, ImageBackground, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Buttons from '../Components/Buttons';
import ShareModal from './ShareModal';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LwcData from './LwcData';
import MainScreen from './MainScreen';

const MenuScreen = () => {
    const { signOut } = useContext(AuthContext);

    const navigation = useNavigation();
    const [modalContent, setModalContent] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');

    const navigateToMainScreen = () => {
        navigation.navigate('MainScreen');
    };
    const openModal = (content) => {
        setModalContent(content);
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };
    const handleSignOut = async () => {
        await signOut();
        navigation.navigate('Splash');
        await AsyncStorage.clear();
    };
    const getUserName = async () => {
        const name = await AsyncStorage.getItem('name');
        setFirstName(name);
    };
    const getEmail = async () => {
        const Email = await AsyncStorage.getItem('email');
        setEmail(Email);
    };

    useEffect(() => {
        const updateUserInfo = () => {
            getUserName();
            getEmail();
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
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../Images/2.gif')} style={styles.MenubackgroundImage}>
                <View style={styles.overlay} />
                <View style={styles.userContainer}>
                    <View style={{ backgroundColor: 'white', width: responsiveWidth(22), height: responsiveWidth(22), alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(20), alignSelf: 'center', elevation: 5 }}>
                        <Text><Icon name="user" style={{ fontSize: responsiveFontSize(7.6), color: 'black' }} /></Text>
                    </View>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.userName}>{FirstName}</Text>
                        <Text style={styles.userEmail}>{Email}</Text>
                    </View>
                    <View style={{ width: "92%" }}>
                        <View style={styles.buttonsContainer}>
                            <Buttons isButton onPress={() => openModal('Newpass')} icon={<FontAwesome6 name="lock" style={styles.buttonIcon} />} text="Change Password" />
                            <Buttons isButton onPress={() => openModal('support')} icon={<AntDesign name="exclamationcircle" style={styles.buttonIcon} />} text="Support" />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: "center" }}>
                            <Buttons isButton icon={<AntDesign name="arrowleft" style={styles.buttonIcon} />} text="Log out" onPress={handleSignOut} />
                        </View>
                    </View>
                    <View style={styles.arrowLeftButtonContainer}>
                        <Buttons style={styles.arrowLeftButton} onPress={navigateToMainScreen}>
                            <Text><AntDesign name="arrowleft" style={styles.arrowLeftIcon} /></Text>
                        </Buttons>
                    </View>
                </View>
            </ImageBackground>
            <ShareModal
                isVisible={isModalVisible}
                closeModal={closeModal}
                modalContent={modalContent}

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
    },
    MenubackgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.86)',
    },
    userContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    userInfoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    userName: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15,
    },
    userEmail: {
        color: "grey",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 7,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "2%",
    },
    buttonIcon: {
        fontSize: 25,
        color: "#EDC02C",
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
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowLeftIcon: {
        fontSize: 35,
        color: "white",
    },
});

export default MenuScreen;
