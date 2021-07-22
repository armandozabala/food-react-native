import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { COLORS, icons, SIZES } from '../../constants'
import Header from '../components/Header'
import MainCategories from '../components/MainCategories'
import RestaurantList from '../components/RestaurantList'
import { categoryData, initialCurrentLocation, restaurantData } from '../model/data'


const HomeScreen = () => {

    
    const [categories, setCategories] = useState(categoryData)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [restaurants, setRestaurants] = useState(restaurantData)
    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation)

    


    return (
        <SafeAreaView style={styles.container}>
            <Header  currentLocation={currentLocation}/>
            <MainCategories categories={categories} />
            <RestaurantList restaurants={restaurants} categories={categories} location={currentLocation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
     container:{
         flex: 1,
         backgroundColor: COLORS.lightGray4
     },
     shadow: {
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 1
     }
})

export default HomeScreen
