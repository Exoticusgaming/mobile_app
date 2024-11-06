import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#eeeeee',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  input: {
    height: 40,
    width:'55%',
    borderColor: 'black',
    backgroundColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingLeft: 8,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '50%',
  },
  button: {
    borderColor: 'black',
    padding: 5,
    flex: 'center',
    borderWidth: 1,
    borderRadius: 15,
    textAlign: "center",
    margin: 5,
  },
  message: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderWidth: 5,
    borderRadius: 950,
  },
  paragraph: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: "center",
      color: "black",
  }
});
 