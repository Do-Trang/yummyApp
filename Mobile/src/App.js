
import { NavigationContainer } from '@react-navigation/native';
import { configureFonts, DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon, { Icons } from './components/icons';
import Colors from './constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import * as Animatable from 'react-native-animatable';
import Favorite from './screens/favorite';
import Search from './screens/search';
import Home from './screens/home';
import Add from './screens/add';
import Menu from './screens/menu';
import Splash from './screens/splash';
import Detail from './screens/detail';
import GlobalStyle from './styles/GlobalStyle';
import colors from './constants/colors';

import { connect } from 'react-redux';

const fontConfig = {
  web: {
    regular: { fontFamily: 'iCielLudema-Regular' },
    medium: { fontFamily: 'iCielLudema-Regular' },
    light: { fontFamily: 'iCielLudema-Regular' },
    thin: { fontFamily: 'iCielLudema-Regular' },
    bold: { fontFamily: 'iCielLudema-Bold' },
  },
  ios: {
    regular: { fontFamily: 'iCielLudema-Regular' },
    medium: { fontFamily: 'iCielLudema-Regular' },
    light: { fontFamily: 'iCielLudema-Regular' },
    thin: { fontFamily: 'iCielLudema-Regular' },
    bold: { fontFamily: 'iCielLudema-Bold' },
  },
  android: {
    regular: { fontFamily: 'iCielLudema-Regular' },
    medium: { fontFamily: 'iCielLudema-Regular' },
    light: { fontFamily: 'iCielLudema-Regular' },
    thin: { fontFamily: 'iCielLudema-Regular' },
    bold: { fontFamily: 'iCielLudema-Bold' },
  }
};

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};

const darkTheme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),

}

const TabArr = [
  { route: 'Add', label: 'Add', type: Icons.Feather, icon: 'plus-square', component: Add, },
  { route: 'Favorite', label: 'Favorite', type: Icons.Feather, icon: 'heart', component: Favorite, },
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: Home, },
  { route: 'Search', label: 'Search', type: Icons.Feather, icon: 'search', component: Search, },
  { route: 'Menu', label: 'Menu', type: Icons.Feather, icon: 'menu', component: Menu, },
];

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -30 },
  1: { scale: 1.2, translateY: -14 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = props => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle}>
            <LinearGradient
              colors={[colors.home1, colors.home2]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            />
          </Animatable.View>
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.secondary}
          />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[GlobalStyle.CustomFont, styles.text]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
      initialRouteName="Home">
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const app = (props) => {
  // console.log(darkTheme);
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 10,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (

    <PaperProvider theme={!props.config.darkTheme ? theme : darkTheme}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen name="AnimTab1" component={AnimTab1} />
          <RootStack.Screen
            name="Detail"
            component={Detail}
            options={{
              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

function Main() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 60,
    position: 'absolute',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  linearGradient: {
    // flex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.secondary,
  },
});


const mapStateToProps = state => ({
  config: state.config,
});

export const App = connect(mapStateToProps, {})(app);
export default Main;