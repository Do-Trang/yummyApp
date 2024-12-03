import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const foodCardStyles = StyleSheet.create({
  detailView: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
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
    textAlign: 'justify',
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
  },
  smallCard: {
    borderColor: colors.primary40,
    flexDirection: 'row',
    borderWidth: 2,
    marginVertical: 10,
    elevation: 2,
    backgroundColor: colors.light,
    borderRadius: 12,
  },
  smallCardImage: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  username: {
    marginTop: 5,
    marginLeft: 10,
    color: colors.home2,
  },
});

export default foodCardStyles;
