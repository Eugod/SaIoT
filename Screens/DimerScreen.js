import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as firebase from 'firebase';
import CircularSlider from 'rn-circular-slider'

console.disableYellowBox = true

export default function DimerScreen() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    carregarInfo();
    setValue(0);
  }, []);

  useEffect(() => {
    let a = value
    firebase.database().ref('ControleDeDados/dimer/').update({ 'porcentagemDeIluminacao': a });
  }, [value])

  const carregarInfo = () => {
    const databaseRef = firebase.database().ref('ControleDeDados/');
    const valueListener = databaseRef.on('value', (snapshot) => {
      const informacao = [];
      snapshot.forEach((info) => {
        informacao.push(info.val());
      });

      setValue(informacao[1].porcentagemDeIluminacao);
    });
  }

  return (
    <View style={styles.container}>
      <CircularSlider
        step={1}
        min={0}
        max={100}
        value={value}
        onChange={value => setValue(value)}
        contentContainerStyle={styles.contentContainerStyle}
        strokeWidth={20}
        buttonBorderColor="#06283D"
        buttonFillColor="#DFF6FF"
        buttonStrokeWidth={10}
        openingRadian={Math.PI / 6}
        buttonRadius={10}
        linearGradient={[{ stop: '0%', color: '#B9DFED' }, { stop: '100%', color: '#0248b5' }]}
      >
        <Text style={styles.value}>{value}</Text>
      </CircularSlider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1363DF',
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  value: {
    fontWeight: '500',
    fontSize: 32,
    color: '#DFF6FF'
  }
});