import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList, PermissionsAndroid, Platform, Alert, StyleSheet, ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { ModalCategories } from '../Components/data';
import InputField from '../Components/InputField';
import Buttons from '../Components/Buttons';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const Qrcode = ({ closeModal, QrData }) => {
  const [QRcode, setQrcode] = useState(QrData || '');
  const qrCodeRef = useRef(null);
  const viewShotRef = useRef(null);
  const [qrinput, setqrinput] = useState(QrData || '');

  

  const showToast = () => {
    ToastAndroid.show("Copied",ToastAndroid.SHORT);
};
const showToastt = () => {
  ToastAndroid.show("Qr code Downloaded",ToastAndroid.SHORT);
};
  const handleDownQRCode = async () => {
    try {
      // Capture the QR code image using ViewShot
      const uri = await viewShotRef.current.capture();
  
      // Get the directory for saving the file (you may need to request permissions)
      const downloadDir = Platform.OS === 'android'
        ? RNFS.ExternalStorageDirectoryPath + '/Download'
        : RNFS.DocumentDirectoryPath;
  
      // Generate a unique file name for the QR code image
      const fileName = `QRCode_${Date.now()}.png`;
  
      // Create the file path
      const filePath = `${downloadDir}/${fileName}`;
  
      // Write the image to the file system
      await RNFS.copyFile(uri, filePath);
  
      // Display a success message
      showToastt() ;
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };
  

  const handleShareQRCode = async (social) => {
    try {
      // Capture the QR code image using ViewShot
      const uri = await viewShotRef.current.capture();

      // Create a base64 string from the image URI
      const base64Image = await RNFS.readFile(uri, 'base64');

      // Configure the share options
      const shareOptions = {
        title: 'Share QR Code',
        message: 'Check out this QR Code!',
        url: `data:image/png;base64,${base64Image}`,
        social: Share.Social[social.toUpperCase()], // Use the icon name to determine the social platform
      };

      // Share the QR code image
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };

  const renderCategories = ({ item, index }) => {
    return (
      <View style={styles.categoryItem}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={item.icon === 'download' ? handleDownQRCode : () => handleShareQRCode(item.icon)}
        >
          <View>
            <Icon name={item.icon} style={styles.categoryIcon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.closeButton}>
        <Buttons onPress={closeModal}>
          <AntDesign name="close" style={styles.closeButtonIcon} />
        </Buttons>
      </View>
      <View style={styles.qrCodeContainer}>
        <ViewShot ref={viewShotRef} options={{ format: 'png' }}>
          <QRCode ref={qrCodeRef} value={QRcode} size={responsiveWidth(38)} />
        </ViewShot>
      </View>
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal={true}
          data={ModalCategories}
          renderItem={renderCategories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <InputField
          isButton
          placeholderTextColor="#707070"
          style={styles.inputField}
          value={qrinput}
          onChangeText={(text) => setqrinput(text)}
          editable={false}
        />
        <Buttons style={styles.button} onPress={showToast}>
          <FontAwesome name="files-o" style={styles.buttonIcon} />
        </Buttons>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    categoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 5,
      alignSelf: 'center',
    },
    categoryButton: {
      backgroundColor: 'grey',
      height: 47,
      alignItems: 'center',
      justifyContent: 'center',
      width: 49,
      borderRadius: 5,
      bottom: 5,
    },
    categoryIcon: {
      fontSize: 26,
      color: 'white',
    },
    closeButton: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    closeButtonIcon: {
      color: 'white',
      fontSize: 20,
    },
    qrCodeContainer: {
      alignItems: 'center',
      marginTop: responsiveHeight(3),
      backgroundColor: 'white',
      padding: responsiveHeight(4),
      width: responsiveWidth(55),
      alignSelf: 'center',
      borderRadius: 10,
    },
    categoriesContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: responsiveHeight(1),
    },
    inputFieldContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
    },
    inputField: {
      backgroundColor: '#1F1F1F',
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      height: 39,
    },
    button: {
      alignSelf: 'center',
      backgroundColor: '#343434',
      height: 39,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4%',
      paddingTop: '2%',
      paddingBottom: '2%',
    },
    buttonIcon: {
      fontSize: 15,
      color: 'white',
    },
  });
export default Qrcode;
