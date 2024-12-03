import React, { useState } from 'react';
import {Text, View, ScrollView, StyleSheet, Dimensions, Image} from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomButton, { CustomButtonText } from '../components/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import client from '../utils/axios';
import MiniSearchbox from '../components/MiniSearchbox';
import GlobalStyle from '../styles/GlobalStyle';
import colors from '../constants/colors';

import { connect } from 'react-redux';
import { createIngredient, createTag } from '../redux/actions';
import { Icons } from '../components/icons';
import storage from '@react-native-firebase/storage';
import Snackbar from "react-native-snackbar";

function add(props) {
  const initialFood = {
    title: '',
    description: '',
    price: '',
    tags: [],
    image: null,
    restaurant_name: '',
    food_rating_delicious: 0,
    food_rating_presentation: 0,
    food_rating_price: 0,
    food_rating_fresh: 0
  };
  const initialRestaurant = {
    title: '',
    tags: [],
    image: null,
    address: '',
    description: '',
    phone_number: '',
    website: '',
    restaurant_rating_service: 0,
    restaurant_rating_price: 0,
    restaurant_rating_food: 0,
    restaurant_rating_decoration: 0,
  };

  const [newFood, setNewFood] = useState(initialFood);
  const [type, setType] = useState('food');
  const [newRestaurant, setNewRestaurant] = useState(initialRestaurant);

  function _onChangeTitle(text) {
    type === 'food' ? setNewFood({ ...newFood, title: text }) : setNewRestaurant({ ...newRestaurant, title: text });
  }
  function _onChangeDescription(text) {
    type === 'food' ? setNewFood({ ...newFood, description: text }) : setNewRestaurant({ ...newRestaurant, description: text });
  }
  function _onChangePrice(text) {
    setNewFood({ ...newFood, price: text });
  }
  function _onChangeAddress(text) {
    setNewRestaurant({ ...newRestaurant, address: text });
  }
  function _onChangePhoneNumber(text) {
    setNewRestaurant({ ...newRestaurant, phone_number: text });
  }
  function _onChangeWebsite(text) {
    setNewRestaurant({ ...newRestaurant, website: text });
  }
  function _onChangeRating(field, text) {
    if (type === 'food') {
      setNewFood({ ...newFood, [`food_rating_${field}`]: text });
    } else {
      setNewRestaurant({ ...newRestaurant, [`restaurant_rating_${field}`]: text });
    }
  }

  const uploadImage = async (uri) => {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const pathPrefix = type === 'food' ? 'foods/' : 'restaurants/';
    const reference = storage().ref(`${pathPrefix}${fileName}`);

    try {
        await reference.putFile(uri);
        const url = await reference.getDownloadURL();
        return url;
    } catch (error) {
        console.error('Upload failed: ', error);
    }
  };


  function _onChangeRestaurantName(text) {
    setNewFood({ ...newFood, restaurant_name: text });
  }
  function _onChangeImage() {
    const options = {};
    launchImageLibrary(options, response => {
      if (response && response.assets && response.assets[0].uri) {
        const oldPath = response.assets[0].uri;
        const newPath = RNFS.ExternalDirectoryPath + '/' + Date.now() + '.jpg';
        RNFS.moveFile(oldPath, newPath).then(() => {
          type === 'food' ?
            setNewFood({ ...newFood, image: { uri: 'file://' + newPath } })
            :
            setNewRestaurant({ ...newRestaurant, image: { uri: 'file://' + newPath } })

          var filepath = ''; // unlink prev state image if exists
          if (type === 'food' && newFood.image && newFood.image != '') filepath = newFood.image.uri.slice(7);
          if (type === 'restaurant' && newRestaurant.image && newRestaurant.image != '') filepath = newRestaurant.image.uri.slice(7);
          if (filepath && filepath.trim() != '') {
            RNFS.exists(filepath).then((result) => {
              if (result) {
                return RNFS.unlink(filepath)
                  .catch(err => console.log(err.message));
              }
            }).catch(err => console.log(err.message));
          }
        }).catch(err => console.log(err));
      }
    })
  }

  function _onAddTagNewFood(newItem) {
    if (!newFood.tags.some(item => item.title.toLowerCase() === newItem)) {
      const newItemObj = props.tags.data.find(
        obj => obj.title.toLowerCase() === newItem,
      );
      if (newItemObj) {
        setNewFood({
          ...newFood,
          tags: [...newFood.tags, newItemObj],
        });
      } else {
        console.log("There's some bug prevent getting the tags needed.");
      }
    } else {
      console.log('The tag has already been added');
    }
  }

  function _onAddTagNewRestaurant(newItem) {
    if (!newRestaurant.tags.some(item => item.title.toLowerCase() === newItem)) {
      const newItemObj = props.tags.data.find(
        obj => obj.title.toLowerCase() === newItem,
      );
      if (newItemObj) {
        setNewRestaurant({
          ...newRestaurant,
          tags: [...newRestaurant.tags, newItemObj],
        });
      } else {
        console.log("There's some bug prevent getting the tags needed.");
      }
    } else {
      console.log('The tag has already been added');
    }
  }

  function _onCreateTag(item) {
    props.createTag(item);
    console.log('create new tag');
  }

  function _onRemoveTagNewFood(removeItem) {
    const fruits = newFood.tags.filter(item => item.title !== removeItem);
    setNewFood({
      ...newFood,
      tags: [...fruits],
    });
  }
  function _onRemoveTagNewRestaurant(removeItem) {
    const fruits = newRestaurant.tags.filter(item => item.title !== removeItem);
    setNewRestaurant({
      ...newRestaurant,
      tags: [...fruits],
    });
  }

  async function _createFood() {
    const imageUrl = await uploadImage(newFood.image.uri);
    const simpleTags = getSimmpleTagList(newFood.tags);

    try {
      const response = await client.post('foods/create-foods', {
        name: newFood.title,
        description: newFood.description,
        price: newFood.price,
        image_url: imageUrl,
        rating: {
          "food_rating_delicious": parseFloat(newFood.food_rating_delicious),
          "food_rating_presentation": parseFloat(newFood.food_rating_presentation),
          "food_rating_price": parseFloat(newFood.food_rating_price),
          "food_rating_fresh": parseFloat(newFood.food_rating_fresh)
        },
        tags: simpleTags,
        restaurant_name: newFood.restaurant_name
      });

      if (response.data.message == "Food added successfully!") {
        setNewFood({ ...initialFood });
        Snackbar.show({
          text: 'Food added successfully!',
          backgroundColor: colors.success,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        console.error('Failed to add food:', response.data.message);
        Snackbar.show({
          text: 'Error adding food!',
          backgroundColor: colors.error,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
  }

  async function _createRestaurant() {
    const simpleTags = getSimmpleTagList(newRestaurant.tags);
    const imageUrl = await uploadImage(newRestaurant.image.uri);

    try {
      const response = await client.post('restaurants/add-restaurant', {
        name: newRestaurant.title,
        address: newRestaurant.address.trim(),
        phone_number: newRestaurant.phone_number,
        website: newRestaurant.website,
        description: newRestaurant.description,
        image_url: imageUrl,
        rating: {
          "restaurant_rating_service": parseFloat(newRestaurant.restaurant_rating_service),
          "restaurant_rating_price": parseFloat(newRestaurant.restaurant_rating_price),
          "restaurant_rating_food": parseFloat(newRestaurant.restaurant_rating_food),
          "restaurant_rating_decoration": parseFloat(newRestaurant.restaurant_rating_decoration),
        },
        tags: simpleTags
      });

      if (response.data.success) {
        console.log('Restaurant added successfully!');
        setNewRestaurant({ ...initialRestaurant });
        Snackbar.show({
          text: 'Restaurant added successfully!',
          backgroundColor: colors.success,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        console.error('Failed to add restaurant:', response.data.message);
        Snackbar.show({
          text: 'Failed to add restaurant!',
          backgroundColor: colors.error,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  }

  const getSimmpleTagList = list => {
    return list.map(item => item.id) ?? [];
  };

  console.log(1, newRestaurant);
  console.log(2, newFood);

  return (
    <View
      style={[
        GlobalStyle.content,
        { flex: 1, height: Dimensions.get('window').height },
      ]}>
      <CustomButton
        icon_name={type == 'food' ? 'store' : 'hamburger'}
        style={styles.typeIcon}
        onPress={() => {
          if (type === 'food') {
            setType('restaurant');
          } else {
            setType('food');
          }
        }}
        colors={[colors.home1, colors.home2, colors.white]}
        type={Icons.FontAwesome5}
      />
      <View style={[GlobalStyle.TitleBoxHeader]}>
        <Text style={GlobalStyle.Title}>Add</Text>
      </View>
      <View style={[GlobalStyle.content, { width: '87%', paddingBottom: 64 }]}>
        <ScrollView>
          {/* title */}
          <TextInput
            style={[GlobalStyle.textInput]}
            label="Name"
            textAlignVertical="center"
            selectionColor={colors.primary40}
            value={type === 'food' ? newFood.title : newRestaurant.title}
            onChangeText={_onChangeTitle}
          />

          {/* description */}
          <TextInput
            style={[GlobalStyle.textInput]}
            label="Description"
            textAlignVertical="center"
            selectionColor={colors.primary40}
            value={type === 'food' ? newFood.description : newRestaurant.description}
            onChangeText={_onChangeDescription}
            multiline
          />

          {/* price */}
          {type === 'food' && (
            <TextInput
              style={[GlobalStyle.textInput]}
              label="Price"
              textAlignVertical="center"
              selectionColor={colors.primary40}
              value={newFood.price}
              onChangeText={_onChangePrice}
              keyboardType="numeric"
            />
          )}

          {/* address */}
          {type === 'restaurant' && (
            <TextInput
              style={[GlobalStyle.textInput]}
              label="Address"
              textAlignVertical="center"
              selectionColor={colors.primary40}
              value={newRestaurant.address}
              onChangeText={_onChangeAddress}
            />
          )}

          {/* phone number */}
          {type === 'restaurant' && (
            <TextInput
              style={[GlobalStyle.textInput]}
              label="Phone number"
              textAlignVertical="center"
              selectionColor={colors.primary40}
              value={newRestaurant.phone_number}
              onChangeText={_onChangePhoneNumber}
              keyboardType="numeric"
            />
          )}

          {/* website */}
          {type === 'restaurant' && (
            <TextInput
              style={[GlobalStyle.textInput]}
              label="Website"
              textAlignVertical="center"
              selectionColor={colors.primary40}
              value={newRestaurant.website}
              onChangeText={_onChangeWebsite}
            />
          )}

          {/* rating food */}
          {type === 'food' && <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <TextInput
                  style={[GlobalStyle.textInput]}
                  label="Rating delicious"
                  textAlignVertical="center"
                  selectionColor={colors.primary40}
                  value={newFood.food_rating_delicious}
                  onChangeText={text => _onChangeRating('delicious', text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={{ flex: 1 }}>
                <TextInput
                  style={[GlobalStyle.textInput]}
                  label="Rating presentation"
                  textAlignVertical="center"
                  selectionColor={colors.primary40}
                  value={newFood.food_rating_presentation}
                  onChangeText={text => _onChangeRating('presentation', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <TextInput
                  style={[GlobalStyle.textInput]}
                  label="Rating price"
                  textAlignVertical="center"
                  selectionColor={colors.primary40}
                  value={newFood.food_rating_price}
                  onChangeText={text => _onChangeRating('price', text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={{ flex: 1 }}>
                <TextInput
                  style={[GlobalStyle.textInput]}
                  label="Rating fresh"
                  textAlignVertical="center"
                  selectionColor={colors.primary40}
                  value={newFood.food_rating_fresh}
                  onChangeText={text => _onChangeRating('fresh', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>}

          {/* rating restaurant*/}
          {type === 'restaurant' && <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <TextInput
                  style={[GlobalStyle.textInput]}
                  label="Rating service"
                  textAlignVertical="center"
                  selectionColor={colors.primary40}
                  value={newRestaurant.restaurant_rating_service}
                  onChangeText={text => _onChangeRating('service', text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={{ flex: 1 }}>
                <TextInput
                  style={[GlobalStyle.textInput]}
                  label="Rating price"
                  textAlignVertical="center"
                  selectionColor={colors.primary40}
                  value={newRestaurant.restaurant_rating_price}
                  onChangeText={text => _onChangeRating('price', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <TextInput
                  style={[GlobalStyle.textInput]}
                  label="Rating food"
                  textAlignVertical="center"
                  selectionColor={colors.primary40}
                  value={newRestaurant.restaurant_rating_food}
                  onChangeText={text => _onChangeRating('food', text)}
                  keyboardType="numeric"
                />
              </View>

              <View style={{ flex: 1 }}>
                <TextInput
                  style={[GlobalStyle.textInput]}
                  label="Rating decoration"
                  textAlignVertical="center"
                  selectionColor={colors.primary40}
                  value={newRestaurant.restaurant_rating_decoration}
                  onChangeText={text => _onChangeRating('decoration', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>}

          {/* restaurant name */}
          {type === 'food' && (
            <TextInput
              style={[GlobalStyle.textInput]}
              label="Restaurant name"
              textAlignVertical="center"
              selectionColor={colors.primary40}
              value={newFood.restaurant_name}
              onChangeText={_onChangeRestaurantName}
            />
          )}

          {/* image */}
          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '4%' }}>
            <CustomButtonText
              onPress={_onChangeImage}
              colors={[colors.home1, colors.home2]}
              content={'Pick image'}
              padding={'2%'}
            />
            {
              type === 'food' && newFood.image && newFood.image != '' &&
              <Image
                source={newFood.image}
                style={{ width: 200, height: 200, }}
              />
            }
            {
              type === 'restaurant' && newRestaurant.image && newRestaurant.image != '' &&
              <Image
                source={newRestaurant.image}
                style={{ width: 200, height: 200, }}
              />
            }
          </View>

          {type === 'food' && <MiniSearchbox
            list={props.tags.data}
            title="Tags"
            selected={newFood.tags}
            onAddItem={_onAddTagNewFood}
            onCreateItem={_onCreateTag}
            onRemoveItem={_onRemoveTagNewFood}
            createNew={true}
          />}

          {type === 'restaurant' && <MiniSearchbox
            list={props.tags.data}
            title="Tags"
            selected={newRestaurant.tags}
            onAddItem={_onAddTagNewRestaurant}
            onCreateItem={_onCreateTag}
            onRemoveItem={_onRemoveTagNewRestaurant}
            createNew={true}
          />}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: '2%',
            }}>
            {
              type === 'food' &&
              <CustomButtonText
                disabled={
                  newFood.title === '' ||
                  newFood.description === '' ||
                  newFood.price === '' ||
                  newFood.tags.length === 0 ||
                  newFood.restaurant_name === ''
                }
                content="Add"
                colors={[
                  colors.home1,
                  colors.home2,
                  colors.home180,
                  colors.home280,
                ]}
                onPress={_createFood}
                padding={8}
              />
            }
            {
              type === 'restaurant' &&
              <CustomButtonText
                disabled={
                  newRestaurant.title === '' ||
                  newRestaurant.tags.length === 0 ||
                  newRestaurant.address === '' ||
                  newRestaurant.description === '' ||
                  newRestaurant.phone_number === '' ||
                  newRestaurant.website === ''
                }
                content="Add"
                colors={[
                  colors.home1,
                  colors.home2,
                  colors.home180,
                  colors.home280,
                ]}
                onPress={_createRestaurant}
                padding={8}
              />
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.black,
    marginVertical: 4,
  },
  typeIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
    elevation: 10,
  },
  halfnHalf: {
    flexDirection: 'row',
    flex: 1,
  }
});

const mapStateToProps = state => ({
  tags: state.tags,
});

export default connect(mapStateToProps, {
  createIngredient,
  createTag,
})(add);
