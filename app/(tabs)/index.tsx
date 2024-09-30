import { Image, View, Button, Alert, Pressable, FlatList, SafeAreaView, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState } from "react";

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [grid, setGrid] = useState([
    {id: 1, takenBy: '', bgColor: '#ddd'},
    {id: 2, takenBy: '', bgColor: '#ddd'},
    {id: 3, takenBy: '', bgColor: '#ddd'},
    {id: 4, takenBy: '', bgColor: '#ddd'},
    {id: 5, takenBy: '', bgColor: '#ddd'},
    {id: 6, takenBy: '', bgColor: '#ddd'},
    {id: 7, takenBy: '', bgColor: '#ddd'},
    {id: 8, takenBy: '', bgColor: '#ddd'},
    {id: 9, takenBy: '', bgColor: '#ddd'}
  ]);

  const [currentlyPlaying, setCurrentlyPlaying] = useState(true);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [numMoves, setNumMoves] = useState(0);
  const [displayText, setDisplayText] = useState(currentTurn + "'s turn");

  const restartGame = () => {
    setDisplayText(currentTurn + "'s turn")
    setCurrentlyPlaying(true);
    setCurrentTurn("X"); // X goes first
    setGrid([
      {id: 1, takenBy: '', bgColor: '#ddd'},
      {id: 2, takenBy: '', bgColor: '#ddd'},
      {id: 3, takenBy: '', bgColor: '#ddd'},
      {id: 4, takenBy: '', bgColor: '#ddd'},
      {id: 5, takenBy: '', bgColor: '#ddd'},
      {id: 6, takenBy: '', bgColor: '#ddd'},
      {id: 7, takenBy: '', bgColor: '#ddd'},
      {id: 8, takenBy: '', bgColor: '#ddd'},
      {id: 9, takenBy: '', bgColor: '#ddd'}
    ]);
  }

  
  const updateGridColors = (ids: string, newColor: string) => {
    console.log("updateGridColors called", ids)

    setGrid(prevGrid => 
      prevGrid.map(item =>
        ids.includes(item.id.toString()) ? { ...item, bgColor: newColor } : item
      )
    );

    // console.log(grid);
    
  };

  useEffect(() => {
    setDisplayText(currentTurn + "'s turn")
    checkWinner();
  }, [currentTurn]);

  const checkWinner = () => {
    // vertical
    const winning_combinations = ['123', '456', '789', '147', '258', '369', '357', '159']
    let numEmptyCells = 0;
    
    for (var i = 0; i < winning_combinations.length; i++){

      const combination = winning_combinations[i];
      let current_total = 0;

      for (var j = 0; j < combination.length; j++){
        const idx = parseInt(combination[j]) - 1

        // console.log(grid[idx].takenBy);
        if (grid[idx].takenBy == "X") {
          current_total++;
        } else if (grid[idx].takenBy == "O") {
          current_total--;
        } else {
          numEmptyCells++;
        }
      }
      // console.log(current_total);

      if (current_total == 3) {
        // winner is X
        
        setDisplayText("X WON")
        setCurrentlyPlaying(false);
        updateGridColors(combination, "#90EE90");

        return "X";
      } else if (current_total == -3) {
        // winner is O
        setDisplayText("O WON")
        setCurrentlyPlaying(false);
        updateGridColors(combination, "#90EE90");

        return "O";
      }
    }

    if (numEmptyCells == 0){
      setDisplayText("TIE");
    }

    return "";
  }

  const pressHandler = (id) => {
    console.log(id, currentTurn)



    if (currentlyPlaying == false) return;

    if (grid[id-1].takenBy === "") {
      setGrid(prevGrid => 
        prevGrid.map(item => 
          (item.id === id) && (item.takenBy === '')? { ...item, bgColor: "#ccc", takenBy: currentTurn} : item
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

      <Text style={styles.heading}>{displayText}</Text>

      <FlatList 
        data={grid}
        keyExtractor={(item) => item.id}
        style = {styles.flatList}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={(id) => pressHandler(item.id)} style={[styles.block, {backgroundColor: item.bgColor}]}>
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

  flatList: {
    height: 'auto',
    margin: 20,
    flexGrow: 0
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 2,
    backgroundColor: '#444',
  },
  text: {
    fontSize: 21,
    lineHeight: 32,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },


});
