import React from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const PrivacyPermissionModal = ({visible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Privacy Permission</Text>
          <Text style={styles.modalText}>
            By enabling privacy permissions, you allow us to collect and use
            your location data for the purpose of facilitating blood donation
            services. You can always set your account as inactive in the
            settings to prevent others from Contact you.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Outfit',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Outfit Regular',
  },
});

export default PrivacyPermissionModal;
