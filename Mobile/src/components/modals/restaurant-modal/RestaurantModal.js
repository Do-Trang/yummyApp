import React, { useState } from 'react';
import { Text, View, Image, Modal, Animated, TouchableOpacity, useWindowDimensions, Linking, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProgressBar } from 'react-native-paper';
import styles from './RestaurantModalStyles';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const ggMap = 'https://www.google.com/maps/search/';
const { width: windowWidth } = Dimensions.get('window');

function RestaurantDetail({ id, modalPosition, onClose, modalVisible, restaurantDetails }) {
  const [loading, setLoading] = useState(false);
  const [imageHeight, setImageHeight] = useState(200);
  const [scale, setScale] = useState(new Animated.Value(1));
  const pinchRef = React.useRef();

  const onImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    const aspectRatio = height / width;
    setImageHeight(windowWidth * aspectRatio);
  };

  const openGoogleMaps = address => {
    const url = `${ggMap}${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePinchGesture = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent={true} onRequestClose={onClose} propagateSwipe={true}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay}>
              <Animated.View
                style={[styles.modalContent, { transform: [{ translateY: modalPosition }] }]}
              >
                <View>
                  <Text style={styles.title}>{restaurantDetails.restaurant.name}</Text>
                </View>

                <PinchGestureHandler
                  ref={pinchRef}
                  onGestureEvent={handlePinchGesture}
                  onHandlerStateChange={onHandlerStateChange}
                >
                  <Animated.View
                    style={{
                      width: windowWidth - 20,
                      height: imageHeight,
                      alignSelf: 'center',
                      transform: [{ scale: scale }],
                    }}
                  >
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                      source={{ uri: restaurantDetails.restaurant.image_url }}
                      onLoad={onImageLoad}
                    />
                  </Animated.View>
                </PinchGestureHandler>

                <View style={styles.section}>
                  <Text style={styles.tags}>
                    {restaurantDetails.restaurant.tags.map((tag, index) => (
                      <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="pricetag" size={16} color="blue" />
                        <Text style={styles.tagText}>{tag + '   '}</Text>
                      </View>
                    ))}
                  </Text>
                </View>

                <View style={styles.section}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="document-text" size={20} color="blue" />
                    <Text style={styles.desc}>Description</Text>
                  </View>
                  <Text style={styles.desc}>{restaurantDetails.restaurant.description}</Text>
                </View>

                {/* Address Section */}
                <View style={styles.section}>
                  <TouchableOpacity
                    onPress={() => openGoogleMaps(restaurantDetails.restaurant.address)}
                    style={[styles.desc, styles.link]}
                  >
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="location-sharp" size={20} color="green" />
                            <Text style={[styles.desc, { marginLeft: 5 }]}>Address:</Text>
                        </View>
                        <Text style={styles.desc}>
                           {restaurantDetails.restaurant.address}
                        </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {restaurantDetails.restaurant.rating && (
                  <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="star-sharp" size={20} color="yellow" />
                      <Text style={[styles.desc, { marginLeft: 5 }]}>Ratings</Text>
                    </View>

                    <Text style={styles.desc}>SERVICE: {restaurantDetails.restaurant.rating.restaurant_rating_service} / 10</Text>
                    <ProgressBar
                      progress={parseFloat(restaurantDetails.restaurant.rating.restaurant_rating_service) / 10}
                      color="green"
                      style={{ marginBottom: 10 }}
                    />

                    <Text style={styles.desc}>PRICE: {restaurantDetails.restaurant.rating.restaurant_rating_price} / 10</Text>
                    <ProgressBar
                      progress={parseFloat(restaurantDetails.restaurant.rating.restaurant_rating_price) / 10}
                      color="orange"
                      style={{ marginBottom: 10 }}
                    />

                    <Text style={styles.desc}>FOOD: {restaurantDetails.restaurant.rating.restaurant_rating_food} / 10</Text>
                    <ProgressBar
                      progress={parseFloat(restaurantDetails.restaurant.rating.restaurant_rating_food) / 10}
                      color="blue"
                      style={{ marginBottom: 10 }}
                    />

                    <Text style={styles.desc}>DECORATION: {restaurantDetails.restaurant.rating.restaurant_rating_decoration} / 10</Text>
                    <ProgressBar
                      progress={parseFloat(restaurantDetails.restaurant.rating.restaurant_rating_decoration) / 10}
                      color="red"
                      style={{ marginBottom: 10 }}
                    />
                  </View>
                )}

                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Icon name="call-sharp" size={20} color="green" style={styles.icon} />
                        <Text style={[styles.desc, { marginTop: 1, marginLeft: 5 }]}>Phone:</Text>
                    </View>
                    <Text style={styles.desc}>{restaurantDetails.restaurant.phone_number}</Text>
                </View>

                <View style={styles.section}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Icon name="globe-sharp" size={20} color="blue" style={styles.icon} />
                        <Text style={[styles.desc, { marginTop: 1, marginLeft: 5 }]}>Website: </Text>
                    </View>
                    {restaurantDetails.restaurant.website !== 'No website available' ? (
                    <Text
                        style={[styles.desc, styles.link]}
                        onPress={() => Linking.openURL(restaurantDetails.restaurant.website)}
                    >
                        {restaurantDetails.restaurant.website}
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