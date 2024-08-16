import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import DropDownPicker from 'react-native-dropdown-picker';
import { HandlerAddSocial, HandlerDeleteSocial } from '../Handlers/Handlers';
import { Alert } from 'react-native';

const Social = ({ closeModal, socialData, CardHandler,showToast }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [isViewSocials, setIsViewSocials] = useState(true);
  const [newSocialName, setNewSocialName] = useState('');
  const [errorText, setErrorText] = useState('');
  const [items, setItems] = useState([
    { label: 'Pinterest', value: 'pinterest' },
    { label: 'Whatsapp', value: 'whatsapp' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Linkedin', value: 'linkedin' },
    { label: 'Youtube', value: 'youtube' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Snapchat', value: 'snapchat' },
  ]);
  const handlerDeleteSocial = async (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Do you want to delete this data?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const message = await HandlerDeleteSocial(id);
            console.log(message);
            CardHandler();
          },
        },
      ],
      { cancelable: false }
    );
  };
  const toggleView = (showSocials = true) => {
    setIsViewSocials(showSocials);
    CardHandler();
  };

  const handlerAddSocial = async () => {
    if (!value || !newSocialName) {
      setErrorText('Please enter both social link and value.');
      setValue('');
      setNewSocialName('');
      return;
    }
    const isAlreadyExists = socialData.some(item => item.platform === value);

    if (isAlreadyExists) {
      setErrorText(`${value} is already present.`);
      setValue('');
      setNewSocialName('');
      return;
    }
    const message = await HandlerAddSocial(newSocialName, value);
    console.log(message);
    setNewSocialName('');
    setErrorText('');
    CardHandler();
    setValue('');
    closeModal();
    showToast();
    const updatedItems = items.filter(item => item.value !== value);
    setItems(updatedItems);
  };

  return isViewSocials ? (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: responsiveHeight(3) }}>
        <Text style={{ color: "white", fontSize: 16, }}>Social Links</Text>
        <Buttons onPress={closeModal}>
          <AntDesign name="close" style={{ color: "white", fontSize: 20 }} />
        </Buttons>
      </View>
      <FlatList
        data={socialData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 ,}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: "85%" }}>
              <FontAwesome name={item.platform} style={{ fontSize: 17, color: '#C2C2C2', marginRight: 10, }} />
              <Text style={{ color: "#C2C2C2" }}>{item.link}</Text>
            </View>
            <Buttons onPress={() => handlerDeleteSocial(item._id)}>
              <AntDesign name="delete" color={"#C2C2C2"} size={15} style={{}} />
            </Buttons>
          </View>
        )}
      />
      <Buttons title="Add" style={styles.button} textStyle={styles.buttonText} onPress={() => setIsViewSocials(false)} />
    </View>
  ) : (
    <View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: responsiveHeight(3) }}>
          <Text style={{ color: "white", fontSize: 16 }}>Add Social Links</Text>
          <Buttons onPress={toggleView} >
            <AntDesign name="close" style={{ color: "white", fontSize: 20, }} />
          </Buttons>
        </View>
        <View>
          <View style={{ width: '100%', alignItems: "center", justifyContent: "center"}}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{ borderWidth: 0, width: '100%', backgroundColor: "#1F1F1F", borderRadius: 0}}
              textStyle={{ fontSize: 13 }}
              selectedItemContainerStyle={{ alignItems: 'center', backgroundColor: "#1F1F1F" }}
              selectedLabelStyle={{ fontSize: 10 }}
              theme='DARK'
              dropDownContainerStyle={{ backgroundColor: "#1F1F1F", borderWidth: 0,maxHeight: responsiveHeight(15) }}
              showTickIcon={false}
            />
          </View>
          <View style={{ width: "100%", marginTop: 5 }}>
            <InputField isButton placeholder="Your Link" placeholderTextColor="grey" style={styles.socialInput} value={newSocialName} onChangeText={(text) => setNewSocialName(text.trim())} />
          </View>
        </View>
        <Text style={{ color: 'red', fontSize: 12 }}>{errorText}</Text>

      </View>
      <Buttons title="Add" style={styles.button} textStyle={styles.buttonText} onPress={handlerAddSocial} />
    </View>
  );
}
const styles = StyleSheet.create({
  inputField: {
    height: 39,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white"
  },
  socialInput: {
    height: 50,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 10,
    color: "white",
  },
  button: {
    alignSelf: "center",
    width: "23%",
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 2,
    marginTop: 12
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },

});
export default Social



