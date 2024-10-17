import React from 'react';

import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Chip, TextInput } from 'react-native-paper';
import GlobalStyle from '../styles/GlobalStyle';
import colors from '../constants/colors';
import { CustomButtonText } from './CustomButton';


class MiniSearchbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.list ?? [],
      showing: [],
      searchText: '',
      ready: false,
      selected: this.props.selected ?? [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.list !== prevProps.list ||
      this.props.selected !== prevProps.selected
    ) {
      this.setState({
        ...prevState,
        list: this.props.list,
        selected: this.props.selected,
      });
    }
  }

  _onChange = text => {
    const normalisedText = text.toLowerCase();
    let newShowing = [];
    if (text !== '') {
      const startswith = this.state.list.filter(item =>
        item.title?.toLowerCase().startsWith(normalisedText),
      );
      const includes = this.state.list.filter(
        item =>
          item.title?.toLowerCase().includes(normalisedText) &&
          !item.title?.toLowerCase().startsWith(normalisedText),
      );
      newShowing = startswith.concat(includes);
    } else {
      newShowing = [];
    }

    const ready = this.state.list.some(
      item => item.title.toLowerCase() === normalisedText,
    );

    this.setState({
      ...this.state,
      showing: newShowing,
      searchText: text,
      ready: ready,
    });
  };

  _onAddSelection = newSelection => {
    this.props.onAddItem(newSelection);
    this.setState({ ...this.state, searchText: '' });
  };

  _onCreateSelection = newSelection => {
    this.props.onCreateItem(newSelection);
    this.setState({ ...this.state, searchText: '' });
  };

  _onChooseToAutofill = text => {
    this.setState({ ...this.state, searchText: text, ready: true });
  };

  render() {
    return (
      <View style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <TextInput
            style={[GlobalStyle.textInput, { width: '80%' }]}
            textAlignVertical="center"
            label={this.props.title}
            onChangeText={text => {
              this._onChange(text);
            }}
            value={this.state.searchText}
          />
          {this.state.ready ? (
            this.props.createNew && <CustomButtonText
              content='Thêm'
              colors={[colors.home1, colors.home2]}
              onPress={() => {
                this._onAddSelection(this.state.searchText.toLowerCase());
              }}
              style={{ width: '20%', padding: 8, }}
              textStyle={{ fontSize: 14, }}
            />
          ) : (
            this.props.createNew && <CustomButtonText
              content='Tạo'
              colors={[colors.home1, colors.home2, colors.home180, colors.home280]}
              onPress={() => this._onCreateSelection(this.state.searchText.toLowerCase())}
              style={{ width: '20%', padding: 8, }}
              textStyle={{ fontSize: 14, }}
              disabled={this.state.searchText.trim() === ''}
            />
          )}
          {!this.props.createNew && (
            <CustomButtonText
              content='+'
              colors={[colors.home1, colors.home2, colors.home180, colors.home280,]}
              onPress={() => {
                this._onAddSelection(this.state.searchText.toLowerCase());
              }}
              style={{ width: '20%', padding: 8, }}
              textStyle={{ fontSize: 14, }}
              disabled={!this.state.ready}
            />
          )}
        </View>
        <View style={styles.tagContainer}>
          {this.state.showing.map(item => (
            <Chip
              key={item.id}
              mode='outlined'
              onPress={() => { this._onChooseToAutofill(item.title) }}
              style={{ margin: 2, }}
            >{item.title}</Chip>
          ))}
        </View>
        <View style={styles.tagContainer}>
          {this.state.selected.map(item => (
            <Chip
              key={item.id}
              mode='outlined'
              onClose={() => {
                this.props.onRemoveItem(item.title);
              }}
              selectedColor={colors.primary}
              style={{ margin: 2, }}
            >{item.title}</Chip>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textField: {
    fontSize: 12,
    width: 180,
    height: 20,
    marginVertical: 4,
    color: colors.black,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  confirmButton: {
    width: 50,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginVertical: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingVertical: 4,
  },
});

export default MiniSearchbox;
