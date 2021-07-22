import React from 'react'
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View, Image} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';


export const Item = ( props: any) => {


    const onSelectedCategory = () => {

    }

    return (
        <TouchableOpacity style={{
                padding: SIZES.padding,
                paddingBottom: SIZES.padding * 2,
                backgroundColor: COLORS.primary,
                borderRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: "center",
                marginRight: SIZES.padding,
                ...styles.shadow
        }}
             onPress={() => onSelectedCategory()}
        >
            <View style={{
                 width: 50,
                 height: 50,
                 borderRadius: 25,
                 alignItems: "center",
                 justifyContent: "center",
                 backgroundColor: COLORS.white
            }}>

                 <Image
                     source={ props.item.icon}
                     resizeMode="contain"
                     style={{
                         width: 30,
                         height: 30
                     }}
                 />

            </View>

            <Text style={{
                 marginTop: SIZES.padding,
                 color: COLORS.white,
                 ...FONTS.body5
            }}>
                    {props.item.name}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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

