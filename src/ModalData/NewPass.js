import React, { useState } from 'react';
import { View, Text, StyleSheet ,ToastAndroid} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import { HandlerChangePass } from '../Handlers/Handlers';

const NewPass = ({ closeModal }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [error, setError] = useState('');
    const [incorect, setincorect] = useState('');

    const showToast = () => {
        ToastAndroid.show("Password changed successfully!",ToastAndroid.SHORT);
    };
    const handlerChangePass = async () => {
        if (!oldPassword) {
            setError("Please enter the old password");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        const message = await HandlerChangePass(oldPassword, newPassword);
        if (message == true) {
            setincorect("");
            closeModal();
            showToast();
        }
        else {
            setincorect(message)
            console.log(message)
        }
    };

    return (
        <View>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(3) }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>Change Password</Text>
                    <Buttons style={styles.closeButton} onPress={closeModal}>
                        <AntDesign name="close" style={{ color: 'white', fontSize: 20 }} />
                    </Buttons>
                </View>
                <View>
                    <Text style={styles.label}>Old Password</Text>
                    <InputField
                        isButton
                        placeholder={'Enter Old Password'}
                        placeholderTextColor={'#696969'}
                        style={styles.inputField}
                        value={oldPassword}
                        onChangeText={(text) => {
                            setOldPassword(text.trim());
                            setError('');
                        }}
                    />
                    {{ incorect } ? <Text style={{ color: 'red' }}>{incorect}</Text> : null}

                </View>
                <View>
                    <Text style={styles.label}>New Password</Text>
                    <InputField
                        isButton
                        placeholder={'Enter New Password'}
                        placeholderTextColor={'#696969'}
                        style={styles.inputField}
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text.trim())}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Confirm Password</Text>
                    <InputField
                        isButton
                        placeholder={'Confirm New Password'}
                        placeholderTextColor={'#696969'}
                        style={styles.inputField}
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text.trim());
                            setError('');
                        }}
                    />
                </View>
                {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
                <Buttons
                    title="Confirm"
                    style={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={handlerChangePass}
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
    label: {
        color: 'white',
        fontSize: 13,
        marginBottom: 8,
        marginLeft: 2,
    },
    button: {
        alignSelf: 'center',
        width: '24%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 2,
        marginTop: 12,
        padding: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default NewPass;