import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as firebase from 'firebase';

export default function LoginScreen() {
  const navigation = useNavigation();

  login = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>App IoT</Text>

      <Image style={styles.logo} source={require('../Assets/logo.png')} />

      <View style={styles.viewTxtInputs}>
        <Text style={styles.txtDosInputsEBotao}>Login:</Text>
        <TextInput style={styles.txtInputs} />

        <Text style={styles.txtDosInputsEBotao}>Senha:</Text>
        <TextInput style={styles.txtInputs} />
      </View>

      <TouchableOpacity style={styles.botaoEntrar} onPress={login}>
        <Text style={styles.txtDosInputsEBotao}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.gambiarra}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1363DF'
  },

  titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#DFF6FF'
  },

  logo: {
    height: 150,
    width: '80%',
    borderRadius: 10,
  },

  viewTxtInputs: {
    gap: 10,
    width: '60%',
  },

  txtInputs: {
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#DFF6FF',
    borderColor: '#06283D',
  },

  botaoEntrar: {
    borderRadius: 20,
    padding: 8,
    width: '35%',
    alignItems: 'center',
    backgroundColor: '#47B5FF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },

  txtDosInputsEBotao: {
    color: '#DFF6FF',
    fontSize: 18
  },

  gambiarra: {
    height: '20%',
  },
});
