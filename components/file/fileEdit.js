import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Button, Input, ButtonGroup } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import NavHeader from '../utility/navHeader';
import { Store } from '../../state/storeProvider';
import { updateFileAction } from '../../state/actions/file';

const editStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
  button: {
    width: 200,
    marginTop: 10,
    padding: 10,
  },
  errorText: {
    color: 'red',
    margin: 10,
    marginLeft: 0,
    paddingLeft: 10,
  },
});

function FileEdit({ navigation, route }) {
  const { globalId } = route.params;

  const { state, dispatch } = React.useContext(Store);
  const { bearerToken } = state['auth'];
  const { files, isUpdatingFile } = state['file'];

  const [currentFile, setCurrentFile] = React.useState({});

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  React.useEffect(() => {
    console.log('globalId:' + globalId);
    console.log('files:' + JSON.stringify(files));
    const file = files.find((item) => item.globalId == globalId);
    setCurrentFile(file);
    setValue('name', file.name);
    setValue('description', file.description);
  }, []);

  // const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSubmit = async (data) => {
    var fileUpdateRequest = {
      globalId: currentFile.globalId,
      name: data.name,
      description: data.description,
    };
    console.log('fileUpdateRequest', JSON.stringify(fileUpdateRequest));
    await updateFileAction(fileUpdateRequest, dispatch, bearerToken.tokenValue);

    navigation.navigate('FileList');
  };

  console.log('currentFile.name: ' + currentFile.name);
  console.log('currentFile.description: ' + currentFile.description);

  return (
    <>
      <View>
        <NavHeader
          includeBack={true}
          titleText="Edit"
          navigation={navigation}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" style={editStyles.container}>
        <View>
          <Text style={editStyles.inputTitle}>Title</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Title"
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="name"
            rules={{
              required: 'Please enter a title',
            }}
          />
          {errors.name && (
            <Text style={editStyles.errorText}>{errors.name.message}</Text>
          )}
          <Text style={editStyles.inputTitle}>Description</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Description"
                multiline
                numberOfLines={4}
                value={value}
                style={{ padding: 10 }}
                onChangeText={(value) => onChange(value)}
              />
            )}
            name="description"
            rules={{ required: 'Please enter a description' }}
          />
          {errors.description && (
            <Text style={editStyles.errorText}>
              {errors.description.message}
            </Text>
          )}
        </View>
        <Button
          containerStyle={editStyles.button}
          onPress={handleSubmit(onSubmit)}
          title="Save"
          loading={isUpdatingFile}
        />
      </KeyboardAvoidingView>
    </>
  );
}

export default FileEdit;
