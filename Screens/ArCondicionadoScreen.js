import { useEffect, useState } from 'react';

import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';

import { Feather, FontAwesome } from '@expo/vector-icons';

import * as firebase from 'firebase';

import { calculaConsumo } from '../Assets/funcaoCalculaConsumo';

let localTunnelUrl;

export default function ArCondicionadoScreen() {
  const [consumo, setConsumo] = useState();

  const [temperaturaAmbiente, setTemperaturaAmbiente] = useState();

  const [temperaturaArCondicionado, setTemperaturaArCondicionado] = useState();

  const [flagLigaDesliga, setFlagLigaDesliga] = useState();

  const [horasDeUso, setHorasDeUso] = useState();

  const infosArCondicionadoRef = firebase.database().ref('ControleDeDados/arCondicionado/');

  useEffect(() => {
    carregarInfo();
    carregarUrlTunnel();
  }, []);

  useEffect(() => {
    firebase.database().ref('ControleDeDados/arCondicionado/').update({ 'consumo': calculaConsumo(1690, horasDeUso).toFixed(2) });
  }, [horasDeUso]);

  const carregarInfo = () => {
    firebase
      .database()
      .ref('ControleDeDados/')
      .on('value', (snapshot) => {
        const informacao = [];
        snapshot.forEach((info) => {
          informacao.push(info.val());
        });

        setTemperaturaArCondicionado(informacao[0].temperatura);
        setTemperaturaAmbiente(informacao[0].temperaturaAmbiente);
        setHorasDeUso(informacao[0].horasDeUso);
        setConsumo(informacao[0].consumo);
        setFlagLigaDesliga(informacao[0].ligadoDesligado);
      });
  };

  const carregarUrlTunnel = () => {
    firebase
      .database()
      .ref('LocalTunnel/localtunnelURL/')
      .on('value', (snapshot) => {
        localTunnelUrl = snapshot.val();
        console.log(localTunnelUrl);
      })
  };

  const aumentaTemperatura = () => {
    if (temperaturaArCondicionado < 26) {
      infosArCondicionadoRef.update({ 'temperatura': temperaturaArCondicionado + 1 });
    }
  }

  const diminuiTemperatura = () => {
    if (temperaturaArCondicionado > 16) {
      infosArCondicionadoRef.update({ 'temperatura': temperaturaArCondicionado - 1 });
    }
  }

  const ligaDesliga = () => {
    if (flagLigaDesliga == 0) {
      console.log('Ligado!');
      infosArCondicionadoRef.update({ 'ligadoDesligado': 1 });
      iniciarTimer();
    } else {
      console.log('Desligado!');
      infosArCondicionadoRef.update({ 'ligadoDesligado': 0 });
      pararTimer();
    }
  }

  const iniciarTimer = async () => {
    try {
      await fetch(`${localTunnelUrl}/timer/iniciar`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Erro ao iniciar a contagem de tempo:', error);
    }
  };

  const pararTimer = async () => {
    try {
      await fetch(`${localTunnelUrl}/timer/parar`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Erro ao parar a contagem de tempo:', error);
    }
  };

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

          <Text style={styles.consumo}>{consumo} kW/h</Text>
        </View>
      </View>

      <View style={styles.viewBotoes}>
        <TouchableOpacity onPress={aumentaTemperatura}>
          <FontAwesome name="arrow-circle-up" size={50} color={'#06283D'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={diminuiTemperatura}>
          <FontAwesome name="arrow-circle-down" size={50} color={'#06283D'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={ligaDesliga}>
          <Feather name="power" size={50} color={flagLigaDesliga === 1 ? '#00FF00' : '#06283D'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#1363DF',
  },

  viewInfos: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    width: '90%',
    height: '30%',
    justifyContent: 'space-between',
    borderColor: '#DFF6FF'
  },

  viewAmbiente: {
    width: '33%',
    borderRightWidth: 2,
    alignItems: 'center',
    padding: 10,
    borderColor: '#DFF6FF'
  },

  txtAmbitente: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: '50%',
    color: '#DFF6FF'
  },

  tempAmbiente: {
    fontSize: 18,
    color: '#DFF6FF'
  },

  viewArCondicionado: {
    width: '34%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tempArCondicionado: {
    fontWeight: 'bold',
    fontSize: 65,
    color: '#DFF6FF'
  },

  viewConsumo: {
    width: '33%',
    borderLeftWidth: 2,
    alignItems: 'center',
    padding: 10,
    borderColor: '#DFF6FF'
  },

  txtConsumo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: '50%',
    color: '#DFF6FF'
  },

  consumo: {
    fontSize: 18,
    color: '#DFF6FF'
  },

  viewBotoes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: '20%',
    marginBottom: '20%'
  },
})
