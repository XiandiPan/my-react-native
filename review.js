import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import uuid from 'react-native-uuid';


const RestaurantReview = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [restaurantReviewData, setRestaurantReviewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.7692466,-82.23659809999999&radius=24000&type=restaurant&key=${process.env.GOOGLE_MAPS_API_KEY}&fields=place_id`);
        setRestaurantData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const extractPlaceIds = (data) => {
    const placeIds = [];
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item && typeof item === 'object' && item.place_id) {
          placeIds.push(item.place_id);
        }
      });
    }

    return placeIds;
  };

  const placeIdsArray = extractPlaceIds(restaurantData.results);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const promises = placeIdsArray.map(placeId =>
          axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_MAPS_API_KEY}&fields=reviews`)
        );

        const responses = await Promise.all(promises);
        const reviewData = responses.map(response => response.data.result.reviews);

        setRestaurantReviewData(reviewData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReviewData();
  }, [placeIdsArray]);

 return (
  <View>
      <Text style={styles.header}>Restaurant Reviews</Text>
      <ScrollView style={styles.scrollView}>
        {restaurantReviewData.flat().map((item, index) => (
          <View key={uuid.v4()} style={styles.reviewContainer}>
            <Text style={styles.reviewData}>{item.relative_time_description}</Text>
            <Text style={styles.reviewData}>{item.author_name}</Text>
            <Text style={styles.reviewData}>{item.text}</Text>
            <Text style={styles.reviewData}>{item.rating}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
   )};


   const styles = StyleSheet.create({
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      marginTop: 10,
    },
    scrollView: {
      marginHorizontal: 10,
    },
    reviewContainer: {
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    reviewData: {
      color: 'blue',
      marginBottom: 5,
    },

  });
  export default RestaurantReview
