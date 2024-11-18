import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },

  CustomFont: {
    // fontFamily: 'SVNChickenNoodleSoup-Regular',
    fontFamily: 'iCielLudema-Regular',
    fontSize: 18,
    color: colors.black,
  },
  CustomFontBold: {
    // fontFamily: 'SVNChickenNoodleSoup-Regular',
    fontFamily: 'iCielLudema-Bold',
    fontSize: 18,
    color: colors.black,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: colors.white,
    width: '100%',
  },

  CustomFont2: {
    fontFamily: 'LavishlyYours-Regular',
    // fontWeight: '700',
  },

  ButtonText: {
    fontFamily: 'LavishlyYours-Regular',
    fontSize: 30,
    padding: 10,
  },

  TitleBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  TitleBoxHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4%',
  },

  Title: {
    fontFamily: 'iCielLudema-Bold',
    fontSize: 32,
    color: colors.black,
    marginTop: 4,
  },

  SubtitleBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Subtitle: {
    fontFamily: 'iCielLudema-Regular',
    fontSize: 16,
    color: colors.gray,
    // padding: 4,
  },

  DescBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: '4%',
    width: '100%'
  },
  Desc: {
    fontFamily: 'iCielLudema-Regular',
    fontSize: 18,
    color: colors.black,
    lineHeight: 24,
  },

  DetailSection: {
    borderBottomWidth: 1,
    borderBottomColor: colors.disable,
    padding: '2%',
  },

  textField: {
    fontSize: 14,
    width: 240,
    height: 28,
    marginVertical: 4,
    color: colors.black,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textInput: {
    width: '100%',
    backgroundColor: colors.white,
    fontSize: 16,
  },
});
