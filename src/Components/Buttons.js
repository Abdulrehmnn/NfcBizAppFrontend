import React from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';

const Buttons = ({  onPress, isButton,title, style, textStyle ,children,icon,text}) => {
     if (isButton) {
        return (
          <TouchableOpacity style={styles.Buttons} onPress={onPress}>
            <View style={{
              justifyContent: "center",
              alignItems: "center",
            }}>
              {icon}
              <Text style={styles.buttonTextt}>{text}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    return (
        <TouchableOpacity
            style={style}
            onPress={onPress}
        >
            {children ? (
                children 
            ) : (
                <Text style={textStyle}>{title}</Text> 
            )}
        </TouchableOpacity>
    );
};
  
const styles = StyleSheet.create({
    Buttons: {
      width: "48.6%",
      backgroundColor: "#191919",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#EDC02C",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      marginTop: 9,
    },
    buttonTextt: {
      fontSize: 16,
      marginTop: 5,
      color: "#EDC02C",
    },
  });
  export default Buttons;
  