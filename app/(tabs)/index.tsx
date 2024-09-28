import { Image, View, Button, Pressable, FlatList, SafeAreaView, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState } from "react";

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [grid, setGrid] = useState([
    {id: 1, takenBy: ''},
    {id: 2, takenBy: ''},
    {id: 3, takenBy: ''},
    {id: 4, takenBy: ''},
    {id: 5, takenBy: ''},
    {id: 6, takenBy: ''},
    {id: 7, takenBy: ''},
    {id: 8, takenBy: ''},
    {id: 9, takenBy: ''}
  ])

  const [currentTurn, setCurrentTurn] = useState("X")

  const restartGame = () => {

    setCurrentTurn("X")
    setGrid([
      {id: 1, takenBy: ''},
      {id: 2, takenBy: ''},
      {id: 3, takenBy: ''},
      {id: 4, takenBy: ''},
      {id: 5, takenBy: ''},
      {id: 6, takenBy: ''},
      {id: 7, takenBy: ''},
      {id: 8, takenBy: ''},
      {id: 9, takenBy: ''}
    ])
  }

  const pressHandler = (id) => {
    console.log(id)
    console.log(currentTurn)

    if (grid[id-1].takenBy === "") {
      console.log("TAKEN")

      setGrid(prevGrid => 


        prevGrid.map(item => 
          (item.id === id) && (item.takenBy === '')? { ...item, takenBy: currentTurn} : item
        )
      );
  
      setCurrentTurn((prevTurn) => {
        if (prevTurn == "X") {
          return "O";
        } else {
          return "X";
        }
      })
    } else {
      console.log("TAKEN")
    }


  }

  return (
    <SafeAreaView
      style={styles.container}>

      <Text style={styles.heading}>{currentTurn}'s turn</Text>

      <FlatList 
        data={grid}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={(id) => pressHandler(item.id)} style={styles.block}>
            <Text style={styles.blockText}>{item.takenBy}</Text>
          </TouchableOpacity>
          
        )}
      />
      <Pressable style={styles.button} onPress={restartGame}>
        <Text style={styles.text}>RESTART</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1, 
    flexDirection: 'column',

    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 40
  },
  block: {
    backgroundColor: "#ddd",
    height: 100,
    width: 100,
    padding: 5,
    margin: 5,

    alignItems: 'center',
    justifyContent: 'center'
  },

  blockText: {
    textAlign: 'center',
    fontSize: 40
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },


});
