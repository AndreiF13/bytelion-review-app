import React from 'react';
// Components
import { View, Text, Image, InteractionManager } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface IRatingStarProps {
  rating: number;
  starSize: number;
}

export default function RatingStar(props: IRatingStarProps ) {
  // Creating a simple array to simplify the process of drawing the stars
  // This array will be used to map and to check if rating inside the range
  const arrStars = [
    { from: 1 },
    { from: 2 },
    { from: 3 },
    { from: 4 },
    { from: 5 },
  ];

  return (
    <View style={{ flexDirection: "row" }}>
      {arrStars.map((item, index) => (
        <MaterialCommunityIcons key={index} name="star" size={props.starSize} color={props.rating >= item.from ? "#FFC107" : "#BDBDBD"} />
      ))}      
    </View>
  )
}