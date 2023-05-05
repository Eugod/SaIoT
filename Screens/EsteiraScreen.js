import { useEffect, useState } from 'react';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import * as firebase from 'firebase';

import { calculaConsumo } from '../Assets/funcaoCalculaConsumo';

import fetch from 'cross-fetch';

let esp32Ip;

export default function EsteiraScreen() {
  const [consumo, setConsumo] = useState(0);

  const [horasDeUsoDiario, setHorasDeUsoDiario] = useState(0);
  const [minutosDeUsoDiario, setMinutosDeUsoDiario] = useState(0);

  const [horasDeUsoTotal, setHorasDeUsoTotal] = useState();
  const [minutosDeUsoTotal, setMinutosDeUsoTotal] = useState();

  const [flagLigaDesliga, setFlagLigaDesliga] = useState();

  const infosEsteiraRef = firebase.database().ref('ControleDeDados/esteira/');

  useEffect(() => {
    carregarInfo();
    carregarIp();
  }, []);

  useEffect(() => {
    let intervalId = null;

    if (flagLigaDesliga == 1) {
      intervalId = setInterval(() => {
        setMinutosDeUsoDiario(minutosDeUsoDiario => {
          if (minutosDeUsoDiario >= 59) {
            setHorasDeUsoDiario(horasDeUsoDiario => horasDeUsoDiario + 1);
            return 0;
          } else {
            return minutosDeUsoDiario + 1;
          }
        });

        setMinutosDeUsoTotal(minutosDeUsoTotal => {
          if (minutosDeUsoTotal >= 59) {
            setHorasDeUsoTotal(horasDeUsoTotal => horasDeUsoTotal + 1);

            firebase.database().ref('ControleDeDados/esteira/').update({
              'horasDeUsoTotal': horasDeUsoTotal + 1,
              'minutosDeUsoTotal': 0,
            });

            return 0;
          } else {
            firebase.database().ref('ControleDeDados/esteira/').update({ 'minutosDeUsoTotal': minutosDeUsoTotal + 1 });

            return minutosDeUsoTotal + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [flagLigaDesliga]);

  useEffect(() => {
    setConsumo(calculaConsumo(14920, horasDeUsoDiario).toFixed(2));
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
        setFlagLigaDesliga(informacao[2].ligadoDesligado);
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
    } else {
      console.log('Desligado!');
      infosEsteiraRef.update({ 'ligadoDesligado': 0 });
    }
  }

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
          <Feather name="power" size={50} color={'black'} />
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
    paddingTop: 10
  },

  viewInfos: {
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: '40%',
    justifyContent: 'space-between',
  },

  txtInfos: {
    fontSize: 20
  },

  valInfos: {
    fontSize: 20
  },

  viewConsumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 2,
    height: '33%',
    alignItems: 'center',
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
    backgroundColor: 'red',
    borderColor: 'red'
  },

  txtBotaoEmergencia: {
    color: 'white'
  },
})
