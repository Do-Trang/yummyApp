import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
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
import RadioThree from '../components/RadioThree';

function add(props) {
  const note = {
    'Ăn tại quán': 1,
    'Hút thuốc': 3,
    'Thú cưng': 2,
    'Wife': 1,
    'Chỉ mang đi': 1,
  };
  const initialFood = {
    title: '',
    description: '',
    price: '',
    tags: [],
    image: null,
    rating: null,
    restaurant_name: '',
  };
  const initialRestaurant = {
    title: '',
    tags: [],
    image: null,
    address: '',
    description: '',
    phone_number: '',
    website: '',
    rating: null,
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
  function _onChangeRating(text) {
    type === 'food' ? setNewFood({ ...newFood, rating: text }) : setNewRestaurant({ ...newRestaurant, rating: text });
  }
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
    const simpleTags = getSimmpleTagList(newFood.tags);

    try {
      const response = await client.post('foods/create-foods', {
//        userId: 1,
        name: newFood.title,
        description: newFood.description,
        price: newFood.price,
        image_url: newFood.image.uri,
        rating: newFood.rating,
        tags: simpleTags,
        restaurant_name: newFood.restaurant_name
      });

      if (response.data.success) {
        console.log('Food added successfully!');
        setNewFood({ ...initialFood });
      } else {
        console.error('Failed to add food:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
  }

  async function _createRestaurant() {
    const simpleTags = getSimmpleTagList(newRestaurant.tags);

    try {
      const response = await client.post('restaurants/add-restaurant', {
//        userId: 1,
        name: newRestaurant.title,
        address: newRestaurant.address.trim(),
        phone_number: newRestaurant.phone_number,
        website: newRestaurant.website,
        description: newRestaurant.description,
        image_url: newRestaurant.image.uri,
        rating: newRestaurant.rating,
        tags: simpleTags
      });

      if (response.data.success) {
        console.log('Restaurant added successfully!');
        setNewRestaurant({ ...initialRestaurant });
      } else {
        console.error('Failed to add restaurant:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  }

  const getSimmpleTagList = list => {
    return list.map(item => item.id) ?? [];
  };

  return (
    <View
      style={[
        GlobalStyle.content,
        { flex: 1, height: Dimensions.get('window').height },
      ]}>
      <CustomButton
        icon_name={type == 'food' ? 'hamburger' : 'store'}
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
        <Text style={GlobalStyle.Title}>Thêm</Text>
      </View>
      <View style={[GlobalStyle.content, { width: '80%', paddingBottom: 64 }]}>
        <ScrollView>
          {/* title */}
          <TextInput
            style={[GlobalStyle.textInput]}
            label="Tên"
            textAlignVertical="center"
            selectionColor={colors.primary40}
            value={type === 'food' ? newFood.title : newRestaurant.title}
            onChangeText={_onChangeTitle}
          />

          {/* description */}
          <TextInput
            style={[GlobalStyle.textInput]}
            label="Miêu tả"
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
              label="Giá"
              textAlignVertical="center"
              selectionColor={colors.primary40}
              value={newFood.price}
              onChangeText={_onChangePrice}
            />
          )}

          {/* address */}
          {type === 'restaurant' && (
            <TextInput
              style={[GlobalStyle.textInput]}
              label="Địa chỉ"
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
              label="Số điện thoại"
              textAlignVertical="center"
              selectionColor={colors.primary40}
              value={newRestaurant.phone_number}
              onChangeText={_onChangePhoneNumber}
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

          {/* rating */}
          <TextInput
            style={[GlobalStyle.textInput]}
            label="Đánh giá"
            textAlignVertical="center"
            selectionColor={colors.primary40}
            value={type === 'food' ? newFood.rating : newRestaurant.rating}
            onChangeText={_onChangeRating}
          />

          {/* restaurant name */}
          {type === 'food' && (
            <TextInput
              style={[GlobalStyle.textInput]}
              label="Tên nhà hàng"
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
              content={'Chọn ảnh'}
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
            title="Thẻ tag"
            selected={newFood.tags}
            onAddItem={_onAddTagNewFood}
            onCreateItem={_onCreateTag}
            onRemoveItem={_onRemoveTagNewFood}
            createNew={true}
          />}

          {type === 'restaurant' && <MiniSearchbox
            list={props.tags.data}
            title="Thẻ tag"
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
                content="Thêm"
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
                content="Thêm"
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
