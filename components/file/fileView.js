import React from 'react';
import { Text, View, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Button, ButtonGroup } from 'react-native-elements';
import NavHeader from '../utility/navHeader';
import { Store } from '../../state/storeProvider';
import { deleteFile, getAllFiles } from '../../state/actions/file';

function FileView({ navigation, route }) {
  const { globalId } = route.params;

  const { state, dispatch } = React.useContext(Store);
  const { bearerToken } = state['auth'];
  const { files, isDeletingFile } = state['file'];

  const [currentFile, setCurrentFile] = React.useState({});

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputTitle: {
      width: 300,
      padding: 10,
      fontWeight: 'bold',
    },
    inputText: {
      width: 300,
      padding: 10,
    },
  });

  React.useEffect(() => {
    console.log('globalId:' + globalId);
    console.log('files:' + JSON.stringify(files));
    const file = files.find((item) => item.globalId == globalId);
    setCurrentFile(file);
    console.log('useEffect:currentFile: ' + JSON.stringify(currentFile));

    // Image.getSize(file.thumbnailPath, (width, height) => {
    //   if (this.props.width && !this.props.height) {
    //     this.setState({
    //       width: this.props.width,
    //       height: height * (this.props.width / width),
    //     });
    //   } else if (!this.props.width && this.props.height) {
    //     this.setState({
    //       width: width * (this.props.height / height),
    //       height: this.props.height,
    //     });
    //   } else {
    //     this.setState({ width: width, height: height });
    //   }
    // });
  }, [globalId]);

  const downloadHandler = () => {
    console.log('Downloading fileGlobalId: ' + file.globalId);
    const { data } = downloadFileAction(file.globalId, bearerToken.tokenValue);
  };

  const deleteHandler = () =>
    Alert.alert('Delete File', 'Are you sure you want to delete this file ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => processDeleteFile(),
      },
    ]);

  const processDeleteFile = async () => {
    setCurrentFile(null);
    await deleteFile(globalId, dispatch, bearerToken.tokenValue);
    await getAllFiles(dispatch, bearerToken.tokenValue);
    navigation.navigate('FileList');
  };

  return (
    <>
      <View>
        <NavHeader
          includeBack={true}
          titleText="File"
          navigation={navigation}
          includeFile={true}
          downloadHandler={downloadHandler}
          deleteHandler={deleteHandler}
        />
      </View>
      <ButtonGroup
        buttons={['DETAILS', 'ATTRIBUTES']}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 5 }}
      />
      {isDeletingFile && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {currentFile && selectedIndex == 0 && (
        <Card>
          <Card.Title>{currentFile.name}</Card.Title>
          {/* <Card.Divider /> */}
          <Card.Image
            source={{ uri: currentFile.thumbnailPath }}
            style={{ width: 350, height: 350 }}
          />
          <Text style={{ marginTop: 10, marginBottom: 10 }}>
            {currentFile.description}
          </Text>
          <Button
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="Edit Details"
            onPress={() =>
              navigation.navigate('Edit', {
                globalId: currentFile.globalId,
              })
            }
          />
        </Card>
      )}
      {currentFile && selectedIndex == 1 && (
        <View>
          <Text style={styles.inputTitle}>File Name</Text>
          <Text style={styles.inputText}>{currentFile.fileName}</Text>
          <Text style={styles.inputTitle}>File Size</Text>
          <Text style={styles.inputText}>{currentFile.fileSize}</Text>
          <Text style={styles.inputTitle}>File Hash</Text>
          <Text style={styles.inputText}>{currentFile.fileHash}</Text>
          <Text style={styles.inputTitle}>File Type</Text>
          <Text style={styles.inputText}>{currentFile.contentType}</Text>
        </View>
      )}
    </>
  );
}

export default FileView;
