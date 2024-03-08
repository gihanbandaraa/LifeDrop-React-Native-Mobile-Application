import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../../App/Colours/Colours';
const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.PRIMARY,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily:'outfit-medium'
      }}>
      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18,fontFamily:'outfit-medium'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;