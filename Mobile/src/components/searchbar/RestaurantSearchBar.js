import React, { useState } from "react";
import { View, TextInput, ScrollView, Text, Button, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './RestaurantSearchBarStyles';

const NumericInput = ({ label, value, onChange, min, max, step }) => {
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.sliderRow}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor="#6600CC"
          maximumTrackTintColor="gray"
          thumbTintColor="#6600CC"
        />
        <Text style={styles.value}>{value.toFixed(1)}</Text>
      </View>
    </View>
  );
};

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [minRating, setMinRating] = useState({
    restaurant_rating_food: 0,
    restaurant_rating_service: 0,
    restaurant_rating_price: 0,
    restaurant_rating_decoration: 0,
  });

  const handleSearch = () => {
    onSearch(name, address, tags, {
      restaurant_rating_food: minRating.restaurant_rating_food,
      restaurant_rating_service: minRating.restaurant_rating_service,
      restaurant_rating_price: minRating.restaurant_rating_price,
      restaurant_rating_decoration: minRating.restaurant_rating_decoration,
    });
  };

  const addTag = () => {
    if (newTag.trim() !== "") {
      setTags((prevTags) => [...prevTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tên nhà hàng với icon */}
      <View style={styles.inputContainer}>
        <Icon name="restaurant" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.inputAddress}
          placeholder="Restaurant Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Địa chỉ với icon */}
      <View style={styles.inputContainer}>
        <Icon name="location-sharp" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.inputAddress}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Nhập Tags và nút "Add" */}
      <View style={{ width: "100%" }}>
        <View style={styles.tagInputContainer}>
          <Icon name="pricetag" size={24} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter a tag"
            value={newTag}
            onChangeText={setNewTag}
          />
          <TouchableOpacity onPress={addTag} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tagListContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tagContainer}>
            <Text style={styles.tag}>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(index)} style={styles.removeTagButton}>
              <Icon name="close-circle" size={18} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.ratingContainer}>
        <NumericInput
          label="Food Rating"
          value={minRating.restaurant_rating_food}
          onChange={(value) =>
            setMinRating({ ...minRating, restaurant_rating_food: value })
          }
          min={0}
          max={10}
          step={0.1}
        />
        <NumericInput
          label="Service Rating"
          value={minRating.restaurant_rating_service}
          onChange={(value) =>
            setMinRating({ ...minRating, restaurant_rating_service: value })
          }
          min={0}
          max={10}
          step={0.1}
        />
        <NumericInput
          label="Price Rating"
          value={minRating.restaurant_rating_price}
          onChange={(value) =>
            setMinRating({ ...minRating, restaurant_rating_price: value })
          }
          min={0}
          max={10}
          step={0.1}
        />
        <NumericInput
          label="Decoration Rating"
          value={minRating.restaurant_rating_decoration}
          onChange={(value) =>
            setMinRating({ ...minRating, restaurant_rating_decoration: value })
          }
          min={0}
          max={10}
          step={0.1}
        />
      </View>
      <Button title="Search" onPress={handleSearch} />
    </ScrollView>
  );
};

export default SearchBar;