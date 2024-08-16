import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { inputFields } from '../data';
const SalonInputs = () => {
    const [profileImage, setProfileImage] = useState(null);
    const inputStates = {};
    inputFields.forEach((field) => (inputStates[field.state] = useState('')));

    const selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image) => {
            setProfileImage(image.path);
        });
    };

    const saveProfile = () => {
        const profileData = {};
    
        inputFields.forEach((field) => {
            const stateValue = inputStates[field.state][0];
            profileData[field.state] = stateValue;
        });
    
        console.log("Profile Data:", profileData);
        };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: "black" }}>
                <View style={{ marginTop: responsiveHeight(6) }}>
                    {profileImage && <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center" }} />}
                    <TouchableOpacity onPress={selectImage} style={{ marginTop: 10, alignSelf: "center" }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Upload Profile Image</Text>
                    </TouchableOpacity>
                </View>
                {inputFields.map((field, index) => (
                    <View key={index}>
                        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6), color: "white" }}>{field.label}</Text>
                        <View style={{ paddingHorizontal: 20 }}>
                            <TextInput
                                style={{
                                    width: '100%',
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    padding: 10,
                                    borderRadius: 5,
                                    borderRadius: 10,
                                    paddingHorizontal: 20,
                                }}
                                value={inputStates[field.state][0]}
                                placeholder={field.placeholder}
                                placeholderTextColor={"grey"}
                                onChangeText={(text) => inputStates[field.state][1](text)}
                            />
                        </View>
                    </View>
                ))}
                <TouchableOpacity style={{ alignSelf: "center", backgroundColor: "white", marginTop: responsiveHeight(4), width: "100%", alignItems: "center", padding: 10 }}>
                    <Text style={{ fontSize: 20, color: "black" }} onPress={saveProfile}> Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SalonInputs;
