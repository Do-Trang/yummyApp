import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { TextInput } from 'react-native-paper';
import CustomButton, { CustomButtonText } from '../components/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

import MiniSearchbox from '../components/MiniSearchbox';
import GlobalStyle from '../styles/GlobalStyle';
import colors from '../constants/colors';

import { connect } from 'react-redux';
import { createFood, createRestaurant, createIngredient, createTag, } from '../redux/actions';
import { Icons } from '../components/icons';
import { RadioButton } from 'react-native-paper';
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
    ingredients: [],
    tags: [],
    address: [],
    image: null,
  };
  const initialRestaurant = {
    title: '',
    tags: [],
    image: null,
    address: '',
    description: '',
    menu: [],
    note: { ...note },
  };
  const [newFood, setNewFood] = useState(initialFood);
  const [type, setType] = useState('food');
  const [newRestaurant, setNewRestaurant] = useState(initialRestaurant);

  // React.useEffect(() => {
  // }, [newRestaurant.note])

  // React.useEffect(() => {
  //   const filepath = 'file:///storage/emulated/0/Android/data/com.app/files/1653287022176.jpg'.slice(7);
  //   RNFS.exists(filepath).then((result) => {
  //     console.log("file exists: ", result);
  //     if (result) {
  //       return RNFS.unlink(filepath)
  //         // .then(() => console.log('FILE DELETED'))
  //         .catch(err => console.log(err.message)); // `unlink` will throw an error, if the item to unlink does not exist
  //     }
  //   }).catch(err => console.log(err.message));
  // }, [newFood.image])

  function _onChangeTitle(text) {
    type === 'food' ? setNewFood({ ...newFood, title: text }) : setNewRestaurant({ ...newRestaurant, title: text });
  }
  function _onChangeDescription(text) {
    type === 'food' ? setNewFood({ ...newFood, description: text }) : setNewRestaurant({ ...newRestaurant, description: text });
  }
  function _onChangeAddress(text) {
    if (type === 'food') {
      const add = text.split('\n');
      setNewFood({ ...newFood, address: [...add] });
    } else {
      setNewRestaurant({ ...newRestaurant, address: text });
    }

  }
  function _onChangeImage() {
    const options = {};
    launchImageLibrary(options, response => {
      if (response && response.assets && response.assets[0].uri) {
        const oldPath = response.assets[0].uri;
        const newPath = RNFS.ExternalDirectoryPath + '/' + Date.now() + '.jpg';
        RNFS.moveFile(oldPath, newPath).then(() => {
          // console.log('Moved from ' + oldPath + ' -- to-- ' + 'file://' + newPath);
          type === 'food' ?
            setNewFood({ ...newFood, image: { uri: 'file://' + newPath } })
            :
            setNewRestaurant({ ...newRestaurant, image: { uri: 'file://' + newPath } })

          var filepath = ''; // unlink prev state image if exists
          if (type === 'food' && newFood.image && newFood.image != '') filepath = newFood.image.uri.slice(7);
          if (type === 'restaurant' && newRestaurant.image && newRestaurant.image != '') filepath = newRestaurant.image.uri.slice(7);
          if (filepath && filepath.trim() != '') {
            RNFS.exists(filepath).then((result) => {
              console.log("image exists: ", result);
              if (result) {
                return RNFS.unlink(filepath)
                  .catch(err => console.log(err.message)); // `unlink` will throw an error, if the item to unlink does not exist
              }
            }).catch(err => console.log(err.message));
          }
        }).catch(err => console.log(err));
      }
    })
  }
  function _onChangeMenuNewRestaurant(text) {
    const add = text.split('\n');
    setNewRestaurant({ ...newRestaurant, menu: [...add] });
  }

  function _onAddIngredientNewFood(newItem) {
    if (
      !newFood.ingredients.some(item => item.title.toLowerCase() === newItem)
    ) {
      const newItemObj = props.ingredients.data.find(
        obj => obj.title.toLowerCase() === newItem,
      );
      if (newItemObj) {
        setNewFood({
          ...newFood,
          ingredients: [...newFood.ingredients, newItemObj],
        });
      } else {
        console.log("There's some bug prevent getting the ingredients needed.");
      }
    } else {
      console.log('The ingredient has already been added');
    }
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

  // TODO: check if item is already existed
  function _onCreateIngredient(item) {
    props.createIngredient(item);
    console.log('create new ingredient');
  }
  function _onCreateTag(item) {
    props.createTag(item);
    console.log('create new tag');
  }

  function _onRemoveIngredient(removeItem) {
    const fruits = newFood.ingredients.filter(
      item => item.title !== removeItem,
    );
    setNewFood({
      ...newFood,
      ingredients: [...fruits],
    });
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

  function _createFood() {
    const simpleTags = getSimmpleTagList(newFood.tags);
    const simpleIngredients = getSimpleIngredientList(newFood.ingredients);
    const newAddress = newFood.address.filter(e => e != '').map(el => el.replace(/\s+/g, ' ').trim());
    props.createFood({
      ...newFood,
      tags: simpleTags,
      ingredients: simpleIngredients,
      address: newAddress
    });
    setNewFood({
      ...initialFood
    });
  }
  function _createRestaurant() {
    const simpleTags = getSimmpleTagList(newRestaurant.tags);
    var newNote = [...Object.keys(newRestaurant.note)].reduce((newObj, i) => {
      const value = newRestaurant.note[i];
      if (value !== 1) {
        newObj[i] = value;
      }
      return newObj;
    }, {})

    const newMenu = newRestaurant.menu.filter(e => e != '').map(el => el.replace(/\s+/g, ' ').trim());

    props.createRestaurant({
      ...newRestaurant,
      tags: simpleTags,
      note: newNote,
      menu: newMenu,
      address: newRestaurant.address.trim(),
    });
    setNewRestaurant({
      ...initialRestaurant
    });
  }

  const getSimmpleTagList = list => {
    return list.map(item => item.id) ?? [];
  };
  const getSimpleIngredientList = list => {
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

          {/* address */}
          <TextInput
            style={[GlobalStyle.textInput]}
            label="Địa chỉ"
            textAlignVertical="center"
            selectionColor={colors.primary40}
            value={type === 'food' && newFood.address ? newFood.address.join('\n') : newRestaurant.address}
            onChangeText={_onChangeAddress}
            multiline={type === 'food' ? true : false}
          />

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
            title="Nguyên liệu"
            list={props.ingredients.data}
            selected={newFood.ingredients}
            onAddItem={_onAddIngredientNewFood}
            onCreateItem={_onCreateIngredient}
            onRemoveItem={_onRemoveIngredient}
            createNew={true}
          />}

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

          {type === 'restaurant' && <TextInput
            style={[GlobalStyle.textInput]}
            label="Thực đơn"
            textAlignVertical="center"
            selectionColor={colors.primary40}
            value={newRestaurant.menu.join['\n']}
            onChangeText={_onChangeMenuNewRestaurant}
            multiline
          />}

          {type === 'restaurant' &&
            <View style={{ width: '100%', padding: '2%' }}>
              {Object.keys(newRestaurant.note).map((e, i) => {
                return (
                  <View
                    key={e.toString()}                    >
                    <Text style={[GlobalStyle.CustomFont, styles.halfnHalf]}>{e}</Text>
                    <RadioThree
                      keys={e}
                      checked={newRestaurant.note[e]}
                      setChecked={(checked) => {
                        setNewRestaurant({
                          ...newRestaurant,
                          note: { ...newRestaurant.note, [e]: checked }
                        })
                      }
                      }
                      style={styles.halfnHalf}
                    />
                  </View>
                )
              })}
            </View>
          }

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
                  newFood.ingredients.length === 0 ||
                  newFood.tags.length === 0 ||
                  newFood.address === []
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
                  newRestaurant.menu.length === 0 ||
                  newRestaurant.note === {}
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
  ingredients: state.ingredients,
  tags: state.tags,
});

export default connect(mapStateToProps, {
  createFood,
  createRestaurant,
  createIngredient,
  createTag,
})(add);
