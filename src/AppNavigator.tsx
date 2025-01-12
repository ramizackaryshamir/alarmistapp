import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.tsx';
import AlarmSettingsScreen from './components/AlarmPicker/screens/AlarmSettingsScreen';
import AlarmSettingsRepeatOptionsScreen from './components/AlarmPicker/screens/AlarmSettingsRepeatOptionsScreen';
import AlarmSettingsSoundOptionsScreen from './components/AlarmPicker/screens/AlarmSettingsSoundOptionsScreen';
import ClockScreen from './screens/ClockScreen.tsx';
import Menu from './components/Menu';
import {Colors} from './lib/Colors.ts';
import {useDarkMode} from './hooks/useDarkMode.ts';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {theme} = useDarkMode();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerStyle: {backgroundColor: Colors.blackPurple1},
              headerTintColor: Colors.white,
              headerShown: true,
              headerRight: () => <Button title="+" />,
            }}
          />
          <Stack.Screen
            name="Alarm Settings Screen"
            component={AlarmSettingsScreen}
            options={{
              headerStyle: {
                backgroundColor:
                  theme === 'dark' ? Colors.blackPurple1 : Colors.vibrantWhite,
              },
              headerBackTitle: 'Cancel',
              headerTintColor:
                theme === 'dark' ? Colors.white : Colors.blackPurple1,
              headerShown: true,
              headerRight: () => <Button title="Save" />,
              //headerTintColor: '#F2D935',
              //presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="Repeat"
            component={AlarmSettingsRepeatOptionsScreen}
            options={{
              headerStyle: {backgroundColor: Colors.blackPurple1},
              headerTintColor: Colors.white,
              headerShown: true,
              headerLeft: () => <Button title="Back" />,
              //headerTintColor: '#F2D935',
            }}
          />
          <Stack.Screen
            name="Sound"
            component={AlarmSettingsSoundOptionsScreen}
            options={{
              headerStyle: {backgroundColor: '#F2D935'},
              headerShown: true,
              //headerTintColor: '#F2D935',
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="Clock Screen"
            component={ClockScreen}
            options={{
              headerStyle: {
                backgroundColor: Colors.blackPurple1,
              },
              headerTintColor: Colors.white,
              headerShown: false,
            }}
          />
          {/*<Stack.Screen
            name="Digital Clock"
            component={DigitalClockScreen}
            options={{
              headerStyle: {
                backgroundColor: '#F2D935',
              },
              headerTintColor: '#F2D935',
              headerShown: false,
            }}
          />*/}
          {/*<Stack.Screen
            name="Screen Clock"
            component={ScreenClockScreen}
            options={{
              headerStyle: {
                backgroundColor: '#F2D935',
              },
              headerTintColor: '#F2D935',
              headerShown: false,
            }}
          />*/}
          <Stack.Screen name="Menu" component={Menu} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
