import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import COLORS from '../colours/Colours';

const Button = ({ title, onPress = () => {}, disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: disabled ? COLORS.PRIMARY : COLORS.PRIMARY,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: disabled ? 0.8 : 4, 
        borderWidth: 1,
        borderColor: disabled ? COLORS.red : COLORS.PRIMARY, 
        borderRadius: 10, 
      }}>
      <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: 18, fontFamily: 'outfit-medium' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
