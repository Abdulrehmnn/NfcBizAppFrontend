import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const CvInputs = () => {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [aboutHeading, setAboutHeading] = useState('');
  const [aboutDescription, setAboutDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [twitter, setTwitter] = useState('');

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
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "black" }}>
        <View style={{ marginTop: responsiveHeight(6) }}>
          {profileImage && <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center" }} />}
          <TouchableOpacity onPress={selectImage} style={{ marginTop: 10, alignSelf: "center" }}>
            <Text style={{ fontSize: 16, color: 'white' }}>Upload Profile Image</Text>
          </TouchableOpacity>
        </View>
        <View>

        </View>
        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Name</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            value={name}
            placeholder='Enter Name'
            placeholderTextColor={"grey"}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Occupation</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter occupation'
            placeholderTextColor={"grey"}
            value={occupation}
            onChangeText={(text) => setOccupation(text)}
          />
        </View>
        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>About us - Heading</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter about'
            placeholderTextColor={"grey"}
            value={aboutHeading}
            onChangeText={(text) => setAboutHeading(text)}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>About us - Description</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20, height: 100, textAlignVertical: 'top' }}
            placeholder='Enter Description'
            placeholderTextColor={"grey"}
            value={aboutDescription}
            onChangeText={(text) => setAboutDescription(text)}
            multiline={true}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Phone Number</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter phone'
            placeholderTextColor={"grey"}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Email</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter email'
            placeholderTextColor={"grey"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Website</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter website'
            placeholderTextColor={"grey"}
            value={website}
            onChangeText={(text) => setWebsite(text)}
          />
        </View>


        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Address</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter address'
            placeholderTextColor={"grey"}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Instagram</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter instagram'
            placeholderTextColor={"grey"}
            value={instagram}
            onChangeText={(text) => setInstagram(text)}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>LinkedIn</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter linkedin'
            placeholderTextColor={"grey"}
            value={linkedin}
            onChangeText={(text) => setLinkedin(text)}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>WhatsApp</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter linkedin'
            placeholderTextColor={"grey"}
            value={whatsapp}
            onChangeText={(text) => setWhatsapp(text)}
          />
        </View>


        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Facebook</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter facebook'
            placeholderTextColor={"grey"}
            value={facebook}
            onChangeText={(text) => setFacebook(text)}
          />
        </View>


        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>YouTube</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter youtube'
            placeholderTextColor={"grey"}
            value={youtube}
            onChangeText={(text) => setYoutube(text)}
          />
        </View>

        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>TikTok</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter tiktok'
            placeholderTextColor={"grey"}
            value={tiktok}
            onChangeText={(text) => setTiktok(text)}
          />
        </View>


        <Text style={{ marginTop: 20, fontSize: 16, margin: 5, marginLeft: responsiveWidth(6),color: 'white' }}>Twitter</Text>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{ width: '100%', borderColor: 'white', borderWidth: 1, padding: 10, borderRadius: 5, borderRadius: 10, paddingHorizontal: 20 }}
            placeholder='Enter twitter'
            placeholderTextColor={"grey"}
            value={twitter}
            onChangeText={(text) => setTwitter(text)}
          />
        </View>
          <TouchableOpacity style={{alignSelf:"center",backgroundColor:"white",marginTop:responsiveHeight(4),width:"100%",alignItems:"center",padding:10}}>
            <Text style={{fontSize:20,color:"black",}}> Save</Text>
          </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default CvInputs;

