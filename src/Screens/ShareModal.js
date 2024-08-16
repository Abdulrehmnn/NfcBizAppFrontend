import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Qrcode from '../ModalData/Qrcode';
import Support from '../ModalData/Support';
import LinkTree from '../ModalData/LinkTree';
import Cv from '../ModalData/Cv';
import Social from '../ModalData/Social';
import Website from '../ModalData/Website';
import Connection from '../ModalData/Connection';
import NewPass from '../ModalData/NewPass';
import Forget from '../ModalData/Forget';

const ShareModal = ({ isVisible, closeModal, modalContent, Data, CardHandler,showToast }) => {
  const renderModalContent = () => {
    if (modalContent === 'qrCode') {
      return (<Qrcode closeModal={closeModal} QrData={Data.url || ""} />);
    }
    else if (modalContent === 'support') {
      return (<Support closeModal={closeModal}  supportData={Data || ""} />);
    }
    else if (modalContent === 'cv') {
      return (<Cv closeModal={closeModal} CardHandler={CardHandler} showToast={showToast} cvData={Data.doc || ""} />);
    }
    else if (modalContent === 'link') {
      return (<LinkTree closeModal={closeModal} CardHandler={CardHandler} showToast={showToast} linkData={Data.linkedtree || ""} />);
    }
    else if (modalContent === 'website') {
      return (<Website closeModal={closeModal} CardHandler={CardHandler} showToast={showToast} websiteData={Data.website || ""} />);
    }
    else if (modalContent === 'Social') {
      return (<Social closeModal={closeModal}  CardHandler={CardHandler} showToast={showToast} socialData={Data.socials || ""} />);
    }
    if (modalContent === 'Connection') {
      return (<Connection closeModal={closeModal} CardHandler={CardHandler} showToast={showToast} connectionData={Data.connections || ""} />);
    }
    if (modalContent === 'Newpass') {
      return (<NewPass closeModal={closeModal} />);
    }
    if (modalContent === 'Forget') {
      return (<Forget closeModal={closeModal} />);
    }
    else {
      return null;
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent={true}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
      >
        <View style={styles.modalContent}>
          {renderModalContent()}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#2E2E2E',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
});

export default ShareModal;
