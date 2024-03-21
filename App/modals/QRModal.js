import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import generateQRCode from '../components/QRCodeGenerator'; // Import the QR code generator

const QRModal = ({ visible, onClose, userData }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {/* Display the generated QR code */}
          {generateQRCode(userData)}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 18,
  },
});

export default QRModal;
