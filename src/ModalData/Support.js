import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { HandlerCreateTicket } from '../Handlers/Handlers';
import { items } from '../Components/data';

const Support = ({ closeModal }) => {
  const [supportInput, setSupportInput] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);


  // const ticketSubmitHandler = async () => {
  //   const message = await HandlerCreateTicket(supportInput, description);
  //   console.log(message);
  //   setSelectedSubject('');
  //   setDescription('');
  // };
  const ticketSubmitHandler = async () => {
    let selectedSubjectToSave = selectedSubject;
    let descriptionToSave = description;
    if (selectedSubject === 'other issue') {
      selectedSubjectToSave = supportInput;
    } else {
      setSupportInput('');
    }
    const message = await HandlerCreateTicket(selectedSubjectToSave, descriptionToSave);
    setSelectedSubject(null);
    setDescription('');
    closeModal();
    showToast(message)
  };
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: responsiveHeight(1) }}>
        <Text style={styles.modalText}>Support</Text>
        <Buttons style={{}} onPress={closeModal}>
          <AntDesign name="close" style={styles.closeText} />
        </Buttons>
      </View>
      <View>
        <Text style={styles.alltext}>Subject</Text>
      </View>
      <DropDownPicker
        open={open}
        value={selectedSubject}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedSubject}
        placeholder={'Card action Issue'}
        placeholderStyle={{ color: 'grey', fontSize: 14 }}
        style={{ marginBottom: 5, backgroundColor: "#1F1F1F", borderWidth: 0, }}
        theme='DARK'
        dropDownContainerStyle={{ backgroundColor: "#1F1F1F", maxHeight: responsiveHeight(15), marginTop: 3, borderWidth: 0, }}
        textStyle={{ fontSize: 14 }}
      />
      {selectedSubject === "other issue" && (
        <View style={styles.outher}>
          <Text style={styles.alltext}>Other Subject</Text>
          <InputField isButton placeholder={"other Issue"} placeholderTextColor={'grey'} style={styles.inputField} value={supportInput} onChangeText={(text) => setSupportInput(text.trim())} />
        </View>
      )}
      <View>
        <Text style={styles.alltext}>Enter your description here:</Text>
        <InputField isButton placeholder={"Description (Max 300 words)"} placeholderTextColor={'grey'} style={styles.Discriptioninput} multiline={true} onChangeText={(text) => setDescription(text)} value={description} maxLength={300} />
      </View>
      <Buttons title="submit" style={styles.button} textStyle={styles.buttonText} onPress={ticketSubmitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  alltext: {
    color: "#696969",
    fontSize: responsiveFontSize(1.9),
    marginBottom: 5,
  },

  closeText: {
    color: 'white',
    fontSize: 20,
  },
  modalText: {
    color: "white",
    fontSize: 16,
  },
  inputField: {
    height: 39,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white"
  },
  Discriptioninput: {
    height: 100,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    color: "white"
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

  outher: {

  }
});

export default Support;
