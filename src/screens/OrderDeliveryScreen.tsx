import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions";
import { COLORS, FONTS, GOOGLE_API_KEY, icons, SIZES } from '../../constants';

const OrderDeliveryScreen = ({ route, navigation} : any) => {

   
    let { restaurants, currentLocation } = route.params;

    const mapView:any = useRef();
    
    const [restaurant, setRestaurant] = useState(restaurants);
    const [streetName, setStreetName] = useState(currentLocation.streetName);
    const [fromLocation, setFromLocation] = useState(currentLocation.gps);
    const [toLocation, setToLocation] = useState<any>(restaurants.location);
    const [duration, setDuration] = useState(0);
    const [isReady, setIsReady]=useState(false);
    const [angle, setAngle]=useState(0);
    const [region, setRegion] = useState<any>(null);

    useEffect(() => {

        let fromLoc = currentLocation.gps;
        let toLoc = restaurants.location;
        let street = currentLocation.streetName;

        

        let mapRegion = {
            latitude:  (fromLoc.latitude + toLoc.latitude )  / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude ) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }

        setRestaurant(restaurant);
        setStreetName(street);
        setFromLocation(fromLoc);
        setToLocation(toLoc);
        setRegion(mapRegion);

    },[])

    const calculateAngle = (coordinates:any) => {

         let startLat = coordinates[0]["latitude"];
         let startLng = coordinates[0]["longitude"];
         let endLat = coordinates[1]["latitude"];
         let endLng = coordinates[1]["longitude"];

         let dx = endLat - startLat;
         let dy = endLng - startLng;

         return Math.atan2(dy,dx) * 180 / Math.PI;
    }

    const carIcon = () => {
          return(
              <Marker
                  coordinate={fromLocation}
                  anchor={{ x:0.5 , y:0.5}}
                  flat={true}
                  rotation={angle}
              >
                  <Image
                    source={icons.car}
                    style={{
                        width: 40,
                        height: 40
                    }}
                  />
              </Marker>
          )
    }

    const destinationMarker = () => {

        console.log("LOC",toLocation);
        
          return(
               <Marker coordinate={toLocation}>
                    <View style={{
                         height: 40,
                         width: 40,
                         borderRadius: 20,
                         alignItems: 'center',
                         justifyContent: 'center',
                         backgroundColor: COLORS.white
                    }}>
                            <View style={{
                                 height: 40,
                                 width: 40,
                                 borderRadius: 15,
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 backgroundColor: COLORS.primary
                            }}>
                                <Image
                                    source={icons.pin}
                                    style={{
                                         width: 20,
                                         height: 20,
                                         tintColor: COLORS.white
                                    }}
                                />
                            </View>
                    </View>
               </Marker>
          )
    }

    const renderDestinationHeader = () => {

        return(
            <View style={{
                position: "absolute",
                top: 50,
                left: 0,
                right: 0,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     width: SIZES.width * 0.9,
                     paddingVertical: SIZES.padding,
                     paddingHorizontal: SIZES.padding * 2,
                     borderRadius: SIZES.radius,
                     backgroundColor: COLORS.white
                }}>
                    <Image
                         source={icons.red_pin}
                         style={{
                             height: 30,
                             width: 30,
                             marginRight: SIZES.padding
                         }}
                    />

                    <Text style={{ flex: 1}}>
                        <Text style={{...FONTS.body3}}>{streetName}</Text>
                    </Text>

                    <Text style={{...FONTS.body3}}>{Math.ceil(duration) } mins</Text>

                </View>
            </View>
        )
    }

    const renderDeliveryInfo = () => {
        return(
            <View style={{
                 position: "absolute",
                 bottom: 50,
                 left: 0,
                 right: 0,
                 alignItems: 'center',
                 justifyContent: 'center'
            }}>

                <View style={{
                      width: SIZES.width * 0.9,
                      paddingVertical: SIZES.padding * 3,
                      paddingHorizontal: SIZES.padding * 2,
                      borderRadius: SIZES.radius,
                      backgroundColor: COLORS.white
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                         <Image
                            source={restaurant?.courier.avatar}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                         />
                         <View style={{
                               flex: 1,
                               marginLeft: SIZES.padding
                         }}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                     <Text style={{...FONTS.h4}}>{restaurant?.courier.name}</Text>
                                     <View style={{flexDirection: 'row'}}>
                                        <Image
                                            source={icons.star}
                                            style={{ width: 18, height: 18, tintColor: COLORS.primary,
                                                 marginRight: SIZES.padding
                                            }}
                                        />
                                        <Text style={{...FONTS.body3}}>{restaurant?.rating}</Text>
                                     </View>
                                </View>

                                    <Text style={{ color: COLORS.darkgray, ...FONTS.body4}}>
                                            {restaurant?.name}
                                    </Text>
                               
                                </View>

                            </View>
                             
                                <View style={{
                                      flexDirection: 'row',
                                      marginTop: SIZES.padding * 2,
                                      justifyContent: 'space-between'
                                }}>
                                        <TouchableOpacity style={{
                                            height: 50,
                                            width: SIZES.width * 0.5 - SIZES.padding * 6,
                                            backgroundColor: COLORS.primary,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10
                                        }}
                                        onPress={ () => navigation.navigate('HomeScreen')}
                                        >
                                            <Text style={{ ...FONTS.h4, color: COLORS.white}}>
                                                Call
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            height: 50,
                                            width: SIZES.width * 0.5 - SIZES.padding * 6,                                    //width: SIZES.width * 0.5 - SIZES.padding * 0.6,
                                            backgroundColor: COLORS.secondary,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10
                                        }}>
                                            <Text style={{ ...FONTS.h4, color: COLORS.white}}>
                                                Cancel
                                            </Text>
                                      </TouchableOpacity>
                        </View>
                </View>

            </View>
        )
    }

    const zoomIn = () =>{
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2
        }

        setRegion(newRegion);
        mapView.current.animateToRegion(newRegion, 200)
    }

    const zoomOut = () =>{
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2
        }

        setRegion(newRegion);
        mapView.current.animateToRegion(newRegion, 200)
    }

    const renderButtons = () => {
        return(
            <View
                style={{
                    position: 'absolute',
                    bottom: SIZES.height * 0.35,
                    right: SIZES.padding * 2,
                    width: 60,
                    height: 130,
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                    onPress={ zoomIn }
                >
                    <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                   onPress={ zoomOut }
                >
                    <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>

            </View>
        )
    }
    

    const renderMap = () => {

        

        return(
            <View style={{ flex: 1, backgroundColor: 'red'}}>
                
                <MapView 
                    ref={mapView}
                    style={{ flex: 1}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                >
                    <MapViewDirections
                          origin={fromLocation}
                          destination={toLocation}
                          apikey={GOOGLE_API_KEY}
                          strokeColor={COLORS.primary}
                          strokeWidth={5}
                          optimizeWaypoints={true}
                          onReady={ result => {
                               setDuration(result.duration)

                               if(!isReady){
                                     mapView.current.fitToCoordinates(result.coordinates, {
                                         edgePadding:{
                                              right: (SIZES.width / 20),
                                              bottom: (SIZES.height / 4),
                                              left: (SIZES.width / 20),
                                              top: (SIZES.height / 8)
                                         }
                                     })

                                     //Reposition
                                     let nextLoc = {
                                         latitude: result.coordinates[0]["latitude"],
                                         longitude: result.coordinates[0]["longitude"]
                                     }

                                     if(result.coordinates.length >= 2){
                                         let angle = calculateAngle(result.coordinates);
                                         setAngle(angle);
                                     }

                                     setFromLocation(nextLoc);
                                     setIsReady(true);
                               }
                          }}
                    />
                { destinationMarker() }
                { carIcon() }
                </MapView>
            </View>
        )
    }



    return (
        <View style={{flex: 1}}>
         
          { renderMap() }

          { renderDestinationHeader() }

          { renderDeliveryInfo() }

          { renderButtons() } 
        </View>
    )
}

export default OrderDeliveryScreen
