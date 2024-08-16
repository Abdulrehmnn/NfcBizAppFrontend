import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { useState, useRef } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize, responsiveHeight, } from 'react-native-responsive-dimensions';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import { Alert } from 'react-native';

import { Divider } from '@react-native-material/core';
import { HandlerAddConnections, HandlerDeleteConnection } from '../Handlers/Handlers';
const Connection = ({ closeModal, connectionData, CardHandler ,showToast}) => {
  const [isViewConnections, setIsViewConnections] = useState(true);
  const [newConnectionName, setNewConnectionName] = useState('');
  const [errorText, setErrorText] = useState('');

  const [newConnectionPasskey, setNewConnectionPasskey] = useState('');
  const handlerAddConnections = async () => {
    if (!newConnectionName || !newConnectionPasskey) {
      setErrorText('Please enter both Name and Passkey.');
      return;
    }
    console.log(newConnectionName);
    console.log(newConnectionPasskey);

    const message = await HandlerAddConnections(newConnectionName, newConnectionPasskey);
    console.log(message);
    setNewConnectionName('');
    setNewConnectionPasskey('');
    setErrorText('');
    CardHandler();
    showToast();
closeModal();
  };
  // const handlerDeleteConnections = async (id) => {
  //   const message = await HandlerDeleteConnection(id);
  //   console.log(message);
  // };


  const handlerDeleteConnections = (id) => {
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
            const message = await HandlerDeleteConnection(id);
            console.log(message);
            CardHandler();
          },
        },
      ],
      { cancelable: false }
    );
  };
  const toggleView = (showConnections = true) => {
    setIsViewConnections(showConnections);
    CardHandler();
  };
  return isViewConnections ? (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: responsiveHeight(3) }}>
        <Text style={styles.modalText}>Your Connections</Text>
        <Buttons style={styles.closeButton} onPress={closeModal}>
          <AntDesign name="close" style={styles.closeText} />
        </Buttons>
      </View>
      {connectionData.length > 0 && (
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={{ color: "white", fontSize: 12 }}>Name</Text>
          <Text style={{ color: "white", fontSize: 12, marginRight: 5 }}>Passkey</Text>
          <Text></Text>
        </View>
      )}
      {connectionData.length > 0 && (
        <Divider color='grey' leadingInset={-5} style={{ margin: 3, marginLeft: 0, marginRight: 0, }} />
      )}
      {connectionData.map((connection, index) => (
        <View key={index} style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 3 }}>
          <Text style={{ color: "white", flex: 1, fontSize: 13 }}>{connection.name}</Text>
          <Text style={{ color: "white", flex: 1, fontSize: 13, marginLeft: 5 }}>{connection.pass}</Text>
          <Buttons onPress={() => handlerDeleteConnections(connection._id)} >
            <AntDesign name="delete" color={"white"} size={15} style={{ marginLeft: 5, marginTop: 2 }} />
          </Buttons>
        </View>
      ))}
      <Buttons title="Add" style={styles.button} textStyle={styles.buttonText} onPress={() => setIsViewConnections(false)} />
    </View>
  ) : (
    <View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: responsiveHeight(3) }}>
          <Text style={styles.modalText}>Add Connection</Text>
          <Buttons style={styles.closeButton} onPress={toggleView}>
            <AntDesign name="close" style={styles.closeText} />
          </Buttons>
        </View>
        <InputField isButton placeholder="Name" placeholderTextColor="#BEBEBE" style={styles.inputField} value={newConnectionName} onChangeText={(text) => setNewConnectionName(text.trim())} />
        <InputField isButton placeholder="Passkey" placeholderTextColor="#BEBEBE" style={styles.inputField} value={newConnectionPasskey} onChangeText={(text) => { setNewConnectionPasskey(text.trim()); setErrorText(''); }} />
        <Text style={{ color: 'red', fontSize: 12 }}>{errorText}</Text>
        <Buttons title="Add" style={styles.button} textStyle={styles.buttonText} onPress={handlerAddConnections} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  alltext: {
    color: "#696969",
    fontSize: responsiveFontSize(1.9),
    marginBottom: 5,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2E2E2E',
    padding: 20,
    borderRadius: 10,
    width: '90%',
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
  socialInput: {
    height: 39,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 10,
    color: "white",
  },

  Discriptioninput: {
    height: 100,
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  button: {
    alignSelf: "center",
    width: "23%",
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 2,
    marginTop: responsiveHeight(1.5)
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  socialLinkIcon: {
    fontSize: 17,
    color: '#C2C2C2',
    marginRight: 10,
  },
  outher: {

  }
});
export default Connection
