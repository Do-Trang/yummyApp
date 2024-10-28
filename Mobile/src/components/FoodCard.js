import React from 'react';
import {Text, View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import {connect} from 'react-redux';

import colors from '../constants/colors';
import GlobalStyle from '../styles/GlobalStyle';
import {CardImageFallback} from './CardImageFallback';

function FoodCard(props) {
  const window = useWindowDimensions();
  const state = {
    title: props.food.title ?? 'untitled',
    tags:
      props.food.tags?.map(
        item => props.tags.data.find(tag => tag.id === item)?.title,
      ) ?? [],
    ingredients:
      props.food.ingredients?.map(
        item =>
          props.ingredients.data.find(ingredient => ingredient.id === item)
            ?.title,
      ) ?? [],
    image: props.food.image ?? null,
    description: props.food.description ?? 'Mô tả món ăn.',
    address: props.food.address ?? [],
  };

  return (
    <View style={styles.detailView}>
      {state.image ? (
        <Image
          style={{
            width: window.width,
            height: window.width,
          }}
          source={state.image}
        />
      ) : (
        <CardImageFallback />
      )}
      <View style={GlobalStyle.TitleBox}>
        <Text style={GlobalStyle.Title}>{state.title}</Text>
      </View>
      <View style={GlobalStyle.SubtitleBox}>
        <Text style={GlobalStyle.Subtitle}>{state.tags.join('・')}</Text>
      </View>
      <View style={GlobalStyle.DescBox}>
        <Text
          numberOfLines={4}
          ellipsizeMode={'tail'}
          style={[GlobalStyle.Desc, styles.desc]}>
          {state.description}
        </Text>
        <Text
          style={[GlobalStyle.CustomFont, styles.seeMore]}
          onPress={() => {
            props.navigation.push('Detail', {
              detail: props.food,
              type: 'food',
            });
          }}>
          {'>>  '}Xem thêm
        </Text>
      </View>
    </View>
  );
}

function smallFoodCard(props) {
  const window = useWindowDimensions();
  const state = {
    title: props.food.title ?? 'untitled',
    tags:
      props.food.tags?.map(
        item => props.tags.data.find(tag => tag.id === item)?.title,
      ) ?? [],
    ingredients:
      props.food.ingredients?.map(
        item =>
          props.ingredients.data.find(ingredient => ingredient.id === item)
            ?.title,
      ) ?? [],
    image: props.food.image ?? null,
  };

  return (
    <View style={styles.smallCard}>
      {state.image ? (
        <Image
          style={[
            styles.smallCardImage,
            {
              width: window.width / 3,
              height: window.width / 2,
            },
          ]}
          source={state.image}
        />
      ) : (
        <CardImageFallback
          style={[
            styles.smallCardImage,
            {
              width: window.width / 3,
              height: window.width / 2,
            },
          ]}
        />
      )}
      <View style={{paddingHorizontal: 8, width: '66%'}}>
        <Text style={[GlobalStyle.Title, {fontSize: 20}]} numberOfLines={1}>
          {state.title}
        </Text>
        <Text style={[GlobalStyle.Subtitle]} numberOfLines={2}>
          - {state.tags.join(', ')}
        </Text>
        <Text style={[GlobalStyle.Subtitle]} numberOfLines={2}>
          - {state.ingredients.join(', ')}
        </Text>
        <Text
          style={[GlobalStyle.CustomFont, styles.seeMore]}
          onPress={() => {
            props.navigation.push('Detail', {
              detail: props.food,
              type: 'food',
            });
          }}>
          {'>>  '}Xem thêm
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
  },
  typeIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
    elevation: 10,
  },
  desc: {
    overflow: 'hidden',
    textAlign: 'center',
  },
  seeMore: {
    color: colors.gray,
    textDecorationLine: 'underline',
  },

  bottomTab: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    // bottom: 80,
  },
  smallCard: {
    borderColor: colors.primary40,
    flexDirection: 'row',
    borderWidth: 2,
    marginVertical: 10,
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  smallCardImage: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  tags: state.tags,
});

export const SmallFoodCard = connect(mapStateToProps, {})(smallFoodCard);
export default connect(mapStateToProps, {})(FoodCard);
