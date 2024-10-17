import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomTextInput from '../components/CustomTextInput';
import Icon, { Icons } from '../components/icons';
import GlobalStyle from '../styles/GlobalStyle';
import Settings from './settings';
import { CustomButtonText } from '../components/CustomButton';
import colors from '../constants/colors';

const Stack = createStackNavigator();

function BottomEdit(props) {
  return (
    !props.editing ?
      <View style={styles.bottomEdit}>
        <CustomButtonText content='Sửa' colors={[colors.home1, colors.home2]} onPress={() => props.setEditing(!props.editing)} padding={8} />
      </View>
      :
      <View style={styles.bottomEdit}>
        <CustomButtonText content='Hủy' colors={[colors.dislike1, colors.dislike2]} onPress={() => props.setEditing(!props.editing)} padding={8} />
        <CustomButtonText content='Lưu' colors={[colors.like1, colors.like2]} onPress={() => props.setEditing(!props.editing)} padding={8} />
      </View>
  )
}

const DATA = {
  username: 'chitoge',
  email: 'chitogemaiding@gmail.com',
  password: 'password',
  repassword: '',
};

function MenuDetail({ navigation }) {
  const [editing, setEditing] = React.useState(false);
  const [data, setData] = React.useState(DATA);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[GlobalStyle.content, styles.content]}>
          <View style={styles.profileTab}>
            <Image
              source={require('../../assets/profile/avatar.jpg')}
              style={[styles.image]}
            />
            <CustomTextInput
              editable={editing}
              content={data.username}
              style={[GlobalStyle.CustomFontBold, styles.username]}
              onChangeText={text =>
                setData({
                  ...data,
                  username: text,
                })
              }
            />
            <CustomTextInput
              editable={false}
              content={data.email}
              autoComplete={'email'}
              onChangeText={text =>
                setData({
                  ...data,
                  email: text,
                })
              }
            />
            <CustomTextInput
              editable={editing}
              content={data.password}
              autoComplete={'password'}
              secureTextEntry={true}
              onChangeText={text =>
                setData({
                  ...data,
                  password: text,
                })
              }
            />
            {editing ? (
              <CustomTextInput
                editable={editing}
                content={data.repassword}
                autoComplete={'password'}
                secureTextEntry={true}
                onChangeText={text =>
                  setData({
                    ...data,
                    repassword: text,
                  })
                }
              />
            ) : null}
            <View style={styles.BottomMenuDetail}>
              <BottomEdit editing={editing} setEditing={setEditing} />
            </View>
          </View>
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={[styles.bottomNavDiv]}
              onPress={() => {
                setEditing(false);
                navigation.push('Settings', { detail: true, food: true });
              }}>
              <Icon
                type={Icons.Feather}
                name={'settings'}
                color={colors.primary80}
                size={32}
              />
              <Text style={[GlobalStyle.CustomFont, styles.text]}>
                {' '}
                Cài đặt{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomNavDiv]}>
              <Icon
                type={Icons.Feather}
                name={'log-out'}
                color={colors.primary80}
                size={32}
              />
              <Text style={[GlobalStyle.CustomFont, styles.text]}>
                {' '}
                Đăng xuất{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Menu({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="MenuDetail"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MenuDetail" component={MenuDetail} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: '6%',
    flex: 1,
    height: Dimensions.get('window').height,
  },
  bottomEdit: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
  },
  profileTab: {
    alignItems: 'center',
    width: '90%',
    flex: 3,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  seeMore: {
    color: colors.gray,
    textDecorationLine: 'underline',
  },
  username: {
    width: '60%',
    borderBottomWidth: 0,
    textAlign: 'center',
    fontSize: 24,
    color: colors.primary,
    paddingBottom: 0,
  },
  text: {
    fontSize: 20,
    color: colors.black,
  },
  bottomNav: {
    bottom: 10,
    flex: 1,
    width: '100%',
  },
  bottomNavDiv: {
    flexDirection: 'row',
    borderColor: colors.primary,
    borderTopWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: colors.primary10,
  },
  BottomMenuDetail: {
    paddingTop: '10%',
  },
});

export default Menu;
