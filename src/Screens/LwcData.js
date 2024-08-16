import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ToastAndroid } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Buttons from '../Components/Buttons';
import { HandlerActionApi, HandlerActionget } from '../Handlers/Handlers';

const LwcData = () => {
    const [actionData, setActionData] = useState(null);
    const [activeData, setActiveData] = useState(null);
    const [reviewLink, setReviewLink] = useState('');
    const [initialReviewLink, setInitialReviewLink] = useState('');
    const [error, setError] = useState('');

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };
    useEffect(() => {
        handlerActionget();
    }, []);

    const handlerActionApi = async () => {
        if (reviewLink.trim() === '' || reviewLink.trim() === initialReviewLink.trim()) {
            setError('Please enter a new or modified review link');
            return;
        }

        const message = await HandlerActionApi(reviewLink, "link");
        console.log(message);
        handlerActionget();
        setError('')
    };

    // const handlerActionget = async () => {
    //     const message = await HandlerActionget();
    //     setActionData(message);

    //     let foundActiveData = null;
    //     message.forEach(item => {
    //         if (item.status === true) {
    //             foundActiveData = item;
    //             setReviewLink(item.action);
    //             setInitialReviewLink(item.action); // Set the initial value when data is loaded
    //             setError('')
    //         }
    //     });

    //     setActiveData(foundActiveData);
    //     console.log(message);
    // };
    const handlerActionget = async () => {
        try {
            const message = await HandlerActionget();

            if (Array.isArray(message)) {
                setActionData(message);

                let foundActiveData = null;
                message.forEach(item => {
                    if (item.status === true) {
                        foundActiveData = item;
                        setReviewLink(item.action);
                        setInitialReviewLink(item.action);
                        setError('');
                    }
                });
                setActiveData(foundActiveData);
            }
            else {
                // Handle the case where message is not an array
                showToast(message);
            }
        } catch (error) {
            // Handle the error from the API call
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View style={{ marginTop: responsiveHeight(4) }}>
            <Text style={{ color: "white", marginBottom: responsiveHeight(0.6), fontSize: 16, marginLeft: responsiveWidth(1) }}>Review link</Text>
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#EDC02C', borderRadius: 10, backgroundColor: 'black', overflow: 'hidden', }}>
                    <TextInput
                        style={{ flex: 1, padding: 10, color: 'white', }}
                        placeholder={"Enter Review link"}
                        placeholderTextColor="grey"
                        value={reviewLink}
                        onChangeText={(text) => setReviewLink(text.trim())}
                    />
                    <Buttons onPress={handlerActionApi}>
                        <Icon name={'checksquare'} size={33} color="grey" style={{ paddingRight: 7, }} />
                    </Buttons>
                </View>
                {error !== '' && (
                    <Text style={{ color: 'red', marginTop: responsiveHeight(1), textAlign: 'center' }}>{error}</Text>
                )}
                {activeData !== null && (
                    <Text style={{ color: "white", fontSize: 16, alignSelf: "center", backgroundColor: "#EDC02C", margin: 10, padding: 10, borderRadius: 10, fontWeight: "bold" }}>count : {activeData.count} </Text>
                )}
                {actionData !== null && actionData.length > 0 && (
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "white", fontSize: 13, width: "80%", textAlign: "left", fontWeight: "bold" }}>Action</Text>
                        <Text style={{ color: "white", fontSize: 13, width: "20%", textAlign: "right", fontWeight: "bold" }}>Count</Text>
                    </View>
                )}
                {Array.isArray(actionData) && actionData.length > 0 && actionData.map((item, index) => (
                    (
                        item.status == false &&
                            <View key={item.action + index} style={{ marginTop: responsiveHeight(2), flexDirection: "row", }}>
                                <Text style={{ color: "white", fontSize: 16, width: "80%", textAlign: "left" }}>{item.action}</Text>
                                <Text style={{ color: "white", fontSize: 16, width: "20%", textAlign: "right" }}>{item.count}</Text>
                            </View>
                    )
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: '1%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LwcData;
