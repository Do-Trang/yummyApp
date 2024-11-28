import React, { useState } from 'react';
import { View, Text, Image, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './PersonalCardStyles';

const getAccountIcon = (account) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailPattern.test(account)) {
    return 'mail';
  }
  return 'call';
};

const PersonalCard = ({ user_id, username, account, dob, avatar_url, gender, address, description, followersCount, followingCount, swipedFoodsCount, swipedRestaurantsCount, navigation }) => {
  const [currentfollowersCount, setCurrentFollowersCount] = useState(followersCount || 0);
  const [currentfollowingCount, setCurrentFollowingCount] = useState(followingCount || 0);
  const [currentSwipedFoodsCount, setCurrentSwipedFoodsCount] = useState(swipedFoodsCount || 0);
  const [currentSwipedRestaurantsCount, setCurrentSwipedRestaurantsCount] = useState(swipedRestaurantsCount || 0);

  const decreaseFollowersCount = () => {
    if (currentfollowersCount > 0) {
      setCurrentFollowersCount(currentfollowersCount - 1);
    }
  };

  const decreaseFollowingCount = () => {
    if (currentfollowingCount > 0) {
      setCurrentFollowingCount(currentfollowingCount - 1);
    }
  };

  const decreaseSwipedFoodsCount = () => {
    if (currentSwipedFoodsCount > 0) {
      setCurrentSwipedFoodsCount(currentSwipedFoodsCount - 1);
    }
  };

  const decreaseSwipedRestaurantsCount = () => {
    if (currentSwipedRestaurantsCount > 0) {
      setCurrentSwipedRestaurantsCount(currentSwipedRestaurantsCount - 1);
    }
  };

  const handleNavigate = () => {
    navigation.navigate('ProfileDetailScreen', {
      username: username,
      
      currentfollowersCount : currentfollowersCount,
      currentfollowingCount : currentfollowingCount,
      currentSwipedFoodsCount : currentSwipedFoodsCount,
      currentSwipedRestaurantsCount : currentSwipedRestaurantsCount,

      onDecreaseFollowersCount: decreaseFollowersCount,
      onDecreaseFollowingCount: decreaseFollowingCount,
      onDecreaseSwipedFoodsCount: decreaseSwipedFoodsCount,
      onDecreaseSwipedRestaurantsCount: decreaseSwipedRestaurantsCount,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <ImageBackground source={{ uri: avatar_url }} style={styles.cover} resizeMode="cover">
            <View style={styles.overlay} />
          </ImageBackground>
        </View>

        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar_url }} style={styles.avatar} resizeMode="cover" />
          </View>
          <Text style={styles.name}>{username}</Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.infoItem}>
            <View style={styles.iconLabelContainer}>
              <Icon name={getAccountIcon(account)} size={24} color="gray" style={styles.icon} />
              <Text style={styles.label}>Account</Text>
            </View>
            <Text style={styles.description}>{account}</Text>
            <View style={styles.divider} />
          </View>
          <View style={styles.infoItem}>
            <View style={styles.iconLabelContainer}>
              <Icon name="person-outline" size={24} color="gray" style={styles.icon} />
              <Text style={styles.label}>Name</Text>
            </View>
            <Text style={styles.description}>{username}</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconLabelContainer}>
              <Icon name="calendar-outline" size={24} color="gray" style={styles.icon} />
              <Text style={styles.label}>Date of Birth</Text>
            </View>
            <Text style={styles.description}>{dob}</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconLabelContainer}>
              <Icon name="transgender-outline" size={24} color="gray" style={styles.icon} />
              <Text style={styles.label}>Gender</Text>
            </View>
            <Text style={styles.description}>{gender === true ? 'Male' : gender === false ? 'Female' : ''}</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconLabelContainer}>
              <Icon name="location-outline" size={24} color="gray" style={styles.icon} />
              <Text style={styles.label}>Address</Text>
            </View>
            <Text style={styles.description}>{address}</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconLabelContainer}>
              <Icon name="information-circle-outline" size={24} color="gray" style={styles.icon} />
              <Text style={styles.label}>Description</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.divider} />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={handleNavigate}
            >
              <Text style={styles.statValue}>{currentfollowersCount}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={handleNavigate}
            >
              <Text style={styles.statValue}>{currentfollowingCount}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={handleNavigate}
            >
              <Text style={styles.statValue}>{currentSwipedFoodsCount}</Text>
              <Text style={styles.statLabel}>Favourite Foods</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={handleNavigate}
            >
              <Text style={styles.statValue}>{currentSwipedRestaurantsCount}</Text>
              <Text style={styles.statLabel}>Favourite Restaurants</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalCard;