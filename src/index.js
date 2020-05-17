import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native'
import { AppLoading } from 'expo';

import { OnboardingScreen, HomeScreen, DiscoverScreen, ProfileScreen } from './screens'




const MainStackWithNoTab= createStackNavigator();

export const Application = ()=> {
  const [isLoading, setLoading] = useState(true);
  const [hasCompleteBoarding, setCompleteBoarding] = useState('');
  const onBoardingComplete = (v)=>{
    setCompleteBoarding(v)
  }

  const checkFirstTime = async ()=> {
    return AsyncStorage
      .getItem('@boarding')
      .then(response => {
        if(response){
          setCompleteBoarding(response)
          setLoading(false)
        }
      })
  }

  if(isLoading){
    return (<AppLoading 
      startAsync={checkFirstTime} 
      onFinish={()=>{
        setLoading(false)
      }}
      onError={console.warn}
    />);
  }

  return (
    <NavigationContainer>
      <MainStackWithNoTab.Navigator headerMode="screen">
        { hasCompleteBoarding ? (
          <>
            <MainStackWithNoTab.Screen name="Home" component={HomeScreen} options={{
              headerShown: false,
              title: 'Cool'
            }}  />
            <MainStackWithNoTab.Screen name="Discover" component={DiscoverScreen} />
            <MainStackWithNoTab.Screen name="Profile" component={ProfileScreen} />
          </>
        ): (
          <MainStackWithNoTab.Screen name="First Install" options={{headerShown: false}}>
            {()=> <OnboardingScreen onComplete={onBoardingComplete}  />}
          </MainStackWithNoTab.Screen>
        )}
      </MainStackWithNoTab.Navigator>
    </NavigationContainer>
  )
}