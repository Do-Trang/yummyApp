import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import Menu from "../components/tab/Menu";
import UserList from "../components/listview/user-list/UserList";
import RestaurantList from "../components/listview/restaurant-list/RestaurantList";
import FoodList from "../components/listview/food-list/FoodList";
import client from '../utils/axios'

const ProfileDetailScreen = ({ route, navigation }) => {
    const [selectedButton, setSelectedButton] = useState("follower");

    const { 
        currentfollowersCount, currentfollowingCount, currentSwipedFoodsCount, currentSwipedRestaurantsCount, 
        onDecreaseFollowersCount, onDecreaseFollowingCount, onDecreaseSwipedFoodsCount, onDecreaseSwipedRestaurantsCount,
        username
      } = route.params;

    const [followerCount, setFollowerCount] = useState(currentfollowersCount);
    const [followingCount, setFollowingCount] = useState(currentfollowingCount);
    const [favoriteFoodsCount, setFavoriteFoodsCount] = useState(currentSwipedFoodsCount);
    const [favoriteRestaurantsCount, setFavoriteRestaurantsCount] = useState(currentSwipedRestaurantsCount);

    const [followersData, setFollowersData] = useState(null);
    const [followingsData, setFollowingsData] = useState(null);
    const [swipedFoodsData, setSwipedFoodsData] = useState(null);
    const [swipedRestaurantsData, setSwipedRestaurantsData] = useState(null);

    useEffect(() => {
        handleFetchData(selectedButton);
    }, [selectedButton]);

    const handleDeleteItem = (type) => {
        switch (type) {
            case "follower":
                onDecreaseFollowersCount();
                break;
            case "following":
                onDecreaseFollowingCount();
                break;
            case "favoriteFoods":
                onDecreaseSwipedFoodsCount();
                break;
            case "favoriteRestaurants":
                onDecreaseSwipedRestaurantsCount();
                break;
            default:
                break;
        }
    };

    const handleFetchData = (type) => {
        if (type === "follower") {
            client.get('/relations/followers')
                .then(response => {
                    console.log(response.data.followers)
                    setFollowersData(response.data.followers)
                })
                .catch(error => console.error('Error fetching followers:', error));
        } else if (type === "following") {
            client.get('/relations/followings')
                .then(response => {
                    console.log(response.data.followings)
                    setFollowingsData(response.data.followings)
                })
                .catch(error => console.error('Error fetching followings:', error));
        } else if (type === "favoriteFoods") {
            client.get('/swiped-foods')
                .then(response => setSwipedFoodsData(response.data.swipedFoods))
                .catch(error => console.error('Error fetching swiped foods:', error));
        } else if (type === "favoriteRestaurants") {
            client.get('/swiped-restaurants')
                .then(response => setSwipedRestaurantsData(response.data.swipedRestaurants))
                .catch(error => console.error('Error fetching swiped restaurants:', error));
        }
    };
    

    const listData = {
        "follower": followersData || [],
        "following": followingsData || [],
        "favoriteFoods": swipedFoodsData || [],
        "favoriteRestaurants": swipedRestaurantsData || [],
    };

    const renderList = () => {
        switch (selectedButton) {
            case "follower":
                return (
                    <UserList 
                        selectedButton={selectedButton}
                        listData={listData}
                        onDeleteItem={() => handleDeleteItem("follower")}
                    />
                );
            case "following":
                return (
                    <UserList 
                        selectedButton={selectedButton}
                        listData={listData}
                        onDeleteItem={() => handleDeleteItem("following")}
                    />
                );
            case "favoriteFoods":
                return (
                    <FoodList 
                        selectedButton={selectedButton}
                        listData={listData}
                        onDeleteItem={() => handleDeleteItem("favoriteFoods")}
                    />
                );
            case "favoriteRestaurants":
                return (
                    <RestaurantList 
                        selectedButton={selectedButton}
                        listData={listData}
                        onDeleteItem={() => handleDeleteItem("favoriteRestaurants")}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Menu 
                username={username}
                followerCount={followerCount}
                followingCount={followingCount}
                favoriteFoodsCount={favoriteFoodsCount}
                favoriteRestaurantsCount={favoriteRestaurantsCount}
                selectedButton={selectedButton}
                onSelectButton={setSelectedButton}
                navigation = {navigation }
            />

            {renderList()}
        </SafeAreaView>
    );
};

export default ProfileDetailScreen;