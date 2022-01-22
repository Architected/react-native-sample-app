import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Store } from '../../state/storeProvider';
import { fileClient } from '../../service/defaultServices';
import * as fileActionType from 'architected-client/app-state/constants/file';
import { getError } from '../../helper/getError';

export default function FilePicker({ navigation }) {
  const { state, dispatch } = React.useContext(Store);
  const { bearerToken } = state['auth'];
  const { isSavingFile, isLoadingList, saveFileError } = state['file'];
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [uploadError, setuploadError] = React.useState(null);

  const fileFromPath = (filePath) => {
    const start = filePath.lastIndexOf('/') + 1;
    return filePath.substr(start);
  };

  let openImagePickerAsync = async () => {
    dispatch({ type: fileActionType.FILE_CREATE_START });
    setuploadError(null);
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === 'web') {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
      console.log('pickerResult' + JSON.stringify(pickerResult));
    }
  };

  let uploadFile = async () => {
    console.log(
      'uploading image - selectedImage.localUri:' + selectedImage.localUri
    );
    console.log(
      'uploading image - selectedImage:' + JSON.stringify(selectedImage)
    );
    console.log(
      'uploading image - name:' + fileFromPath(selectedImage.localUri)
    );
    var data = {
      name: 'enter a name',
      description: 'enter a description',
      file: [
        {
          uri: selectedImage.localUri,
          name: fileFromPath(selectedImage.localUri),
          type: 'image/jpg',
        },
      ],
    };

    setUploadingImage(true);
    const responseData = await fileClient.uploadFile(
      data,
      dispatch,
      bearerToken.tokenValue
    );

    console.log('responseData:' + JSON.stringify(responseData));

    if (!responseData.inError) {
      await fileClient.getAllFiles(dispatch, bearerToken.tokenValue);
      setUploadingImage(false);
      navigation.navigate('FileList');
    } else {
      setUploadingImage(false);
      setuploadError(getError(responseData));
      console.log('saveFileError:' + saveFileError);
    }
  };

  if (selectedImage !== null) {
    console.log('selectedImage.localUri: ' + selectedImage.localUri);
    return (
      <>
        <View style={styles.container}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={{ height: 300, width: 300, padding: 20, marginBottom: 20 }}
          />
          {uploadingImage ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.button}>
              <Button
                title="Upload photo"
                onPress={uploadFile}
                loading={uploadingImage}
              />
            </TouchableOpacity>
          )}
          {uploadError && <Text style={styles.errorText}>{uploadError}</Text>}
        </View>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Choose an image to upload</Text>

      <TouchableOpacity style={styles.button}>
        <Button title="Select Photo" onPress={openImagePickerAsync} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    margin: 10,
    marginLeft: 0,
  },
});
