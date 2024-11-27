import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import GlobalStyle from '../styles/GlobalStyle';
import Icon from './icons';
// import { Icon as GIcon } from 'react-native-gradient-icon';
import * as Animatable from 'react-native-animatable';
import colors from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomButton(props) {
  return (
    <TouchableOpacity
      style={[styles.touch, props.style]}
      onPress={props.onPress}>
      <LinearGradient
        colors={[props.colors[0], props.colors[1]]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.linearGradient}>
        <Icon
          type={props.type}
          name={props.icon_name}
          color={colors.white}
          size={props.size ? props.size : 26}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

export function CustomButtonOutline(props) {
  const [holding, setHolding] = useState(false);
  const view1Ref = useRef(null);
  const view2Ref = useRef(null);

  useEffect(() => {
    if (holding) {
      view1Ref.current?.transitionTo({scale: 1.2});
      view2Ref.current?.transitionTo({scale: 1.6});
    } else {
      view1Ref.current?.transitionTo({scale: 1});
      view2Ref.current?.transitionTo({scale: 1});
    }
  }, [holding]);

  return (
    <TouchableOpacity
      style={[styles.touch, props.style]}
      onPress={props.onPress}
      onPressIn={() => setHolding(true)}
      onPressOut={() => setHolding(false)}
      onLongPress={props.onLongPress}
      delayLongPress={1500}>
      <Animatable.View
        ref={view1Ref}
        duration={1000}
        style={[
          styles.linearGradientOutline,
          {backgroundColor: props.colors[2]},
        ]}>
        <LinearGradient
          colors={[props.colors[0], props.colors[1]]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}>
          <Animatable.View
            ref={view2Ref}
            duration={1000}
            style={[
              styles.linearGradientOutline,
              {backgroundColor: props.colors[2]},
            ]}>
            {props.icon}
          </Animatable.View>
        </LinearGradient>
      </Animatable.View>
    </TouchableOpacity>
  );
}

export function CustomButtonText(props) {
  return (
    <TouchableOpacity
      style={[props.style]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <LinearGradient
        colors={
          !props.disabled
            ? [props.colors[0], props.colors[1]]
            : [props.colors[2], props.colors[3]]
        }
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={[
          styles.linearGradientText,
          {width: '100%', padding: props.padding},
        ]}>
        <Text
          style={[GlobalStyle.CustomFontBold, styles.text, props.textStyle]}>
          {props.content}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

//trang
export function CustomButtonOutline1(props) {
  return (
    <TouchableOpacity
      style={[styles.touch, props.style]}
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
      <LinearGradient
        colors={[props.colors[0], props.colors[1]]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.linearGradient}>
        <Ionicons
          name={props.icon_name}
          size={props.size || 26}
          color={colors.white}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.white,
  },
  linearGradient: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradientOutline: {
    height: 58,
    width: 58,
    borderRadius: 29,
    padding: 11,
    // paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradientText: {
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
