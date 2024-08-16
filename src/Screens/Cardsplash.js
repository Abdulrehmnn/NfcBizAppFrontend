import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ToastAndroid } from 'react-native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import Logo from '../Components/Logo';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { HandlerLoginWithCard } from '../Handlers/Handlers';

const Cardsplash = () => {
    const navigation = useNavigation();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [cardIconPosition, setCardIconPosition] = useState(0);
    const [tagId, setTagId] = useState(null);
    const [scanningStarted, setScanningStarted] = useState(false);
    const [isNfcSupported, setIsNfcSupported] = useState(true);
    const [userdata, setuserdata] = useState("");

    let timeoutId;
    useEffect(() => {
        NfcManager.isSupported()
            .then(supported => setIsNfcSupported(supported))
            .catch(error => setIsNfcSupported(false));
    }, []);

    const navigateToSplash = () => {
        navigation.navigate("Splash");
        clearTimeout(timeoutId);
    };
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };
    const readNdef = async () => {
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            // console.warn('Tag found', tag);
            if (tag && tag.id) {
                const result = await HandlerLoginWithCard(tag.id);
                if (result == true) {
                    setTagId(tag.id);
                }
                else {
                    showToast(result)
                }
                console.log("handler rsult ", result)
                // console.warn('Oops!', tag.id);
            } else {
                setTagId('No Tag ID Found');
            }
        } catch (ex) {
            console.warn('Oops!', ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    };

    useEffect(() => {
        if (!scanningStarted) {
            readNdef();
            setScanningStarted(true);
        }

        const interval = setInterval(() => {
            if (loadingProgress < 70) {
                setLoadingProgress(loadingProgress + 1);
            } else if (loadingProgress === 70 && !tagId) {
            } else if (loadingProgress < 100) {
                setLoadingProgress(loadingProgress + 1);
            }
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }, [loadingProgress, scanningStarted, tagId]);

    useEffect(() => {
        if (loadingProgress === 100) {
            timeoutId = setTimeout(() => {
                navigation.navigate("CardScreen");
            }, 500);
        } else if (!isNfcSupported && loadingProgress >= 50) {
            timeoutId = setTimeout(() => {
                navigation.navigate("Splash");
            }, 5000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [loadingProgress, isNfcSupported]);

    useEffect(() => {
        const calculatedPosition = (loadingProgress / 100) * responsiveWidth(49);
        setCardIconPosition(calculatedPosition);
    }, [loadingProgress]);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../Images/2.gif')} style={{ ...styles.backgroundImagee, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <View style={styles.overlay} />

                <View style={{ marginTop: responsiveHeight(3) }}>
                    <TouchableOpacity onPress={navigateToSplash} style={{ marginLeft: responsiveWidth(5) }}>
                        <Icon name="arrowleft" size={responsiveFontSize(4)} color="white" />
                    </TouchableOpacity>
                </View>
                <Logo source={require('../Images/Logo.png')} style={styles.backgroundImage} />
                <Image source={require('../Images/fr.png')} style={{ alignSelf: "center", marginTop: responsiveHeight(4) }} />
                <Text style={{ color: "white", fontSize: responsiveFontSize(2.2), alignSelf: "center", marginTop: responsiveHeight(2) }}>Please Tap or Scan your</Text>
                <Text style={{ color: "white", fontSize: responsiveFontSize(2.2), alignSelf: "center" }}>NFC card!</Text>
                {isNfcSupported ? (
                    <View>
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBarContainer}>
                                <Progress.Bar progress={loadingProgress / 100} width={responsiveWidth(55)} height={responsiveHeight(3)} borderRadius={20} borderWidth={2} borderColor='#EDC02C' color='#EDC02C' />
                                <Text style={styles.loadingText}>{loadingProgress}%</Text>
                            </View>
                            <Icon name="mobile1" size={responsiveFontSize(3)} color="white" style={styles.mobileIcon} />
                            <View style={[styles.cardIconContainer, { left: cardIconPosition }]}>
                                <Icon name="creditcard" size={responsiveFontSize(3)} color="white" />
                            </View>
                        </View>
                        <View>
                            {loadingProgress === 70 && (
                                <Text style={{ color: "black" }}>Tag ID: {tagId}</Text>
                            )}
                        </View>
                    </View>

                ) : (
                    <View style={styles.nfcNotSupportedContainer}>
                        <Text style={styles.nfcNotSupportedText}>Your mobile does not support NFC.</Text>
                    </View>
                )}
            </ImageBackground>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    backgroundImagee: {
        flex: 1,
        resizeMode: 'cover',
        height: responsiveHeight(100),
        width: responsiveWidth(100),
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.86)',
    },
    backgroundImage: {
        resizeMode: 'contain',
        height: responsiveHeight(25),
        width: responsiveWidth(60),
        alignSelf: 'center',
    },
    progressContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(4),
    },
    cardIconContainer: {
        position: 'absolute',
        top: -responsiveHeight(3.2),
    },
    mobileIcon: {
        marginLeft: responsiveWidth(2),
    },
    progressBarContainer: {
        position: 'relative',
    },
    loadingText: {
        position: 'absolute',
        color: 'white',
        fontSize: 16,
        alignSelf: "center",
        top: responsiveHeight(0.3),
    },
    nfcNotSupportedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nfcNotSupportedText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
    },
});

export default Cardsplash;
