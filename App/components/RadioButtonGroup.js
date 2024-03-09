import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../colours/Colours';

const RadioButtonGroup = ({ label, options, selectedOption, onSelect, error }) => {
    const halfLength = Math.ceil(options.length / 2);
    const firstColumnOptions = options.slice(0, halfLength);
    const secondColumnOptions = options.slice(halfLength);
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.optionsContainer}>
          <View style={styles.column}>
            {firstColumnOptions.map((option) => (
              <View key={option} style={styles.option}>
                <Text style={styles.optionText}>{option}</Text>
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
                <Text style={styles.optionText}>{option}</Text>
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
      color: COLORS.grey,
      fontFamily: 'outfit',
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
      fontFamily: 'outfit-medium',
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
