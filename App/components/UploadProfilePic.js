import React, { useState } from 'react';
import { StyleSheet, View, Button, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app,auth } from '../../firebaseConfig'; // Import your Firebase auth instance

export default function UploadProfilePic() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const user = auth.currentUser;

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      console.log('ImagePicker response:', response);
      if (!response.didCancel) {
        setImage(response);
      }
    });
  };
  const uploadImage = async () => {
    setUploading(true);
  
    try {
      // Ensure that image is not null and that it contains assets
      if (!image || !image.assets || image.assets.length === 0) {
        throw new Error('No image selected');
      }
  
      // Convert image URI to Blob
      const response = await fetch(image.assets[0].uri);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const blob = await response.blob();
  
      // Generate a unique filename
      const currentUserUID =user.uid;
      const filename = `${currentUserUID}`;
  
      // Upload the blob to Firebase Storage
      const storage = getStorage(app);
      const storageRef = ref(storage, `profilePics/${filename}`);
      await uploadBytes(storageRef, blob);
  
      // Alert and cleanup
      Alert.alert('Photo uploaded!');
      setImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again later.');
    } finally {
      setUploading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {image && image.assets && image.assets.length > 0 && (
        <Image source={{ uri: image.assets[0].uri }} style={styles.image} />
      )}
      {uploading && <Text>Uploading...</Text>}
      {image && (
        <Button title="Upload Image" onPress={uploadImage} disabled={uploading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
