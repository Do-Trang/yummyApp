import React, { useState } from 'react';
import {Text, View, Image, Modal, Animated, TouchableOpacity, useWindowDimensions, Linking, TouchableWithoutFeedback, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './FoodModalStyles';
import { ProgressBar } from 'react-native-paper';

const ggMap = 'https://www.google.com/maps/search/';

function FoodDetail(props) {
  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition] = useState(new Animated.Value(window.height));

  const title = props.name ?? 'Untitled';
  const tags = props.tags ?? [];
  const image = props.image_url ?? null;
  const description = props.description ?? 'Food description.';
  const price = props.price ?? 'No price available';
  const rating = JSON.parse(props.rating) ?? {};
  const restaurantName = props.restaurantName ?? 'Unknown Restaurant';
  const restaurantAddress = props.restaurantAddress ?? 'Unknown Address';

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

  const openGoogleMaps = address => {
    const url = `${ggMap}${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.triggerText}>Show Food Details</Text>
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

                <View style={styles.section}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="cash-outline" size={20} color="green" />
                    <Text style={[styles.desc, { marginLeft: 5 }]}>Price: {price}</Text>
                  </View>
                </View>

                {/* Rating Section */}
                {rating && (
                  <View style={styles.section}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="star-sharp" size={20} color="yellow" />
                      <Text style={[styles.desc, { marginLeft: 5 }]}>Rating</Text>
                    </View>

                    {/* Delicious Rating */}
                    <Text style={styles.desc}>Delicious: {rating.food_rating_delicious} / 10</Text>
                    <ProgressBar
                      progress={parseInt(rating.food_rating_delicious) / 10}
                      color="green"
                      style={{ marginBottom: 10 }}
                    />

                    {/* Presentation Rating */}
                    <Text style={styles.desc}>Presentation: {rating.food_rating_presentation} / 10</Text>
                    <ProgressBar
                      progress={parseInt(rating.food_rating_presentation) / 10}
                      color="orange"
                      style={{ marginBottom: 10 }}
                    />

                    {/* Price Rating */}
                    <Text style={styles.desc}>Price: {rating.food_rating_price} / 10</Text>
                    <ProgressBar
                      progress={parseInt(rating.food_rating_price) / 10}
                      color="blue"
                      style={{ marginBottom: 10 }}
                    />

                    {/* Freshness Rating */}
                    <Text style={styles.desc}>Freshness: {rating.food_rating_fresh} / 10</Text>
                    <ProgressBar
                      progress={parseInt(rating.food_rating_fresh) / 10}
                      color="red"
                      style={{ marginBottom: 10 }}
                    />
                  </View>
                )}

                <View style={styles.section}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="storefront" size={20} color="orange" />
                    <Text style={[styles.desc, { marginTop: 1, marginLeft: 5 }]}>
                      Restaurant: {restaurantName}
                    </Text>
                  </View>
                </View>

                {/* Location Section */}
                <View style={styles.section}>
                <TouchableOpacity
                  onPress={() => openGoogleMaps(restaurantAddress)}
                  style={[styles.desc, styles.link]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="location-sharp" size={20} color="blue" />
                    <Text style={[styles.desc, { marginTop: 1, marginLeft: 5 }]}>
                      Address: {restaurantAddress}
                    </Text>
                  </View>

                </TouchableOpacity>
                </View>
                
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        </ScrollView>
      </Modal>

    </View>
  );
}

export default FoodDetail;