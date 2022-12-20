import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Setting } from 'app-screens';
import { RouteNames } from './routes';
import { bar_ic, miLogo } from 'app-assets';
import { commonStyles } from 'app-constants';
import { useTheme } from 'app-theme';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { palette } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <Image
            source={miLogo}
            resizeMode="contain"
            style={commonStyles.headerImg}
          />
        ),

        headerTitleAlign: 'center',
        headerTintColor: palette.redPrimary,
        headerStyle: {
          backgroundColor: palette.primary,
        },
      }}
    >
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteNames.Setting)}
              style={commonStyles.iconView}
            >
              <Image
                source={bar_ic}
                resizeMode="contain"
                style={commonStyles.menuIcon}
              />
            </TouchableOpacity>
          ),
        })}
        name={RouteNames.Home}
        component={Home}
      />
      <Stack.Screen name={RouteNames.Setting} component={Setting} />
    </Stack.Navigator>
  );
};

export default AppStack;
