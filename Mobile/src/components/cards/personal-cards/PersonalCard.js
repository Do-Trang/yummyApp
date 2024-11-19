import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './PersonalCardStyles';

const PersonalCard = (props) => {
  const { navigation } = props;

  const [avatar, setAvatar] = useState(props.avatar_url || '');
  const [name, setName] = useState(props.username || '');
  const [dob, setDob] = useState(props.dob || '');
  const [gender, setGender] = useState(props.gender || '');
  const [address, setAddress] = useState(props.address || '');
  const [description, setDescription] = useState(props.description || '');
  const [followersCount, setFollowersCount] = useState(props.followersCount || 0);
  const [followingCount, setFollowingCount] = useState(props.followingCount || 0);
  const [swipedFoodsCount, setSwipedFoodsCount] = useState(props.swipedFoodsCount || 0);
  const [swipedRestaurantsCount, setSwipedRestaurantsCount] = useState(props.swipedRestaurantsCount || 0);

  const handleNavigate = () => {
    navigation.navigate('ProfileDetailScreen', {
      followerCount : followersCount,
      followingCount : followingCount,
      favoriteFoodsCount : swipedFoodsCount,
      favoriteRestaurantsCount : swipedRestaurantsCount,

      setFollowersCount: setFollowersCount,
      setFollowingCount: setFollowingCount,
      setFavoriteFoodsCount: setSwipedFoodsCount,
      setFavoriteRestaurantsCount: setSwipedRestaurantsCount,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <ImageBackground source={{ uri: avatar }} style={styles.cover} resizeMode="cover">
            <View style={styles.overlay} />
          </ImageBackground>
        </View>

        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.infoItem}>
            <View style={styles.iconLabelContainer}>
              <Icon name="person-outline" size={24} color="gray" style={styles.icon} />
              <Text style={styles.label}>Name</Text>
            </View>
            <Text style={styles.description}>{name}</Text>
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
            <Text style={styles.description}>{gender == true ? 'Male' : 'Female'}</Text>
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
              <Text style={styles.statValue}>{followersCount}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={handleNavigate}
            >
              <Text style={styles.statValue}>{followingCount}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={handleNavigate}
            >
              <Text style={styles.statValue}>{swipedFoodsCount}</Text>
              <Text style={styles.statLabel}>Favourite Foods</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.statItem} 
              onPress={handleNavigate}
            >
              <Text style={styles.statValue}>{swipedRestaurantsCount}</Text>
              <Text style={styles.statLabel}>Favourite Restaurants</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalCard;