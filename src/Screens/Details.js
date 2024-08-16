import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from "@react-native-material/core";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Buttons from '../Components/Buttons';


const Details = ({ linktreeData, cvData, socialLinksData, websiteData, connectionsData }) => {
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const [treelinksOpen, setTreelinksOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);

  const DropdownItem = ({ title, icon, isOpen, toggleDropdown, children }) => {
    return (
      <View style={styles.dropdownItem}>
        <TouchableOpacity onPress={toggleDropdown}>
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              {icon && <Icon name={icon} size={20} color={"white"} />}
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={{ width: 50, alignItems: "flex-end" }}>
              <Icon name={isOpen ? 'caret-up' : 'caret-down'} size={25} color={"#565656"} />
            </View>
          </View>
        </TouchableOpacity>
        {isOpen && <View>{children}</View>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Divider style={styles.divider} color="white" />
      <DropdownItem title="Link Tree" icon="tree" isOpen={treelinksOpen} toggleDropdown={() => setTreelinksOpen(!treelinksOpen)}>
        {linktreeData.map((item, index) => (
          <View key={index} style={styles.links}>
            <Text style={styles.linkText}>{item}</Text>
          </View>
        ))}
      </DropdownItem>
      <Divider style={styles.divider} color="white" />
      <DropdownItem title="CV/Portfolio" icon="file" isOpen={cvOpen} toggleDropdown={() => setCvOpen(!cvOpen)}>
        {cvData.map((item, index) => (
          <View key={index} style={styles.links}>
            <Text style={styles.linkText}>{item}</Text>
          </View>
        ))}
      </DropdownItem>
      <Divider style={styles.divider} color="white" />
      <DropdownItem title="Social Links" icon="share" isOpen={socialOpen} toggleDropdown={() => setSocialOpen(!socialOpen)} >
        {socialLinksData.map((item, index) => (
          // <View key={index} style={{ flexDirection: "row" }}>
          // <FontAwesome name={item.platform} style={{ fontSize: 17, color: '#C2C2C2', marginRight: 10, }} />
          // <Text style={styles.linkText}>{item.link}</Text>
          // </View>
          <View style={{ flexDirection: "row",marginVertical:6 }}>
            <FontAwesome name={item.platform} style={{ fontSize: 17, color: '#C2C2C2', marginRight: 10, }} />
            <Text style={   { color: "white",fontSize: 14,width:"85%"}}>{item.link}</Text>
            <Text></Text>
          </View>
        ))}
      </DropdownItem>
      <Divider style={styles.divider} color="white" />
      <DropdownItem title="Website" icon="globe" isOpen={websiteOpen} toggleDropdown={() => setWebsiteOpen(!websiteOpen)} >
        {websiteData.map((item, index) => (
          <View key={index} style={styles.links}>
            <Text style={styles.linkText}>{item}</Text>
          </View>
        ))}
      </DropdownItem>
      {/* <Divider style={styles.divider} color="white" />
      <DropdownItem title="Connections" icon="users" isOpen={connectionOpen} toggleDropdown={() => setConnectionOpen(!connectionOpen)} >
        {connectionsData.map((item, index) => (
          <View key={index} style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 3 }}>
            <Text style={{ color: '#C2C2C2', marginRight: 10, width: "45%" }}>{item.name}</Text>
            <Text style={{ color: "#C2C2C2",width:"45%" }}>{item.pass}</Text>

          </View>
        ))}


      </DropdownItem> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    padding: 10,
  },
  dropdownItem: {
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 2,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: "white",
    marginLeft: 10,
  },
  links: {
    marginTop: 2,
    marginLeft: 30,
  },
  linkText: {
    color: "white",
    fontSize: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },
});

export default Details;
