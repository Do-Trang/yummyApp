import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';

import GlobalStyle from '../styles/GlobalStyle';
import Icon, {Icons} from './icons';
import {
  removeFoodFromFavorite,
  removeRestaurantFromFavorite,
} from '../redux/actions';
import colors from '../constants/colors';

function FavoriteItem(props) {
  function _onPressDetail() {
    props.navigation.push('Detail', {detail: props.data, type: props.type});
  }

  function _onPressDelete() {
    if (props.type === 'food') {
      props.removeFoodFromFavorite(props.data.id);
    } else {
      props.removeRestaurantFromFavorite(props.data.id);
    }
  }

  return (
    <TouchableOpacity onPress={() => _onPressDetail()} style={styles.favList}>
      <View style={styles.rightView}>
        <Image style={styles.image} source={props.data.image} />
        <Text style={[GlobalStyle.Desc, styles.text]} numberOfLines={1}>
          {props.data.title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => _onPressDelete()}
        hitSlop={10}
        style={styles.delete}>
        <Icon type={Icons.Feather} name="x-circle" color={colors.disable} size={22} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  favList: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 4,
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 5,
    paddingLeft: 12,
  },
  text: {
    padding: 12,
    width: '70%',
  },
  delete: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
  },
});

export default connect(null, {
  removeFoodFromFavorite,
  removeRestaurantFromFavorite,
})(FavoriteItem);
