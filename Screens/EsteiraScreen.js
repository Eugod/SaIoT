import { useEffect, useState } from 'react';

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import * as firebase from 'firebase';

export default function EsteiraScreen() {
  const [consumo, setConsumo] = useState();

  const [horasDeUsoDiario, setHorasDeUsoDiario] = useState();
  const [minutosDeUsoDiario, setMinutosDeUsoDiario] = useState();

  const [horasDeUsoTotal, setHorasDeUsoTotal] = useState();
  const [minutosDeUsoTotal, setMinutosDeUsoTotal] = useState();

  const [flagLigaDesliga, setFlagLigaDesliga] = useState();

  const infosEsteiraRef = firebase.database().ref('ControleDeDados/esteira/');

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

        setConsumo(informacao[1].consumo);
        setHorasDeUsoDiario(informacao[1].horasDeUsoDiario);
        setMinutosDeUsoDiario(informacao[1].minutosDeUsoDiario);
        setHorasDeUsoTotal(informacao[1].horasDeUsoTotal);
        setMinutosDeUsoTotal(informacao[1].minutosDeUsoTotal);
        setFlagLigaDesliga(informacao[1].ligadoDesligado);

        formataValor(informacao[1].horasDeUsoDiario, setHorasDeUsoDiario);
        formataValor(informacao[1].minutosDeUsoDiario, setMinutosDeUsoDiario);
        formataValor(informacao[1].horasDeUsoTotal, setHorasDeUsoTotal);
        formataValor(informacao[1].minutosDeUsoTotal, setMinutosDeUsoTotal);
      });
  };

  function formataValor(valor, setValor) {
    console.log(valor)
    if (valor < 10) {
      setValor(`0${valor}`)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewInfos}>
        <View style={styles.viewConsumo}>
          <Text style={styles.txtInfos}>Consumo:</Text>

          <Text style={styles.valInfos}>{consumo} W</Text>
        </View>

        <View style={styles.viewUsoDiario}>
          <Text style={styles.txtInfos}>Tempo de uso diário:</Text>

          <Text style={styles.valInfos}>{horasDeUsoDiario}:{minutosDeUsoDiario} hrs</Text>
        </View>

        <View style={styles.viewUsoTotal}>
          <Text style={styles.txtInfos}>Tempo de uso total:</Text>

          <Text style={styles.valInfos}>{horasDeUsoTotal}:{minutosDeUsoTotal} hrs</Text>
        </View>
      </View>

      <View style={styles.viewBotoes}>
        <TouchableOpacity>
          <Feather name="power" size={50} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEmergencia}>
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