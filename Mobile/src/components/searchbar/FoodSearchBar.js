import React, { useState } from "react";
import { View, TextInput, ScrollView, Text, Button, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './FoodSearchBarStyles';

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
  const [tags, setTags] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [newTag, setNewTag] = useState("");
  const [minRating, setMinRating] = useState({
    food_rating_delicious: 0,
    food_rating_presentation: 0,
    food_rating_price: 0,
    food_rating_fresh: 0,
  });

  const handleSearch = () => {
    const parsedMinPrice = parseFloat(minPrice);
    const parsedMaxPrice = parseFloat(maxPrice);

    // Kiểm tra nếu giá trị minPrice và maxPrice là hợp lệ
    if (isNaN(parsedMinPrice) || isNaN(parsedMaxPrice)) {
      alert("Please enter valid prices.");
      return;
    }

    onSearch(name, parsedMinPrice, parsedMaxPrice, tags, {
      food_rating_delicious: minRating.food_rating_delicious,
      food_rating_presentation: minRating.food_rating_presentation,
      food_rating_price: minRating.food_rating_price,
      food_rating_fresh: minRating.food_rating_fresh,
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
      <View style={styles.inputContainer}>
        <Icon name="fast-food" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.inputAddress}
          placeholder="Food Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Min Price và Max Price cùng hàng */}
      <View style={styles.inputContainerRow}>
        <View style={styles.inputWrapper}>
          <Icon name="cash" size={24} color="gray" style={styles.icon} />
          <TextInput
            style={styles.inputAddress}
            placeholder="Min Price"
            value={minPrice}
            keyboardType="numeric"
            onChangeText={setMinPrice}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="cash" size={24} color="gray" style={styles.icon} />
          <TextInput
            style={styles.inputAddress}
            placeholder="Max Price"
            value={maxPrice}
            keyboardType="numeric"
            onChangeText={setMaxPrice}
          />
        </View>
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
          label="Delicious Rating"
          value={minRating.food_rating_delicious}
          onChange={(value) =>
            setMinRating({ ...minRating, food_rating_delicious: value })
          }
          min={0}
          max={10}
          step={0.1}
        />
        <NumericInput
          label="Presentation Rating"
          value={minRating.food_rating_presentation}
          onChange={(value) =>
            setMinRating({ ...minRating, food_rating_presentation: value })
          }
          min={0}
          max={10}
          step={0.1}
        />
        <NumericInput
          label="Price Rating"
          value={minRating.food_rating_price}
          onChange={(value) =>
            setMinRating({ ...minRating, food_rating_price: value })
          }
          min={0}
          max={10}
          step={0.1}
        />
        <NumericInput
          label="Freshness Rating"
          value={minRating.food_rating_fresh}
          onChange={(value) =>
            setMinRating({ ...minRating, food_rating_fresh: value })
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