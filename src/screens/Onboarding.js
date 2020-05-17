import React from 'react';
import {View, Text, Button} from 'react-native-ui-lib';
import { AsyncStorage } from 'react-native'


export const OnboardingScreen = ({onComplete})=> {

  const _onComplete=async ()=>{
    try {
      const d = new Date().toString()
      await AsyncStorage.setItem('@boarding', d);
      onComplete(d)
    } catch (error) {
      
    }
  }



  return (
    <View flex paddingH-25 paddingT-120>
     <View><Text text30 center>Onboarding Screen</Text></View>
     <View marginT-75>
      <Text text70>
        This screen will appear only when the user launches the application for the first time after installation.
        This is the place to make your first impression.
        Don't miss it.
      </Text>
     </View>
     <View marginT-50>
      <Button
          label="Continue"
          borderRadius={5}
          onPress={_onComplete}
        />
     </View>
    </View>
  );
}