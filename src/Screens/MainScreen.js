import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, BackHandler, FlatList, Animated, ToastAndroid, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MainHeader from '../Components/MainHeader';
import { Categories } from '../Components/data';
import Buttons from '../Components/Buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ShareModal from './ShareModal';
import Details from './Details';
import { baseUrl } from '../Config';
import { HandlerActionApi } from '../Handlers/Handlers';
import LwcData from './LwcData';
import LoadingIndicator from '../Context/LoadingIndicator';
import CardScreen from './CardScreen';

const MainScreen = () => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [data, setData] = useState({});
    const [firstName, setFirstName] = useState('');
    const [selectedSocialLink, setSelectedSocialLink] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(false);
    const [selectedWebsite, setSelectedWebsite] = useState(false);
    const [selectedLinkedTree, setSelectedLinkedTree] = useState(false);
    const [loading, setLoading] = useState(true);

    const CardHandler = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const id = await AsyncStorage.getItem('id');
            const response = await axios.post(baseUrl + '/card', {
                "id": id,
            }, {
                headers: {
                    "x-access-token": token
                }
            });
            console.log(response.data);
            await AsyncStorage.setItem('cardId', response.data._id);
            setData(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.status === 401) {
                    await AsyncStorage.clear();
                    navigation.navigate('Splash');
                } else {
                    setError(error.response.data.message);
                }
            }
            return error.message;
        }
    };
    const handlerConformation = async (link, type) => {
        Alert.alert(
            'Confirm change action',
            'Do you really want to change card Action ?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        const message = await HandlerActionApi(link, type);
                        console.log(message);
                    }
                },
            ],
            { cancelable: false }
        );
    };
    const showToast = () => {
        ToastAndroid.show('Data Saved !!', ToastAndroid.SHORT);
    };
    useEffect(() => {
        CardHandler();
        getUserName();
    }, []);
    const getUserName = async () => {
        const name = await AsyncStorage.getItem('name');
        setFirstName(name);
    };
    const openModal = (content) => {
        setModalContent(content);
        setModalVisible(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                await CardHandler();
                await getUserName();
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };

    const toggleDetails = () => {
        setShowNew(false);
        setShowDetails(!showDetails);
    };

    // const toggleNew = () => {
    //     setShowDetails(false);
    //     setShowNew(!showNew);
    // };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (showDetails || showNew) {
                setShowDetails(false);
                setShowNew(false);
                return true;
            } else {
                return false;
            }
        });

        return () => backHandler.remove();
    }, [showDetails, showNew]);
    const renderCategories = () => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
                {data.socials &&
                    data.socials.map((social, index) => (
                        <Buttons
                            style={[
                                styles.categoryButton,
                                {
                                    backgroundColor:
                                        selectedSocialLink === social.link ? "#EDC02C" : "black",
                                    marginRight: 10,
                                },
                            ]}
                            onPress={() => {
                                setSelectedSocialLink(social.link);
                                setSelectedDoc(false);
                                setSelectedWebsite(false);
                                setSelectedLinkedTree(false);
                                handlerConformation(social.link, "link");
                            }}
                        >
                            <View key={`social_${index}`}>
                                <FontAwesome name={social.platform} style={styles.categoryIcon} />
                            </View>
                        </Buttons>
                    ))}
                {data.doc && (
                    <Buttons
                        style={[
                            styles.categoryButton,
                            {
                                backgroundColor: selectedDoc ? "#EDC02C" : "black",
                                marginRight: 10,
                            },
                        ]}
                        onPress={() => {
                            setSelectedDoc(true);
                            setSelectedSocialLink(null);
                            setSelectedWebsite(false);
                            setSelectedLinkedTree(false);
                            handlerConformation(data.doc, "link");
                        }}
                    >
                        <View>
                            <FontAwesome name="file-text" style={styles.categoryIcon} />
                        </View>
                    </Buttons>
                )}
                {data.website && (
                    <Buttons
                        style={[
                            styles.categoryButton,
                            {
                                backgroundColor: selectedWebsite ? "#EDC02C" : "black",
                                marginRight: 10,
                            },
                        ]}
                        onPress={() => {
                            setSelectedWebsite(true);
                            setSelectedSocialLink(null);
                            setSelectedDoc(false);
                            setSelectedLinkedTree(false);
                            handlerConformation(data.website, "link");
                        }}
                    >
                        <View>
                            <FontAwesome name="globe" style={styles.categoryIcon} />
                        </View>
                    </Buttons>
                )}
                {data.linkedtree && (
                    <Buttons
                        style={[
                            styles.categoryButton,
                            {
                                backgroundColor: selectedLinkedTree ? "#EDC02C" : "black",
                                marginRight: 10,
                            },
                        ]}
                        onPress={() => {
                            setSelectedLinkedTree(true);
                            setSelectedSocialLink(null);
                            setSelectedDoc(false);
                            setSelectedWebsite(false);
                            handlerConformation(data.linkedtree, "link");
                        }}
                    >
                        <View>
                            <FontAwesome name="link" style={styles.categoryIcon} />
                        </View>
                    </Buttons>
                )}
            </View>
        </ScrollView>
    );


    const navigateToMenuScreen = () => navigation.navigate('MenuScreen');
    const navigateToTempt = () => navigation.navigate('Tempt');

    const imageContainerStyle = {
        transform: [
            {
                translateY: scrollY.interpolate({
                    inputRange: [0, responsiveHeight(27)],
                    outputRange: [0, -responsiveHeight(27)],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };
    const renderBackgroundImage = () => {
        if (data.cardType === 'pvc') {
            return (
                <Image
                    source={require('../Images/CardImages/pvc1.png')}
                    style={styles.logoImage}
                />
            );
        } else if (data.cardType === 'review') {
            return (
                <Image
                    source={require('../Images/CardImages/front.png')}

                    style={styles.logoImage}
                />
            );
        }
        else if (data.cardType === 'mobile') {
            return (
                <Image
                    // source={require('../Images/mainScreenLogo.png')}
                    source={require('../Images/CardImages/mobile.png')}

                    style={styles.logoImage}
                />
            );
        }
        else if (data.cardType === 'metal') {
            return (
                <Image
                    // source={require('../Images/mainScreenLogo.png')}
                    source={require('../Images/CardImages/metal.png')}

                    style={styles.logoImage}
                />
            );
        }
    };
    const renderMainContent = () => {
        if (showDetails) {
            return (
                <Details
                    linktreeData={data.linkedtree ? [data.linkedtree] : []}
                    cvData={data.doc ? [data.doc] : []}
                    socialLinksData={data.socials ? data.socials : []}
                    websiteData={data.website ? [data.website] : []}
                    connectionsData={data.connections || []}
                />
            );
        } else if (data.cardType === 'review') {
            return <LwcData />;
        } else {
            return (
                <View style={styles.actionsContainer}>
                    <View style={styles.categoriesContainer}>
                        <Text style={styles.categoriesTitle}>Actions</Text>
                        {renderCategories()}
                    </View>
                    <View style={styles.buttonRowsContainer}>
                        <View style={styles.buttonRow}>
                            <Buttons isButton onPress={() => openModal('link')} icon={<MaterialCommunityIcons name="family-tree" style={styles.buttonIcon} />} text="Link Tree" />
                            <Buttons isButton onPress={() => openModal('cv')} icon={<MaterialCommunityIcons name="file-document-outline" style={styles.buttonIcon} />} text="CV/Portfolio" />
                        </View>
                        <View style={styles.buttonRow}>
                            <Buttons isButton onPress={() => openModal('Social')} icon={<FontAwesome5 name="link" style={styles.buttonIcon} />} text="Social Links" />
                            <Buttons isButton onPress={() => openModal('website')} icon={<MaterialCommunityIcons name="web" style={styles.buttonIcon} />} text="Website" />
                        </View>
                        <View style={styles.buttonRow}>
                            {/* <Buttons isButton onPress={() => openModal('Connection')} icon={<AntDesign name="wifi" style={styles.buttonIcon} />} text="Connections" /> */}
                            <Buttons isButton icon={<AntDesign name="eye" style={styles.buttonIcon} />} text="Details" onPress={toggleDetails} />
                            <Buttons isButton onPress={navigateToTempt} icon={<Entypo name="documents" style={styles.buttonIcon} />} text="Templates" />

                        </View>
                        {/* <View style={{ alignItems: "center" }}>
                            <Buttons isButton onPress={navigateToTempt} icon={<Entypo name="documents" style={styles.buttonIcon} />} text="Templates" />
                        </View> */}
                    </View>
                </View>
            );
        }
    };
    if (loading) {
        return <LoadingIndicator />;
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MainHeader menuIconName="menu" logoSource={require('../Images/5.png')} />
            </View>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <Animated.View style={imageContainerStyle}>
                    <View style={styles.imageContainer}>
                        {renderBackgroundImage()}
                    </View>
                    <View style={styles.iconContainer}>
                        <Buttons style={[styles.smallIcon, { elevation: 5 }]} onPress={() => openModal('qrCode')} >
                            <Icon name="share-alt" style={styles.icon} />
                        </Buttons>
                        <Buttons style={[styles.smallIcon, { elevation: 5 }]} onPress={() => openModal('support')} >
                            <Icon name="exclamation" style={styles.icon} />
                        </Buttons>
                    </View>
                </Animated.View>
                <View style={{ bottom: responsiveHeight(7) }}>
                    <View style={{ backgroundColor: 'white', width: responsiveWidth(22), height: responsiveWidth(22), alignItems: 'center', justifyContent: 'center', borderRadius: responsiveWidth(20), alignSelf: 'center', elevation: 5 }}>
                        <Buttons onPress={navigateToMenuScreen}>
                            <Icon name="user" style={{ fontSize: responsiveFontSize(7.6), color: 'black' }} />
                        </Buttons>
                    </View>
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', margin: 10, fontFamily: 'sans-serif' }}>
                        <Text style={{ color: 'white', fontSize: responsiveFontSize(2), fontWeight: 'bold', alignSelf: 'center', margin: 10, fontFamily: 'sans-serif' }}>
                            {firstName}
                        </Text>
                    </Text>
                </View>
                {showDetails && (
                    <View style={styles.detailsIconContainer}>
                        <Buttons style={styles.smallIcon} onPress={toggleDetails}>
                            <Icon name="arrow-left" style={styles.icon} />
                        </Buttons>
                    </View>
                )}
                <View style={styles.contentContainer}>
                    {renderMainContent()}

                </View>
            </Animated.ScrollView>
            <ShareModal
                isVisible={isModalVisible}
                closeModal={closeModal}
                modalContent={modalContent}
                Data={data}
                CardHandler={CardHandler}
                showToast={showToast}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: "center",
        marginTop: 5,
        width: responsiveWidth(92),
        alignSelf: 'center',
        borderRadius: responsiveWidth(2),
        overflow: "hidden",
    },
    logoImage: {
        width: responsiveWidth(92),
        height: responsiveHeight(27),
    },
    iconContainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: responsiveHeight(1.3),
        right: responsiveWidth(6),
    },
    smallIcon: {
        backgroundColor: '#EBEBEB',
        borderRadius: responsiveWidth(5),
        width: responsiveWidth(6.7),
        height: responsiveWidth(6.7),
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
    },
    icon: {
        fontSize: responsiveFontSize(2),
        color: 'black',
    },
    bottomContainer: {
        bottom: responsiveHeight(7),
    },
    userIconContainer: {
        backgroundColor: 'white',
        width: responsiveWidth(22),
        height: responsiveWidth(22),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsiveWidth(20),
        alignSelf: 'center',
        elevation: 5,
    },
    userIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userIconImage: {
        fontSize: responsiveFontSize(7.6),
        color: 'black',
    },
    userNameText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 10,
        fontFamily: 'sans-serif',
    },
    detailsIconContainer: {
        position: "absolute",
        top: responsiveHeight(1),
        left: responsiveWidth(5),
    },
    contentContainer: {
        flex: 1,
        bottom: responsiveHeight(7),
        width: '92%',
        alignSelf: 'center',
    },
    actionsContainer: {
        width: "100%",
        flex: 1,
    },
    categoriesContainer: {
        flexDirection: 'column',
        backgroundColor: "#202020",
        borderRadius: 10,
        width: "100%",
        marginBottom: 6,
        borderWidth: 2,
        borderColor: '#202020',
        padding: 10,
    },
    categoriesTitle: {
        color: "white",
        marginLeft: 3,
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    categoryButton: {
        backgroundColor: "black",
        height: responsiveHeight(6),
        alignItems: "center",
        justifyContent: 'center',
        width: responsiveWidth(12),
        borderRadius: 5,
    },
    categoryIcon: {
        fontSize: responsiveFontSize(3),
        color: "white",
    },
    buttonRowsContainer: {
        flexGrow: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonIcon: {
        fontSize: 25,
        color: "#EDC02C",
    },
});

export default MainScreen;





// const formateData = () => {
//     let data = {
//         doc: "aaaa",
//         website: "aaaa",
//         linkedtree: "aaaa",
//     }
//     social.map(() => {
//         data."abc"
//     })

// }
// let data = {
//     doc: "aaaa",
//     website: "aaaa",
//     linkedtree: "aaaa",
//     socail: [
//         { platform: "abc", link: "abc" },
//         { platform: "abc", link: "abc" },
//         { platform: "abc", link: "abc" },
//         { platform: "abc", link: "abc" },
//         { platform: "abc", link: "abc" },
//     ]
// }
// let data = {
//     doc: "aaaa",
//     website: "aaaa",
//     linkedtree: "aaaa",
//     platform: link,
//     platform: link,
//     platform: link,
//     platform: link,
// }