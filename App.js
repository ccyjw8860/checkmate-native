import React, {useState} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AppLoading } from 'expo'
import {Asset} from 'expo-asset';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Gate from "./components/Gate";
import { Provider } from "react-redux";
import store from './redux/store';

const cacheImages = images => images.map(image => {
  if(typeof image === 'string'){
    return Image.prefetch(image)
  }else{
    return Asset.fromModule(image).downloadAsync()
  }
})

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font))

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const loadAssets = async() =>{
    const images = [require('./assets/loading.png')];
    const fonts = [Ionicons.font];
    const imagePromises =  cacheImages(images);
    const fontPromises = cacheFonts(fonts);

    return Promise.all([...imagePromises, ...fontPromises]);
  }
  return isReady ? (
    <Provider store={store}>
      <Gate/>
    </Provider>
  ) : <AppLoading onError={console.error} onFinish={handleFinish} startAsync={loadAssets}/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});