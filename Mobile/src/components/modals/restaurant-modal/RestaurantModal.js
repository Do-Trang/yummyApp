import React, { useState } from 'react';
import { Text, View, Image, Modal, Animated, TouchableOpacity, useWindowDimensions, Linking, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProgressBar } from 'react-native-paper';
import styles from './RestaurantModalStyles';

const ggMap = 'https://www.google.com/maps/search/';

function RestaurantDetail(props) {
  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition] = useState(new Animated.Value(window.height));

  const title = props.name ?? 'Unknown Restaurant';
  const restaurantAddress = props.address ?? 'Unknown Address';
  const phoneNumber = props.phone_number ?? 'No phone number available';
  const website = props.website ?? 'No website available';
  const description = props.description ?? 'Restaurant description.';
  const image = props.image_url ?? null;
  const rating = JSON.parse(props.rating) ?? {};
  const tags = props.tags ?? [];

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(modalPosition, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalPosition, {
      toValue: window.height,
      duration: 500,
      useNativeDriver: true
    }).start(() => setModalVisible(false));
  };

  const openGoogleMaps = (address) => {
    const url = `${ggMap}${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.triggerText}>Show Restaurant Details</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal} propagateSwipe={true}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[styles.modalContent, { transform: [{ translateY: modalPosition }] }]}
              >
                <View>
                  <Text style={styles.title}>{title}</Text>
                </View>

                {image && (
                  <Image
                    style={{
                      width: window.width,
                      height: window.width / 2,
                      alignSelf: 'center',
                    }}
                    resizeMode="center"
                    source={{ uri: image }}
                  />
                )}

                {/* Tags Section */}
                <View style={styles.section}>
                  <Text style={styles.tags}>
                    {tags.map((tag, index) => (
                      <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="pricetag" size={16} color="blue" />
                        <Text style={styles.tagText}>{tag + '   '}</Text>
                      </View>
                    ))}
                  </Text>
                </View>

                {/* Description Section */}
                <View style={styles.section}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="document-text" size={20} color="blue" />
                    <Text style={styles.desc}>Description</Text>
                  </View>
                  <Text style={styles.desc}>{description}</Text>
                </View>

                {/* Address Section */}
                <View style={styles.section}>
                  <TouchableOpacity
                    onPress={() => openGoogleMaps(restaurantAddress)}
                    style={[styles.desc, styles.link]}
                  >
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="location-sharp" size={20} color="green" />
                            <Text style={[styles.desc, { marginLeft: 5 }]}>Address:</Text>
                        </View>
                        <Text style={styles.desc}>
                           {restaurantAddress}
                        </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Rating Section */}
                {rating && Object.keys(rating).length > 0 && (
                  <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="star-sharp" size={20} color="yellow" />
                      <Text style={[styles.desc, { marginLeft: 5 }]}>Ratings</Text>
                    </View>

                    {/* Rating - Service */}
                    <View style={styles.ratingContainer}>
                        <Text style={styles.desc}>SERVICE: {rating.restaurant_rating_service} / 10</Text>
                        <ProgressBar
                        progress={parseFloat(rating.restaurant_rating_service) / 10}
                        color="green"
                        style={{ marginBottom: 10 }}
                        />
                    </View>

                    {/* Rating - Price */}
                    <View style={styles.ratingContainer}>
                        <Text style={styles.desc}>PRICE: {rating.restaurant_rating_price} / 10</Text>
                        <ProgressBar
                        progress={parseFloat(rating.restaurant_rating_price) / 10}
                        color="orange"
                        style={{ marginBottom: 10 }}
                        />
                    </View>

                    {/* Rating - Food */}
                    <View style={styles.ratingContainer}>
                        <Text style={styles.desc}>FOOD: {rating.restaurant_rating_food} / 10</Text>
                        <ProgressBar
                        progress={parseFloat(rating.restaurant_rating_food) / 10}
                        color="blue"
                        style={{ marginBottom: 10 }}
                        />
                    </View>

                    {/* Rating - Decoration */}
                    <View style={styles.ratingContainer}>
                        <Text style={styles.desc}>DECORATION: {rating.restaurant_rating_decoration} / 10</Text>
                        <ProgressBar
                        progress={parseFloat(rating.restaurant_rating_decoration) / 10}
                        color="red"
                        style={{ marginBottom: 10 }}
                        />
                    </View>

                  </View>
                )}

                {/* Phone Section */}
                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Icon name="call-sharp" size={20} color="green" style={styles.icon} />
                        <Text style={[styles.desc, { marginTop: 1, marginLeft: 5 }]}>Phone:</Text>
                    </View>
                    <Text style={styles.desc}>{phoneNumber}</Text>
                </View>

                {/* Website Section */}
                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Icon name="globe-sharp" size={20} color="blue" style={styles.icon} />
                        <Text style={[styles.desc, { marginTop: 1, marginLeft: 5 }]}>Website: </Text>
                    </View>
                    {website !== 'No website available' ? (
                    <Text
                        style={[styles.desc, styles.link]}
                        onPress={() => Linking.openURL(website)}
                    >
                        {website}
                    </Text>
                    ) : (
                    <Text style={styles.desc}>No website available</Text>
                    )}
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Modal>
    </View>
  );
}

export default RestaurantDetail;