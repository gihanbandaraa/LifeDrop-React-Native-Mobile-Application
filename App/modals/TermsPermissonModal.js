import React from 'react';
import { View, Modal, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const TermsConditionsModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Terms & Conditions</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.modalText}>
              By registering as a donor, you agree to abide by the terms and conditions outlined by our blood donation platform.
            </Text>
            {/* Add more content for Terms & Conditions here */}
            <Text style={styles.sectionTitle}>Donor Responsibilities:</Text>
            <Text style={styles.sectionContent}>
              - You must be in good health to donate blood.
              {'\n'}
              - You must provide accurate information about your health status and medical history.
              {'\n'}
              - You must follow the instructions provided by the blood donation center staff.
              {'\n'}
              {/* Add more responsibilities here */}
            </Text>
            <Text style={styles.sectionTitle}>Data Usage:</Text>
            <Text style={styles.sectionContent}>
              - We may collect and use your personal information as described in our Privacy Policy.
              {'\n'}
              - Your data will be used for the purpose of facilitating blood donation services.
              {'\n'}
              {/* Add more information about data usage */}
            </Text>
            <Text style={styles.sectionTitle}>Finder's Conditions:</Text>
            <Text style={styles.sectionContent}>
              - You must respect the privacy and confidentiality of donors' information.
              {'\n'}
              - You must not misuse or share donors' personal information without their consent.
              {'\n'}
              {/* Add more conditions for finders */}
            </Text>
          </ScrollView>
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
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    maxHeight: '80%',
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
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionContent: {
    fontSize: 14,
  },
});

export default TermsConditionsModal;
