import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import InputField from '../InputField';

const MenuInputs = () => {
    const [Title, setTitle] = useState('');
    const [Service1, setService1] = useState('');
    const [Service2, setService2] = useState('');
    const [Link1, setLink1] = useState('');
    const [Link2, setLink2] = useState('');
    const [aboutHeading, setAboutHeading] = useState('');
    const [aboutDescription, setAboutDescription] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [facebook, setFacebook] = useState('');
    const [youtube, setYoutube] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [twitter, setTwitter] = useState('');

    const saveProfile = () => {
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: "black" }}>
                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>Title - Menu </Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <InputField isButton style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        value={Title}
                        placeholder='Enter Title - Heading '
                        placeholderTextColor={"grey"}
                        onChangeText={(text) => setTitle(text)}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>Item Category 1- Title </Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter Item Category 1'
                        placeholderTextColor={"grey"}
                        value={Service1}
                        onChangeText={(text) => setService1(text)}
                    />
                </View>
                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>Service 2  </Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter Service 2'
                        placeholderTextColor={"grey"}
                        value={Service2}
                        onChangeText={(text) => setService2(text)}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>Link 1 - Link Text</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20, }}
                        placeholder='Enter Link 1'
                        placeholderTextColor={"grey"}
                        value={Link1}
                        onChangeText={(text) => setLink1(text)}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>Link 2 - Link Text</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20, }}
                        placeholder='Enter Link 2'
                        placeholderTextColor={"grey"}
                        value={Link2}
                        onChangeText={(text) => setLink2(text)}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>About us - Heading</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter about'
                        placeholderTextColor={"grey"}
                        value={aboutHeading}
                        onChangeText={(text) => setAboutHeading(text)}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>About us - Description</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20, height: 100, textAlignVertical: 'top' }}
                        placeholder='Enter Description'
                        placeholderTextColor={"grey"}
                        value={aboutDescription}
                        onChangeText={(text) => setAboutDescription(text)}
                        multiline={true}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>Instagram</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter instagram'
                        placeholderTextColor={"grey"}
                        value={instagram}
                        onChangeText={(text) => setInstagram(text)}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>LinkedIn</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter linkedin'
                        placeholderTextColor={"grey"}
                        value={linkedin}
                        onChangeText={(text) => setLinkedin(text)}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>WhatsApp</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter linkedin'
                        placeholderTextColor={"grey"}
                        value={whatsapp}
                        onChangeText={(text) => setWhatsapp(text)}
                    />
                </View>


                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>Facebook</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter facebook'
                        placeholderTextColor={"grey"}
                        value={facebook}
                        onChangeText={(text) => setFacebook(text)}
                    />
                </View>


                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>YouTube</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter youtube'
                        placeholderTextColor={"grey"}
                        value={youtube}
                        onChangeText={(text) => setYoutube(text)}
                    />
                </View>

                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>TikTok</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter tiktok'
                        placeholderTextColor={"grey"}
                        value={tiktok}
                        onChangeText={(text) => setTiktok(text)}
                    />
                </View>


                <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6) }}>Twitter</Text>
                <View style={{ paddingHorizontal: 20 }}>
                    <TextInput
                        style={{ width: '100%', borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
                        placeholder='Enter twitter'
                        placeholderTextColor={"grey"}
                        value={twitter}
                        onChangeText={(text) => setTwitter(text)}
                    />
                </View>
                <TouchableOpacity style={{ alignSelf: "center", backgroundColor: "white", marginTop: responsiveHeight(4), width: "100%", alignItems: "center", padding: 10 }}>
                    <Text style={{ fontSize: 20, color: "black", }}> Save</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

export default MenuInputs;
