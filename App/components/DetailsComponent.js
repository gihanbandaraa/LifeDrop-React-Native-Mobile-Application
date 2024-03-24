import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../../firebaseConfig';

const auth = getAuth(app);
const firestore = getFirestore(app);

const DetailsComponent = ({ label, userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(userData);
  const [tempValue, setTempValue] = useState(userData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, { [label.toLowerCase()]: updatedValue });
      setIsEditing(false);
      setIsModalVisible(false);
      console.log(`Updated ${label} successfully!`);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsModalVisible(false);
    setUpdatedValue(tempValue);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleEditClick}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.iconContainer}></View>
            <Text style={styles.label}>{label}</Text>
          </View>
          {isEditing ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={styles.input}
                value={updatedValue}
                onChangeText={setUpdatedValue}
              />
            </View>
          ) : (
            <Text style={styles.userData}>{userData}</Text>
          )}
        </View>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit {label}</Text>
          <TextInput
            style={styles.modalInput}
            value={updatedValue}
            onChangeText={setUpdatedValue}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconContainer: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    marginRight: 9,
  },
  label: {
    fontFamily: 'Outfit',
    fontSize: 18,
    color:'black'
  },
  userData: {
    fontFamily: 'Outfit',
    fontSize: 16,
    marginLeft: 5,
    maxWidth: 200,
    color:'black'
  },
  input: {
    fontFamily: 'Outfit',
    fontSize: 16,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Outfit',
    fontSize: 20,
    marginBottom: 20,
    color:'black'
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'black',
    color:'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '80%',
    fontFamily:'Outfit'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  saveButton: {
    fontFamily: 'Outfit',
    fontSize: 16,
    color: 'blue',
  },
  cancelButton: {
    fontFamily: 'Outfit',
    fontSize: 16,
    color: 'red',
  },
});

export default DetailsComponent;
