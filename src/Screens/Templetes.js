import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Templetescom from '../Components/Templetescom';
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';

const Templates = () => {
  const navigation = useNavigation();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const navigateToMainScreen = () => {
    navigation.navigate("MainScreen");
  };

  const navigateToSalonInputs = () => {
    navigation.navigate("SalonInputs");
  };

  const handleTemplateSelect = (templateTitle) => {
    setSelectedTemplate(templateTitle === selectedTemplate ? null : templateTitle);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: responsiveHeight(3) }}>
        <TouchableOpacity onPress={navigateToMainScreen} style={{ marginLeft: responsiveWidth(5) }}>
          <Icon name="arrowleft" size={responsiveFontSize(4)} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: responsiveHeight(2) }}>
          <Templetescom title="Skin Care" imageSource={require('../Images/nb.jpg')} onPress={navigateToSalonInputs} isSelected={selectedTemplate === 'Skin Care'} onSelect={() => handleTemplateSelect('Skin Care')} />
          <Templetescom title="Discount/offers" imageSource={require('../Images/salon.jpg')} onPress={navigateToSalonInputs} isSelected={selectedTemplate === 'Discount/offers'} onSelect={() => handleTemplateSelect('Discount/offers')} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: responsiveHeight(2) }}>
          <Templetescom title="Business card" imageSource={require('../Images/buss.jpg')} onPress={navigateToSalonInputs} isSelected={selectedTemplate === 'Business card'} onSelect={() => handleTemplateSelect('Business card')} />
          <Templetescom title="Business card" imageSource={require('../Images/menus.jpg')} onPress={navigateToSalonInputs} isSelected={selectedTemplate === 'Menus card'} onSelect={() => handleTemplateSelect('Menus card')} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Templates;
