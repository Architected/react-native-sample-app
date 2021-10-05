import { StyleSheet } from 'react-native';
export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    width: 300,
    alignItems: 'center',
  },
  button: {
    width: 200,
    marginTop: 10,
    color: '#fff',
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
  labelText: {
    //flex: 1,
    color: 'black',
    margin: 10,
    marginLeft: 0,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  linkText: {
    //flex: 1,
    color: 'black',
    margin: 10,
    marginLeft: 0,
    textAlign: 'left',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    margin: 10,
    width: '95%',
  },
  scrollContainerImage: {
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    width: 300,
    height: 300,
  },
});
