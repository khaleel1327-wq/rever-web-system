import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React, { useRef } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {
  const speak = (text: string) => {
    Speech.speak(text);
  };

  const AnimatedButton = ({ 
    text, 
    imageSource,
  }: {
      text: string;
      imageSource: any;
  }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPress = () => {
      speak(text);

      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    };

    
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        speak(text);
      }}
    >
      {imageSource && (
        <Image
          source={imageSource}
          style={{ width: 50, height: 50, marginBottom: 8 }}
        />
      )}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );



  };

  return (
    <SafeAreaView style={styles.container}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Ionicons name="menu" size={24} color="#fff" />
        <Text style={styles.title}>Username</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Buttons Grid */}
      <View style={styles.grid}>
        <AnimatedButton text="Washroom" 
        imageSource={require("../../assets/images/images/toilet.png")}/>
        <AnimatedButton text="Hungry" 
         imageSource={require("../../assets/images/images/hungry.png")}  />
        <AnimatedButton text="Sick" 
         imageSource={require("../../assets/images/images/sick.png")} />
        <AnimatedButton text="Sad" 
        imageSource={require("../../assets/images/images/sad.png")} />
      </View>

      {/* Bottom Home Button */}
      <TouchableWithoutFeedback onPress={() => alert('Home tapped!')}>
        <View style={styles.homeButton}>
          <Ionicons name="home" size={35} color="#fff" />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    height: 60,
    backgroundColor: '#64b5f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '47%',
    height: 140,
    backgroundColor: '#90caf9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  homeButton: {
    height: 60,
    backgroundColor: '#81c784',
    margin: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
