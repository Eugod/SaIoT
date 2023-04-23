import { useEffect, useState } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';

import { Feather, FontAwesome } from '@expo/vector-icons'; 

import * as firebase from 'firebase';

export default function ArCondicionadoScreen() {
  const [consumo, setConsumo] = useState();
  
  const [temperaturaAmbiente, setTemperaturaAmbiente] = useState();
  
  const [temperaturaArCondicionado, setTemperaturaArCondicionado] = useState(21);
  
  let [flagLigaDesliga, setFlagLigaDesliga] = useState();
  
  const infosArCondicionadoRef = firebase.database().ref('ControleDeDados/arCondicionado/');

  useEffect(() => {
    carregarInfo();
  }, []);

  const carregarInfo = () => {
    firebase
      .database()
      .ref('ControleDeDados/')
      .on('value', (snapshot) => {
        const informacao = [];
        snapshot.forEach((info) => {
          informacao.push(info.val());
        });

        setTemperaturaAmbiente(informacao[0].temperaturaAmbiente);
        setConsumo(informacao[0].consumo);
        setFlagLigaDesliga(informacao[0].ligadoDesligado);
      });
  };

  const aumentaTemperatura = () => {
    if(temperaturaArCondicionado < 26) {
      setTemperaturaArCondicionado(temperaturaArCondicionado + 1);
    }
  }

  const diminuiTemperatura = () => {
    if(temperaturaArCondicionado > 16) {
      setTemperaturaArCondicionado(temperaturaArCondicionado - 1);
    }
  }
  
  const ligaDesliga = () => {
    if(flagLigaDesliga == 0) {
      console.log('Ligado!');
      infosArCondicionadoRef.update({'ligadoDesligado': 1});
    } else {
      console.log('Desligado!');
      infosArCondicionadoRef.update({'ligadoDesligado': 0});
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.viewInfos}>
        <View style={styles.viewAmbiente}>
          <Text style={styles.txtAmbitente}>Ambiente</Text>

          <Text style={styles.tempAmbiente}>{temperaturaAmbiente}º</Text>
        </View>

        <View style={styles.viewArCondicionado}>
          <Text style={styles.tempArCondicionado}>{temperaturaArCondicionado}º</Text>
        </View>

        <View style={styles.viewConsumo}>
          <Text style={styles.txtConsumo}>Consumo</Text>

          <Text style={styles.consumo}>{consumo} W</Text>
        </View>
      </View>

      <View style={styles.viewBotoes}>
        <TouchableOpacity onPress={aumentaTemperatura}>
        <FontAwesome name="arrow-circle-up" size={50} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={diminuiTemperatura}>
        <FontAwesome name="arrow-circle-down" size={50} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={ligaDesliga}>
        <Feather name="power" size={50} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },

  viewInfos: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: '30%',
    justifyContent: 'space-between',
  },

  viewAmbiente: {
    width: '33%',
    borderRightWidth: 2,
    alignItems: 'center',
    padding: 10,
  },

  txtAmbitente: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: '50%',
  },

  tempAmbiente: {
    fontSize: 18
  },

  viewArCondicionado: {
    width: '34%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tempArCondicionado: {
    fontWeight: 'bold',
    fontSize: 65,
  },

  viewConsumo: {
    width: '33%',
    borderLeftWidth: 2,
    alignItems: 'center',
    padding: 10,
  },

  txtConsumo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: '50%',
  },

  consumo: {
    fontSize: 18
  },

  viewBotoes: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: '20%',
    marginBottom: '20%'
  },
})