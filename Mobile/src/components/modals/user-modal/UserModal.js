import React, { useState, useEffect,  } from 'react';
import { Text, View, Image, Modal, Animated, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Dimensions, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './UserModalStyles';
import client from "../../../utils/axios"

const { width: windowWidth } = Dimensions.get('window');

const getAccountIcon = (account) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailPattern.test(account)) {
    return 'mail';
  }
  return 'call';
};

function PersonalDetail({ modalPosition, onClose, modalVisible, personalDetails }) {
  const [imageHeight, setImageHeight] = useState(200);
  const [scale, setScale] = useState(new Animated.Value(1));
  const pinchRef = React.useRef();
  console.log(personalDetails, "hi");
  const [isFollowing, setIsFollowing] = useState(personalDetails.user.followStatus === 'follow');

  const onImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    const aspectRatio = height / width;
    setImageHeight(windowWidth * aspectRatio);
  };

  const handleFollowButton = () => {
    const apiEndpoint = isFollowing ? `relations/unfollow/${personalDetails.user.user_id}` : `relations/deleteFollow/${personalDetails.user.user_id}`;
    
    client.delete(apiEndpoint)
      .then((response) => {
        console.log(response.data.message);
        setIsFollowing(!isFollowing);
      })
      .catch((error) => {
        console.error('Error updating follow status:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent={true} onRequestClose={onClose} propagateSwipe={true}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[styles.modalContent, { transform: [{ translateY: modalPosition }], }]}
              >
                <View style={styles.profileHeader}>
                  <ImageBackground 
                      source={{ uri: personalDetails.user.avatar_url }}
                      style={[styles.cover, { width: windowWidth - 20, }]} 
                      resizeMode="cover"
                      onLoad={onImageLoad}
                  >
                      <View style={styles.overlay} />
                  </ImageBackground>
              </View>
                <View style={styles.headerContainer}>
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: personalDetails.user.avatar_url }} style={styles.avatar} resizeMode="cover" />
                  </View>
                  
                  {/* Container for the username and follow/unfollow button */}
                  <View style={styles.nameAndButtonContainer}>
                    <Text style={styles.name}>{personalDetails.user.username}</Text>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={handleFollowButton}
                    >
                      <Text style={styles.followButtonText}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.userInfoContainer}>
                  <View style={styles.infoItem}>
                    <View style={styles.iconLabelContainer}>
                      <Icon name={getAccountIcon(personalDetails.user.account)} size={24} color="gray" style={styles.icon} />
                      <Text style={styles.label}>Account</Text>
                    </View>
                    <Text style={styles.description}>{personalDetails.user.email || personalDetails.user.phone_number}</Text>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.infoItem}>
                    <View style={styles.iconLabelContainer}>
                      <Icon name="person-outline" size={24} color="gray" style={styles.icon} />
                      <Text style={styles.label}>Name</Text>
                    </View>
                    <Text style={styles.description}>{personalDetails.user.username}</Text>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.infoItem}>
                    <View style={styles.iconLabelContainer}>
                      <Icon name="calendar-outline" size={24} color="gray" style={styles.icon} />
                      <Text style={styles.label}>Date of Birth</Text>
                    </View>
                    <Text style={styles.description}>{personalDetails.user.dob}</Text>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.infoItem}>
                    <View style={styles.iconLabelContainer}>
                      <Icon name="transgender-outline" size={24} color="gray" style={styles.icon} />
                      <Text style={styles.label}>Gender</Text>
                    </View>
                    <Text style={styles.description}>{personalDetails.user.gender === true ? 'Male' : personalDetails.user.gender === false ? 'Female' : ''}</Text>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.infoItem}>
                    <View style={styles.iconLabelContainer}>
                      <Icon name="location-outline" size={24} color="gray" style={styles.icon} />
                      <Text style={styles.label}>Address</Text>
                    </View>
                    <Text style={styles.description}>{personalDetails.user.address}</Text>
                    <View style={styles.divider} />
                  </View>

                  <View style={styles.infoItem}>
                    <View style={styles.iconLabelContainer}>
                      <Icon name="information-circle-outline" size={24} color="gray" style={styles.icon} />
                      <Text style={styles.label}>Description</Text>
                    </View>
                    <Text style={styles.description}>{personalDetails.user.description}</Text>
                    <View style={styles.divider} />
                  </View>
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Modal>
    </View>
  );
}

export default PersonalDetail;