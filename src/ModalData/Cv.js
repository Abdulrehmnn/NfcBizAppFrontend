import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import { HandlerUpdateDoc } from '../Handlers/Handlers';

const Cv = ({ closeModal, cvData, CardHandler, showToast }) => {
    const [CvInput, setCvInput] = useState(cvData || '');
    const [isInputChanged, setIsInputChanged] = useState(false);

    useEffect(() => {
        setIsInputChanged(CvInput !== cvData);
    }, [CvInput, cvData]);
    const handlerUpdateDoc = async () => {
        console.log(CvInput);
        const message = await HandlerUpdateDoc(CvInput);
        console.log(message);
        closeModal();
        CardHandler();
        showToast(message);
    };

    return (
        <View>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(3) }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>CV/Portfolio</Text>
                    <Buttons style={styles.closeButton} onPress={closeModal}>
                        <AntDesign name="close" style={{ color: 'white', fontSize: 20 }} />
                    </Buttons>
                </View>
                <InputField
                    isButton
                    placeholder={'mycv.pdf'}
                    placeholderTextColor={'#696969'}
                    style={styles.inputField}
                    value={CvInput}
                    onChangeText={(text) => setCvInput(text.trim())}
                />
                <Buttons
                    title="Add"
                    style={[styles.button, !isInputChanged && styles.disabledButton]}
                    textStyle={styles.buttonText}
                    onPress={isInputChanged ? handlerUpdateDoc : null}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 39,
        backgroundColor: '#1F1F1F',
        paddingHorizontal: 10,
        marginBottom: 10,
        color: 'white',
    },
    button: {
        alignSelf: 'center',
        width: '23%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 2,
        marginTop: 12,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Cv;
