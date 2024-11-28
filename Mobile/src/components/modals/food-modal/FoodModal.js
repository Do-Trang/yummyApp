import React, { useState, useEffect } from 'react';
import { Text, View, Image, Modal, Animated, TouchableOpacity, Dimensions, Linking, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './FoodModalStyles';
import { ProgressBar } from 'react-native-paper';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

const ggMap = 'https://www.google.com/maps/search/';
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

function FoodDetail({ id, modalPosition, onClose, modalVisible, foodDetails }) {
  const [loading, setLoading] = useState(false);
  const [imageHeight, setImageHeight] = useState(200);
  const [scale, setScale] = useState(new Animated.Value(1));
  const pinchRef = React.useRef();

  const [animatedPosition, setAnimatedPosition] = useState(new Animated.Value(windowHeight));

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(animatedPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedPosition, {
        toValue: windowHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

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
              <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalPosition }] }]}> 
                <View>
                  <Text style={styles.title}>{foodDetails.food.name}</Text>
                </View>
                <PinchGestureHandler
                  ref={pinchRef}
                  onGestureEvent={handlePinchGesture}
                  onHandlerStateChange={onHandlerStateChange}>
                  <Animated.View
                    style={{
                      width: windowWidth - 20,
                      height: imageHeight,
                      alignSelf: 'center',
                      transform: [{ scale: scale }],
                    }}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                      source={{ uri: foodDetails.food.image_url }}
                      onLoad={onImageLoad}
                    />
                  </Animated.View>
                </PinchGestureHandler>
                <View style={styles.section}>
                  <Text style={styles.tags}>
                    {foodDetails.food.tags.map((tag, index) => (
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
                  <Text style={styles.desc}>{foodDetails.food.description}</Text>
                </View>

                <View style={styles.section}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="cash-outline" size={20} color="green" />
                    <Text style={[styles.desc, { marginLeft: 5 }]}>Price: {foodDetails.food.price}</Text>
                  </View>
                </View>

                {foodDetails.food.rating && (
                  <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="star-sharp" size={20} color="yellow" />
                      <Text style={[styles.desc, { marginLeft: 5 }]}>Rating</Text>
                    </View>

                    <Text style={styles.desc}>Delicious: {foodDetails.food.rating.food_rating_delicious} / 10</Text>
                    <ProgressBar
                      progress={parseInt(foodDetails.food.rating.food_rating_delicious) / 10}
                      color="green"
                      style={{ marginBottom: 10 }}
                    />

                    <Text style={styles.desc}>Presentation: {foodDetails.food.rating.food_rating_presentation} / 10</Text>
                    <ProgressBar
                      progress={parseInt(foodDetails.food.rating.food_rating_presentation) / 10}
                      color="orange"
                      style={{ marginBottom: 10 }}
                    />

                    <Text style={styles.desc}>Price: {foodDetails.food.rating.food_rating_price} / 10</Text>
                    <ProgressBar
                      progress={parseInt(foodDetails.food.rating.food_rating_price) / 10}
                      color="blue"
                      style={{ marginBottom: 10 }}
                    />

                    <Text style={styles.desc}>Freshness: {foodDetails.food.rating.food_rating_fresh} / 10</Text>
                    <ProgressBar
                      progress={parseInt(foodDetails.food.rating.food_rating_fresh) / 10}
                      color="red"
                      style={{ marginBottom: 10 }}
                    />
                  </View>
                )}

                <View style={styles.section}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="storefront" size={20} color="orange" />
                    <Text style={[styles.desc, { marginLeft: 5 }]}>Restaurant: {foodDetails.food.restaurantName}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <TouchableOpacity
                    onPress={() => openGoogleMaps(foodDetails.food.restaurantAddress)}
                    style={[styles.desc, styles.link]}>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="location-sharp" size={20} color="blue" />
                        <Text style={[styles.desc, { marginLeft: 5 }]}>Address:</Text>
                      </View>
                      <Text style={[styles.desc, { marginTop: 5, flexWrap: 'wrap' }]}>
                        {foodDetails.food.restaurantAddress}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/*
                <View style={styles.section}>
                  <Text style={styles.desc}>Location on Map:</Text>
                  <MapView
                    style={{ width: '100%', height: 200 }}
                    initialRegion={{
                      latitude: foodDetails.food.restaurantLatitude,
                      longitude: foodDetails.food.restaurantLongitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: foodDetails.food.restaurantLatitude,
                        longitude: foodDetails.food.restaurantLongitude,
                      }}
                      title={foodDetails.food.restaurantName}
                    />
                  </MapView>
                </View> */}

              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Modal>
    </View>
  );
}

export default FoodDetail;