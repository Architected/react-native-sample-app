import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Store } from '../../state/storeProvider';
import { getFromStore } from '../../helper/storeHelper';
import * as authActionType from '../../state/constants/auth';
import PreAuthStackNavigator from '../navigators/preAuthStackNavigator';
import DrawerNavigator from '../navigators/drawerNavigator';

const Start = () => {
  const { state, dispatch } = React.useContext(Store);
  const { loggedIn } = state['auth'];

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let tokenWrapperFromStore;
      console.log('loggedIn:pre' + loggedIn);
      tokenWrapperFromStore = await getFromStore('__tokenWrapper');

      if (tokenWrapperFromStore) {
        console.log('token restored from store');
        console.log(
          'tokenWrapperFromStore' + JSON.stringify(tokenWrapperFromStore)
        );

        console.log(
          'tokenExpiryUTC:' + tokenWrapperFromStore.bearerToken.tokenExpiryUTC
        );

        const tokenExpiry = Date.parse(
          tokenWrapperFromStore.bearerToken.tokenExpiryUTC
        );
        const currentDate = Date.now();

        console.log('tokenExpiry:' + tokenExpiry);
        console.log('currentDate:' + currentDate);

        // todo:Add logic to restore using the refreshtoken once implemented
        if (tokenExpiry > currentDate) {
          dispatch({
            type: authActionType.USER_SIGNIN_RESTORE,
            payload: tokenWrapperFromStore,
          });
        } else {
          dispatch({
            type: authActionType.USER_SIGNIN_RESTORE,
            payload: null,
          });
        }
      }

      console.log('loggedIn:post' + loggedIn);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {!loggedIn ? <PreAuthStackNavigator /> : <DrawerNavigator />}
    </NavigationContainer>
  );
};

export default Start;
