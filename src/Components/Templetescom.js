import React, { useState } from 'react';
import { View, Text, Image, StyleSheet,ToastAndroid } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Buttons from './Buttons';
import { useNavigation } from "@react-navigation/native";

const Templetescom = ({ title, imageSource, isSelected, onSelect }) => {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const showToast = () => {
    ToastAndroid.show('Coming Soon !!', ToastAndroid.SHORT);
};
  const handleCheckBoxToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      onSelect();
      // navigation.navigate('SalonInputs');
      showToast();
    }
  };
  return (
    <View>
      <View>
        <Buttons onPress={toggleModal}>
          <View style={styles.image}>
            <Image source={imageSource} style={{width:"100%",height:"100%"}} resizeMode="cover" />
          </View>
          <View style={styles.selectButtonContainer}>
            <CheckBox
              center
              checked={isSelected}
              onPress={() => { handleCheckBoxToggle();}}
              containerStyle={styles.checkboxContainer}
              checkedColor="blue" 
            />
          </View>
        </Buttons>
        <Text style={styles.subHeaderText}>{title}</Text>
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Buttons style={styles.closeButton} onPress={toggleModal}>
            <AntDesign name="close" style={styles.closeButtonText} />
          </Buttons>
          <Image source={imageSource} style={styles.modalImage} resizeMode="contain" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeaderText: {
    fontSize: responsiveFontSize(2),
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  closeButton: {
    position: 'absolute',
    top: responsiveHeight(2.5),
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(3),
  },
  modalImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(80),
  },
  image: {
    width: responsiveWidth(40),
    height: responsiveHeight(35),
    borderWidth:3,
    borderColor:"orange"
  },
  selectButtonContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: responsiveWidth(10),
    marginTop: responsiveHeight(0.3),
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
});

export default Templetescom;
