import { BottomTabBar } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../../constants'
import { isIphoneX } from 'react-native-iphone-x-helper';


export const CustomTabBar = ( props: any) => {

    if(isIphoneX()){
    return (
        <View>
             <View style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 30,
                  backgroundColor: COLORS.white
             }}>

             </View>
             <BottomTabBar {...props.props} />
        </View>
      
    )
    }else{
       return (<BottomTabBar {...props.props} />)
    }
}
