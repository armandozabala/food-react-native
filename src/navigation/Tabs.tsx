import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS, icons } from "../../constants";
import HomeScreen from '../screens/HomeScreen';
import OrderDeliveryScreen from '../screens/OrderDeliveryScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import { TabBarCustomButtom } from '../components/TabBarCustomButtom';
import { CustomTabBar } from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
    <Tab.Navigator
              tabBarOptions={{
                    showLabel: false,
                    style:{
                          borderTopWidth: 0,
                          backgroundColor: "transparent",
                          elevation: 0
                    }
              }}
              tabBar={(props:any) => (
                   <CustomTabBar
                       props={props}
                   />
              )}
    >
            <Tab.Screen 
                 name="HomeScreen" 
                 component={HomeScreen} 
                 options={{
                       tabBarIcon: ({focused}) => (
                            <Image 
                                source={icons.cutlery}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.primary : COLORS.secondary
                                }}
                            />
                       ),
                       tabBarButton: (props: any) => (
                            <TabBarCustomButtom
                                {...props}
                            />
                       )
                 }}
            />

            <Tab.Screen 
                 name="Search" 
                 component={OrderDeliveryScreen} 
                 options={{
                       tabBarIcon: ({focused}) => (
                            <Image 
                                source={icons.search}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.primary : COLORS.secondary
                                }}
                            />
                       ),
                       tabBarButton: (props: any) => (
                            <TabBarCustomButtom
                                {...props}
                            />
                       )
                 }}
            />


            <Tab.Screen 
                 name="OrderDeliveryScreen" 
                 component={OrderDeliveryScreen} 
                 options={{
                       tabBarIcon: ({focused}) => (
                            <Image 
                                source={icons.like}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.primary : COLORS.secondary
                                }}
                            />
                       ),
                       tabBarButton: (props:any) => (
                            <TabBarCustomButtom
                                {...props}
                            />
                      )
                 }}
            />

            <Tab.Screen 
                 name="User" 
                 component={OrderDeliveryScreen} 
                 options={{
                       tabBarIcon: ({focused}) => (
                            <Image 
                                source={icons.user}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.primary : COLORS.secondary
                                }}
                            />
                       ),
                       tabBarButton: (props:any) => (
                            <TabBarCustomButtom
                                {...props}
                            />
                       )
                 }}
            />
            
    </Tab.Navigator>
    )
}

export default Tabs
