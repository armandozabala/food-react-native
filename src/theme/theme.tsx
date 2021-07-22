import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';


export const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
             width: 0,
             height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1
   },
   container:{
    flex: 1,
    backgroundColor: COLORS.lightGray4
  }
})