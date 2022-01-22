import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import NavHeader from '../utility/navHeader';
import { Store } from '../../state/storeProvider';
import { getGridDisplayName } from 'architected-client/helper/fileHelper.js';
import { fileClient } from '../../service/defaultServices';

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
function FileListView({ navigation }) {
  const { state, dispatch } = React.useContext(Store);
  const { bearerToken } = state['auth'];
  const { isLoadingList, loadingError, files } = state['file'];

  React.useEffect(() => {
    reloadHandler();
  }, []);

  const reloadHandler = async () => {
    await fileClient.getAllFiles(dispatch, bearerToken.tokenValue);
  };

  const keyExtractor = (item, index) => item.globalId;

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('File', {
          globalId: item.globalId,
        })
      }
    >
      <Avatar size="large" source={{ uri: item.thumbnailPath }} />
      <ListItem.Content>
        <ListItem.Title>{getGridDisplayName(item)}</ListItem.Title>
        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <>
      <View>
        <NavHeader
          titleText="My Files"
          includeToggle={true}
          //includeAdd={true}
          navigation={navigation}
          //addHandler={addHandler}
          includeReload={true}
          reloadHandler={reloadHandler}
        />
      </View>
      {isLoadingList ? (
        <>
          <View style={[listStyles.container, listStyles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </>
      ) : loadingError ? (
        <Text>{loadingError}</Text>
      ) : files && files.length == 0 ? (
        <View style={[listStyles.container, listStyles.horizontal]}>
          <Text>You have not uploaded any files yet!</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={keyExtractor}
          data={files}
          renderItem={renderItem}
        />
      )}
    </>
  );
}

export default FileListView;
