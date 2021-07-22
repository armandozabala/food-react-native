import React from 'react'
import { View, Text, FlatList } from 'react-native';
import { FONTS, SIZES } from '../../constants';
import { Item } from './Item';

const MainCategories = ( props: any ) => {
    return (
        <View style={{ padding: SIZES.padding * 2 }}>
      
            <Text style={{...FONTS.h1}}>Categories</Text>

            <FlatList
                data={props.categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item.id}`}
                renderItem={ Item }
                contentContainerStyle={{ paddingVertical: SIZES.padding * 2}}
            />
        </View>
    )
}

export default MainCategories
