import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import NavHeader from '../utility/navHeader';
import { Store } from '../../state/storeProvider';
import { getProfile, saveProfile } from '../../state/actions/profile';

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

function ProfileEdit({ navigation }) {
  const { state, dispatch } = React.useContext(Store);
  const {
    bearerToken,
    isLoadingItem,
    loadingError,
    isUpdatingItem,
    updatingError,
  } = state['auth'];
  const {} = state['global'];

  const [profile, setProfile] = React.useState({
    globalId: '',
    firstName: '',
    middleName: '',
    lastName: '',
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  React.useEffect(() => {
    getProfile(dispatch, bearerToken.tokenValue).then((data) => {
      if (data && !data.InError) {
        setProfile(data);

        setValue('firstName', data.firstName);
        setValue('middleName', data.middleName);
        setValue('lastName', data.lastName);
        console.log('value set');
      }
    });
  }, []);

  const updateProfile = async (data) => {
    // generate a code verifier
    var profileUpdateRequest = {
      globalId: profile.globalId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    };
    console.log('profileUpdateRequest' + JSON.stringify(profileUpdateRequest));
    await saveProfile(profileUpdateRequest, dispatch, bearerToken.tokenValue);

    navigation.goBack(null);
  };

  return (
    <>
      <View>
        <NavHeader
          includeBack={true}
          titleText="Edit Profile"
          navigation={navigation}
        />
      </View>
      {isLoadingItem ? (
        <>
          <View style={[listStyles.container, listStyles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </>
      ) : loadingError ? (
        <Text style={editStyles.errorText}>{loadingError}</Text>
      ) : (
        <KeyboardAvoidingView behavior="padding" style={editStyles.container}>
          <View>
            <Text style={editStyles.inputTitle}>First name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  //placeholder="First name"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="firstName"
              rules={{
                required: 'Please enter a first name',
              }}
            />
            {errors.firstName && (
              <Text style={editStyles.errorText}>
                {errors.firstName.message}
              </Text>
            )}
            <Text style={editStyles.inputTitle}>Middle name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  //placeholder="Middle name"
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              name="middleName"
            />
            {errors.middleName && (
              <Text style={editStyles.errorText}>
                {errors.middleName.message}
              </Text>
            )}
            <Text style={editStyles.inputTitle}>Last name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  //placeholder="Last name"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="lastName"
              rules={{
                required: 'Please enter a last name',
              }}
            />
            {errors.lastName && (
              <Text style={editStyles.errorText}>
                {errors.lastName.message}
              </Text>
            )}
          </View>
          <Button
            containerStyle={editStyles.button}
            onPress={handleSubmit(updateProfile)}
            title="Save"
            loading={isUpdatingItem}
          />
        </KeyboardAvoidingView>
      )}
    </>
  );
}

export default ProfileEdit;
