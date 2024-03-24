import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,useColorScheme  } from 'react-native';
import COLORS from '../colours/Colours';

const RadioButtonGroup = ({ label, options, selectedOption, onSelect, error }) => {
    const halfLength = Math.ceil(options.length / 2);
    const firstColumnOptions = options.slice(0, halfLength);
    const secondColumnOptions = options.slice(halfLength);
    const colorScheme =useColorScheme();
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.optionsContainer}>
          <View style={styles.column}>
            {firstColumnOptions.map((option) => (
              <View key={option} style={styles.option}>
                <Text style={[styles.optionText, { color: colorScheme === 'dark' ? COLORS.black : COLORS.black }]}>{option}</Text>
                <TouchableOpacity
                  style={[
                    styles.radio,
                    { backgroundColor: selectedOption === option ? COLORS.PRIMARY : COLORS.light },
                    error && { borderColor: COLORS.red }, // Add error border color
                  ]}
                  onPress={() => onSelect(option)}
                />
              </View>
            ))}
          </View>
          <View style={styles.column}>
            {secondColumnOptions.map((option) => (
              <View key={option} style={styles.option}>
             <Text style={[styles.optionText, { color: colorScheme === 'dark' ? COLORS.black : COLORS.black }]}>{option}</Text>
                <TouchableOpacity
                  style={[
                    styles.radio,
                    { backgroundColor: selectedOption === option ? COLORS.PRIMARY : COLORS.light },
                    error && { borderColor: COLORS.red }, // Add error border color
                  ]}
                  onPress={() => onSelect(option)}
                />
              </View>
            ))}
          </View>
        </View>
        {error && (
          <Text style={{ color: COLORS.red, fontSize: 12, marginLeft: 10 }}>{error}</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    label: {
      marginBottom: 5,
      fontSize: 14,
      color: COLORS.BLACK,
      fontFamily: 'Outfit',
    },
    optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      flex: 1,
      marginLeft: 10,
      marginBottom: 10,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    optionText: {
      marginRight: 10,
      fontFamily: 'Outfit Regular',
      color:COLORS.black
    },
    radio: {
      width: 25,
      height: 25,
      borderRadius: 10,
      borderWidth: 1,
      marginBottom: 10,
      borderColor: COLORS.PRIMARY,
    },
  });
  
  export default RadioButtonGroup;
