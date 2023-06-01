import { useEffect, useState } from 'react';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import * as firebase from 'firebase';

import { calculaConsumo } from '../Assets/funcaoCalculaConsumo';

import fetch from 'cross-fetch';

let esp32Ip;

export default function EsteiraScreen() {
  const [consumo, setConsumo] = useState(0);

  const [horasDeUsoDiario, setHorasDeUsoDiario] = useState();
  const [minutosDeUsoDiario, setMinutosDeUsoDiario] = useState();

  const [horasDeUsoTotal, setHorasDeUsoTotal] = useState();
  const [minutosDeUsoTotal, setMinutosDeUsoTotal] = useState();

  const [flagLigaDesliga, setFlagLigaDesliga] = useState();

  const infosEsteiraRef = firebase.database().ref('ControleDeDados/esteira/');

  useEffect(() => {
    carregarInfo();
    carregarIp();
  }, []);

  useEffect(() => {
    firebase.database().ref('ControleDeDados/esteira/').update({ 'consumo': calculaConsumo(14920, horasDeUsoDiario).toFixed(2) });
  }, [horasDeUsoDiario]);

  const carregarInfo = () => {
    firebase
      .database()
      .ref('ControleDeDados/')
      .on('value', (snapshot) => {
        const informacao = [];
        snapshot.forEach((info) => {
          informacao.push(info.val());
        });

        setHorasDeUsoTotal(informacao[2].horasDeUsoTotal);
        setMinutosDeUsoTotal(informacao[2].minutosDeUsoTotal);
        setHorasDeUsoDiario(informacao[2].horasDeUsoDiario);
        setMinutosDeUsoDiario(informacao[2].minutosDeUsoDiario);
        setFlagLigaDesliga(informacao[2].ligadoDesligado);
        setConsumo(informacao[2].consumo);
      });
  };

  const carregarIp = () => {
    firebase
      .database()
      .ref('IP/')
      .on('value', (snapshot) => {
        esp32Ip = snapshot.val();
      })
  }

  const ligaDesliga = () => {
    if (flagLigaDesliga == 0) {
      console.log('Ligado!');
      infosEsteiraRef.update({ 'ligadoDesligado': 1 });
      iniciarTimer();
    } else {
      console.log('Desligado!');
      infosEsteiraRef.update({ 'ligadoDesligado': 0 });
      pararTimer();
    }
  }

  const iniciarTimer = async () => {
    try {
      await fetch('http://10.0.1.153:3000/timer/start', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Erro ao iniciar a contagem de tempo:', error);
    }
  };

  const pararTimer = async () => {
    try {
      await fetch('http://10.0.1.153:3000/timer/stop', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Erro ao parar a contagem de tempo:', error);
    }
  };

  const paradaDeEmergencia = () => {
    fetch(`http://${esp32Ip}/off`);
  }

  function formataValor(valor) {
    if (valor < 10) {
      return `0${valor}`;
    } else {
      return valor;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewInfos}>
        <View style={styles.viewConsumo}>
          <Text style={styles.txtInfos}>Consumo:</Text>

          <Text style={styles.valInfos}>{consumo} kW/h</Text>
        </View>

        <View style={styles.viewUsoDiario}>
          <Text style={styles.txtInfos}>Tempo de uso diário:</Text>

          <Text style={styles.valInfos}>{formataValor(horasDeUsoDiario)}:{formataValor(minutosDeUsoDiario)} hrs</Text>
        </View>

        <View style={styles.viewUsoTotal}>
          <Text style={styles.txtInfos}>Tempo de uso total:</Text>

          <Text style={styles.valInfos}>{formataValor(horasDeUsoTotal)}:{formataValor(minutosDeUsoTotal)} hrs</Text>
        </View>
      </View>

      <View style={styles.viewBotoes}>
        <TouchableOpacity onPress={ligaDesliga}>
          <Feather name="power" size={50} color={flagLigaDesliga === 1 ? '#00FF00' : '#06283D'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEmergencia} onPress={paradaDeEmergencia}>
          <Text style={styles.txtBotaoEmergencia}>Emergência</Text>
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
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 10,
    width: '90%',
    height: '40%',
    justifyContent: 'space-between',
    borderColor: '#DFF6FF'
  },

  txtInfos: {
    fontSize: 20,
    color: '#DFF6FF'
  },

  valInfos: {
    fontSize: 20,
    color: '#DFF6FF'
  },

  viewConsumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 2,
    height: '33%',
    alignItems: 'center',
    borderColor: '#DFF6FF'
  },

  viewUsoDiario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: '33%',
    alignItems: 'center',
  },

  viewUsoTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 2,
    height: '33%',
    alignItems: 'center',
    borderColor: '#DFF6FF'
  },

  viewBotoes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: '25%',
    marginBottom: '20%',
    width: '100%'
  },

  botaoEmergencia: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    width: '35%',
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },

  txtBotaoEmergencia: {
    color: '#DFF6FF'
  },
})
