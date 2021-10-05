import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Constants from 'expo-constants';

const navStyles = StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

const NavHeader = ({
  titleText,
  includeToggle,
  includeBack,
  includeAdd,
  includeReload,
  includeFile,
  navigation,
  addHandler,
  downloadHandler,
  deleteHandler,
  reloadHandler,
}) => {
  const toggle = {
    icon: 'menu',
    color: '#fff',
    onPress: () => navigation.toggleDrawer(),
  };

  const back = {
    icon: 'arrow-back',
    color: '#fff',
    onPress: () => navigation.goBack(null),
  };

  const add = {
    icon: 'add',
    color: '#fff',
    onPress: () => addHandler(),
  };

  const reload = {
    icon: 'refresh',
    color: '#fff',
    onPress: () => reloadHandler(),
  };

  console.log('includeReload' + includeReload);
  console.log('includeFile' + includeReload);
  return (
    <>
      <View style={{ marginTop: Constants.statusBarHeight / 2 }}>
        <Header
          placement="left"
          leftComponent={includeToggle ? toggle : includeBack ? back : null}
          centerComponent={{ text: titleText, style: navStyles.heading }}
          rightComponent={
            includeReload
              ? reload
              : includeFile && (
                  <View style={navStyles.headerRight}>
                    {/* <TouchableOpacity onPress={() => downloadHandler()}>
                      <Icon type="antdesign" name="download" color="white" />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{ marginLeft: 10 }}
                      onPress={() => deleteHandler()}
                    >
                      <Icon type="antdesign" name="delete" color="white" />
                    </TouchableOpacity>
                  </View>
                )
          }
        />
      </View>
    </>
  );
};

export default NavHeader;
