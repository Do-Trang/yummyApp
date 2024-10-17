import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

import {CustomButtonOutline} from '../components/CustomButton';
import {DislikeDialog, LikeDialog} from '../components/CustomDialog';
import GlobalStyle from '../styles/GlobalStyle';
import {CardImageFallback} from '../components/CardImageFallback';
import {
  addFoodToFavorite,
  addRestaurantToFavorite,
  removeFoodFromFavorite,
  removeRestaurantFromFavorite,
  addFoodToBlacklist,
  addRestaurantToBlacklist,
} from '../redux/actions';
import colors from '../constants/colors';

const ggMap = 'https://www.google.com/maps/search/';

function foodDetail(props) {
  const window = useWindowDimensions();

  const getTagTitles = tags =>
    tags.map(item => props.tags.data.find(tag => tag.id === item)?.title) ?? [];

  const getIngredientTitles = tags =>
    tags.map(
      item =>
        props.ingredients.data.find(ingredient => ingredient.id === item)
          ?.title,
    ) ?? [];

  return (
    <View style={styles.detailView}>
      {props.food.image ? (
        <Image
          style={{
            width: window.width,
            height: window.width,
          }}
          source={props.food.image}
        />
      ) : (
        <CardImageFallback />
      )}
      <View style={GlobalStyle.DetailSection}>
        <Text style={GlobalStyle.Title}>{props.food.title}</Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text style={GlobalStyle.Subtitle}>
          {getTagTitles(props.food.tags).join('・')}
        </Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text style={[GlobalStyle.Desc, styles.desc]}>
          {'\t' + props.food.description}
        </Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text style={[GlobalStyle.Desc, styles.desc]}>
          Nguyên liệu ({props.food.ingredients.length}) :
          {getIngredientTitles(props.food.ingredients).map(e => {
            return '\n- ' + e;
          })}
        </Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text style={[GlobalStyle.Desc, styles.desc, styles.bottomPad]}>
          Địa chỉ ({props.food.address.length}) : {'\n'}
          {props.food.address.map((e, index) => {
            return (
              <Text
                style={styles.link}
                onPress={() => {
                  if (Linking.canOpenURL(ggMap + e)) Linking.openURL(ggMap + e);
                }}
                key={index}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                - {e + '\n'}
              </Text>
            );
          })}
        </Text>
      </View>
    </View>
  );
}

function restaurantDetail(props) {
  const window = useWindowDimensions();

  const getTagTitles = tags =>
    tags.map(item => props.tags.data.find(tag => tag.id === item)?.title) ?? [];

  return (
    <View style={styles.detailView}>
      {props.restaurant.image ? (
        <Image
          style={{
            width: window.width,
            height: window.width,
          }}
          source={props.restaurant.image}
        />
      ) : (
        <CardImageFallback />
      )}
      <View style={GlobalStyle.DetailSection}>
        <Text style={GlobalStyle.Title}>{props.restaurant.title}</Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text style={GlobalStyle.Subtitle}>
          {getTagTitles(props.restaurant.tags).join('・')}
        </Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text
          style={[GlobalStyle.Desc, styles.desc, styles.link]}
          onPress={() => {
            if (Linking.canOpenURL(ggMap + props.restaurant.address))
              Linking.openURL(ggMap + props.restaurant.address);
          }}>
          Địa chỉ: {props.restaurant.address}
        </Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text style={[GlobalStyle.Desc, styles.desc]}>
          {'      ' + props.restaurant.description}
        </Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text style={[GlobalStyle.Desc, styles.desc]}>
          Thực đơn ({props.restaurant.menu.length}) :
          {props.restaurant.menu.map(e => {
            return '\n- ' + e;
          })}
        </Text>
      </View>
      <View style={GlobalStyle.DetailSection}>
        <Text style={[GlobalStyle.Desc, styles.desc, styles.bottomPad]}>
          Lưu ý:{'\n'}
          {Object.keys(props.restaurant.note).map(e => {
            return (props.restaurant.note[e] ? '✅ ' : '❌ ') + (e + '\n');
          })}
        </Text>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  tags: state.tags,
  ingredients: state.ingredients,
});

const FoodDetail = connect(mapStateToProps, {})(foodDetail);

const RestaurantDetail = connect(mapStateToProps, {})(restaurantDetail);

function Detail(props) {
  const {detail, type} = props.route.params;
  const [dislike, setDislike] = useState(false);

  return (
    <SafeAreaView style={GlobalStyle.content}>
      <CustomButtonOutline
        icon_name="md-arrow-back-sharp"
        style={styles.typeIcon}
        onPress={() => {
          props.navigation.pop();
        }}
        onLongPress={() => {
          props.navigation.pop();
        }}
        colors={[colors.home1, colors.home2, colors.white]}
        type="ionicon"
        size={36}
      />

      <View style={styles.bottomTab}>
        <LinearGradient
          colors={[colors.white60, colors.white]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.5}}
          style={styles.linearGradient}>
          <CustomButtonOutline
            icon_name="md-close"
            type="ionicon"
            colors={[colors.dislike2, colors.dislike1, colors.white]}
            size={36}
            onPress={() => {
              if (type === 'food') {
                props.removeFoodFromFavorite(detail.id);
              } else {
                props.removeRestaurantFromFavorite(detail.id);
              }
              props.navigation.pop();
            }}
            onLongPress={() => setDislike(true)}
          />
          <CustomButtonOutline
            icon_name="ios-heart"
            type="ionicon"
            colors={[colors.like1, colors.like2, colors.white]}
            size={36}
            onPress={() => {
              if (type === 'food') {
                props.addFoodToFavorite(detail.id);
              } else {
                props.addRestaurantToFavorite(detail.id);
              }
              props.navigation.pop();
            }}
            onLongPress={() => {
              if (type === 'food') {
                props.addFoodToFavorite(detail.id);
              } else {
                props.addRestaurantToFavorite(detail.id);
              }
              props.navigation.pop();
            }}
          />
        </LinearGradient>
      </View>

      {dislike ? (
        <DislikeDialog
          open={dislike}
          onCancel={() => {
            setDislike(false);
          }}
          onOK={() => {
            if (type === 'food') {
              props.addFoodToBlacklist(detail.id);
            } else {
              props.addRestaurantToBlacklist(detail.id);
            }
            props.navigation.pop();
            setDislike(false);
          }}
          content={
            'Zô, vậy là bạn hông thích ' +
            detail.title +
            '. Vậy để mình thêm vào hố đen nhá!'
          }
        />
      ) : null}

      <ScrollView style={[styles.content]}>
        {type === 'food' ? (
          <FoodDetail food={detail} />
        ) : (
          <RestaurantDetail restaurant={detail} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
  },
  typeIcon: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
    elevation: 10,
  },

  desc: {
    fontSize: 15,
  },

  detailView: {},

  bottomPad: {
    paddingBottom: '14%',
  },

  bottomTab: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: '1%',
    paddingBottom: '4%',
  },
  link: {
    textDecorationLine: 'underline',
    color: colors.primary,
  },
});

export default connect(null, {
  addFoodToFavorite,
  addRestaurantToFavorite,
  removeFoodFromFavorite,
  removeRestaurantFromFavorite,
  addFoodToBlacklist,
  addRestaurantToBlacklist,
})(Detail);
