import React from 'react';
import { View, Text, StyleSheet ,ToastAndroid} from 'react-native';
import { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveHeight, } from 'react-native-responsive-dimensions';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import { HandlerActionForget } from '../Handlers/Handlers';
const Forget = ({ closeModal }) => {
  const [EmailInput, setEmailInput] = useState('');
  
  const handlerActionForget = async () => {
    const message = await HandlerActionForget(EmailInput);
    console.log(message)
    showToast(message)
    closeModal()
  };
  const showToast = (message) => {
    ToastAndroid.show(message,ToastAndroid.SHORT);
};
  return (
    <View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: responsiveHeight(3) }}>
          <Text style={styles.modalText}>Forget Password</Text>
          <Buttons onPress={closeModal}>
            <AntDesign name="close" style={{ color: 'white', fontSize: 20, }} />
          </Buttons>
        </View>
        <Text style={{ margin: 5, marginLeft: 0,color:"white" }}>Email Address</Text>
        <InputField isButton placeholder={"Enter Email"} placeholderTextColor={'#696969'} style={styles.inputField} value={EmailInput} onChangeText={(text) => setEmailInput(text.trim())} />
        <Buttons title="Submit" style={styles.button} textStyle={styles.buttonText} onPress={handlerActionForget}/>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
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
  modalText: {
    color: "white",
    fontSize: 16,
  },
});
export default Forget