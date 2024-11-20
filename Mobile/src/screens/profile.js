import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import PersonalCard from '../components/cards/personal-cards/PersonalCard';
import client from '../utils/axios';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen(props) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);

  useEffect(() => {
    client
      .get('/profile')
      .then(response => {
        console.log(response.data.user);
        setUserData(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const settingsList = [
    {id: '1', title: 'Change Password', screen: 'ChangePassword'},
    {id: '2', title: 'Logout', screen: 'Logout'},
  ];

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
    console.log('List visibility toggled:', !isListVisible);
  };

  const handleItemPress = screen => {
    if (screen === 'Logout') {
      client
        .post('/auth/logout')
        .then(() => {
          AsyncStorage.removeItem('accessToken');
          AsyncStorage.removeItem('refreshToken');
          props.navigation.navigate('LoginScreen');
        })
        .catch(error => {
          console.error('Error during logout:', error);
        });
    } else {
      props.navigation.navigate('ChangePasswordScreen');
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const handleSave = updatedData => {
    setUserData(prevData => ({
      ...prevData,
      ...updatedData,
    }));
  };

  return (
    <View style={{flex: 1}}>
      {/* Phần tử với position absolute để đưa các nút lên trên */}
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          right: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 10,
        }}>
        {/* Nút Setting */}
        <TouchableOpacity onPress={toggleListVisibility} style={styles.button}>
          <Icon name="settings" size={30} color="white" />
        </TouchableOpacity>

        {/* Nút Chat */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ChatScreen')}>
          <Icon name="chatbubble-ellipses" size={30} color="white" />
        </TouchableOpacity>
        
        {/* Nút Editing */}
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('EditProfileScreen', {
              avatar_url: userData.avatar_url,
              username: userData.username,
              address: userData.address,
              gender: userData.gender,
              dob: userData.dob,
              description: userData.description,
              onSave: null,
            })
          }>
          <Icon name="pencil" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dropdown menu */}
      {isListVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={settingsList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleItemPress(item.screen)}>
                <Text style={styles.itemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}

      {/* Hiển thị Personal Card */}
      <PersonalCard {...userData} {...props} />

      {/* Dropdown menu */}
      {isListVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={settingsList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleItemPress(item.screen)}>
                <Text style={styles.itemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 50,
    elevation: 3,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 15,
    width: 200,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
});

export default ProfileScreen;
