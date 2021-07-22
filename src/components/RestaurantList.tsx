import React from 'react'
import { View, FlatList, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { restaurantData } from '../model/data';
import { styles } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';


const RestaurantList = ( props: any) => {

    const navigation = useNavigation();

    const getCategoryByNameId = (id:any) => {

        let category = props.categories.filter( (a:any) => a.id == id)

        if(category.length > 0)
             return category[0].name;
        
        return "";
    }

    const renderItem = ({item}:any) => {

     
         return(
             <TouchableOpacity
                  style={{marginBottom: SIZES.padding * 2}}
                  onPress={ ()=> navigation.navigate("RestaurantScreen", {
                       item,
                       location: props.location
                  })}
             >
                    <View>
                         <Image
                             source={item.photo}
                             resizeMode="cover"
                             style={{
                                  width: "100%",
                                  height: 200,
                                  borderRadius: SIZES.radius
                             }}
                         />
                   

                    <View
                        style={{
                             position: 'absolute',
                             bottom: 0,
                             height: 50,
                             width: SIZES.width * 0.3,
                             backgroundColor: COLORS.white,
                             alignItems: 'center',
                             justifyContent: 'center',
                             borderTopRightRadius: SIZES.radius,
                             borderBottomLeftRadius: SIZES.radius,
                             ...styles.shadow
                        }}
                    >
                        <Text style={{...FONTS.h4}}>{item.duration}</Text>
                    </View>
                    </View>

                    {/* Rest info */}
                    <Text style={{...FONTS.body2}}>{item.name}</Text>

                    <View style={{
                         marginTop: SIZES.padding,
                         flexDirection: 'row'
                    }}>

                        {/* ratingh */}
                        <Image
                            source={icons.star}
                            style={{
                                 height: 20,
                                 width: 20,
                                 tintColor: COLORS.primary,
                                 marginRight: 10
                            }}
                        />

                        <Text style={{...FONTS.body3}}>{item.rating}</Text>

                        <View
                             style={{
                                 flexDirection: 'row',
                                 marginLeft: 10
                             }}
                        >   
                            {
                                item.categories.map((categoryId: any) => {
                                     return(
                                          <View
                                              style={{ flexDirection: 'row'}}
                                              key={categoryId}
                                          >
                                                <Text style={{ ...FONTS.body3 }}>{ getCategoryByNameId(categoryId) }</Text>
                                                <Text style={{...FONTS.h3, color: COLORS.darkgray}}>.</Text>
                                          </View>
                                     )
                                })
                            }

                            {/* Price */}
                            {
                                 [1,2,3].map((priceRating: any) => (
                                      <Text
                                         key={priceRating}
                                         style={{
                                              ...FONTS.body3,
                                              color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                         }}
                                      >
                                          $
                                      </Text>
                                 ))
                            }

                        </View>

                    </View>

             </TouchableOpacity>
         )
    }

    return (
        <FlatList
            data={props.restaurants}
            keyExtractor={item => `${item.id}`}
            renderItem={ renderItem }
            contentContainerStyle={{
                 paddingHorizontal: SIZES.padding * 2,
                 paddingBottom: 30
            }}
        />
            
        
    )
}

export default RestaurantList
