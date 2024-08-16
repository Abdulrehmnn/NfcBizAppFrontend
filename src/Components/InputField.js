import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const InputField = ({ placeholder, secureTextEntry, icon,placeholderTextColor,isButton,style,multiline,onChangeText,value,maxLength,editable }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  if (isButton) {
    return (
      <TextInput style={style} placeholder={placeholder} placeholderTextColor={placeholderTextColor} multiline={multiline} onChangeText={onChangeText} value={value} maxLength={maxLength} editable={editable}/> 
    );
  }
  return (
    <View style={styles.inputContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 2,  borderColor: isFocused ? '#EDC02C' : 'grey', borderRadius: 30, backgroundColor: 'black', overflow: 'hidden', }}>
        <Icon name={icon} size={20} color="grey" style={{ paddingLeft: 15, }} />
        <TextInput style={{ flex: 1, padding: 10, color: 'white', }}
          placeholder={placeholder}
          placeholderTextColor="grey"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="grey" style={{ paddingRight: 15, }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
});

export default InputField;
