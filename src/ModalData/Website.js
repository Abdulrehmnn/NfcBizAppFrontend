import React from 'react';
import { View, Text, StyleSheet,} from 'react-native';
import { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import { HandlerUpdateWebsite } from '../Handlers/Handlers';

const Website = ({ closeModal,websiteData,CardHandler,showToast}) => {
    const [websiteInput, setWebsiteInput] = useState( websiteData ||'');  
    
  const handlerUpdateWebsite = async () => {
    const message = await HandlerUpdateWebsite(websiteInput);
    console.log(message);
    closeModal();
    CardHandler();
    showToast(message);
  };  
  return (     
    <View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: responsiveHeight(3) }}>
          <Text style={styles.modalText}>Website</Text>
          <Buttons  onPress={closeModal}>
            <AntDesign name="close" style={styles.closeText} />
          </Buttons>
        </View>
        <InputField isButton placeholder="www.abc.com" placeholderTextColor="#696969" style={styles.inputField} value={websiteInput} onChangeText={(text) => setWebsiteInput(text.trim())} />
        <Buttons title="Add" style={styles.button} textStyle={styles.buttonText}  onPress={handlerUpdateWebsite}/>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
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
export default Website