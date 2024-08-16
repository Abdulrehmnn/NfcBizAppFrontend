import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const MainHeader = ({ headerText, menuIconName, logoSource, onPress }) => {
  const navigation = useNavigation();
  
  const navigateToMenuScreen = () => {
    navigation.navigate('MenuScreen');
  };

  return (
    <View style={styles.headerInnerContainer}>
      <TouchableOpacity  onPress={navigateToMenuScreen} style={{width:responsiveWidth(14),alignItems:'flex-end',marginRight:5}}>
        <Entypo name={menuIconName} style={styles.menuIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{headerText}</Text>
      <View style={{width:responsiveWidth(14),alignItems:'flex-start'}}>
        <Image source={logoSource} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerInnerContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width:responsiveWidth(100),
    height:responsiveHeight(6),
    overflow:"hidden"
  },
  menuIcon: {
    fontSize: responsiveHeight(5),
    color: 'black',
  },
  logo: {
    height: responsiveHeight(9),
    resizeMode: 'cover',
    width: responsiveWidth(16),
  },
  headerText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MainHeader;
