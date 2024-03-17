import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_100Thin, Poppins_700Bold, Poppins_300Light } from '@expo-google-fonts/poppins';


const WelcomeScreen = () => {
  const link = 'https://65eee57e4ab57031dd1571d9--celebrated-nasturtium-afa7fe.netlify.app/';
  const navigation = useNavigation();

  const [fontLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_700Bold,
    Poppins_300Light
  });

  const handleWebsitePress = () => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.main}>
      <View style={{ backgroundColor: '#3498DB', flex: 1, marginHorizontal: 20, marginVertical: 30, borderRadius: 20, paddingHorizontal: 30, paddingVertical: 30 }}>
        <View style={{ alignItems: 'center', flexDirection: "column", marginTop: 60 }}>
          <Image source={require('../assets/ipIcon.png')} style={{ width: 350, height: 350 }} />
          <TouchableOpacity onPress={() => navigation.navigate('home')} style={styles.btn}>
            <Text style={{ fontSize: 30,fontFamily: "Poppins_300Light" }}>Let's start</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 200 }}>
            <TouchableOpacity onPress={handleWebsitePress}>
              <Text style={{ fontSize: 18,fontFamily: "Poppins_300Light" }}>Try our website by clicking <Text style={{ color: "#c93c5d" }}>Here</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 5
  },
  btn:{
    shadowColor: 'white',
    shadowOffset: { width: 2, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    backgroundColor: "white",
    borderRadius: 20, 
    width: 160, 
    height: 60, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 30
  }
});
