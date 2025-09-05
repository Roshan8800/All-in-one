import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const buttonSize = (width - 50) / 4; // Adjusted for 10px margins

const CalculatorScreen = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+': return prev + current;
      case '−': return prev - current;
      case '×': return prev * current;
      case '÷': return prev / current;
      default: return current;
    }
  };

  const handleEquals = () => {
      if (operator && firstOperand !== null) {
          const result = calculate(firstOperand, parseFloat(displayValue), operator);
          setDisplayValue(String(result));
          setFirstOperand(null);
          setOperator(null);
          setWaitingForOperand(true);
      }
  }

  const handleButtonPress = (value: string) => {
    if (!isNaN(Number(value))) {
      inputDigit(value);
      return;
    }

    switch (value) {
      case '.':
        inputDecimal();
        break;
      case 'C':
        clearAll();
        break;
      case '+':
      case '−':
      case '×':
      case '÷':
        performOperation(value);
        break;
      case '=':
        handleEquals();
        break;
      // Other utilities can be added here
      case '±':
        setDisplayValue((parseFloat(displayValue) * -1).toString());
        break;
      case '%':
        setDisplayValue((parseFloat(displayValue) / 100).toString());
        break;
    }
  };

  const buttonLayout = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>
      <View style={styles.buttonGrid}>
        {buttonLayout.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((buttonValue) => {
              const isOperator = ['÷', '×', '−', '+', '='].includes(buttonValue);
              const isUtility = ['C', '±', '%'].includes(buttonValue);
              const isZero = buttonValue === '0';

              return (
                <TouchableOpacity
                  key={buttonValue}
                  style={[
                    styles.button,
                    isOperator && styles.operatorButton,
                    isUtility && styles.utilityButton,
                    isZero && styles.zeroButton,
                  ]}
                  onPress={() => handleButtonPress(buttonValue)}
                >
                  <Text style={[
                    styles.buttonText,
                    isUtility && styles.utilityButtonText,
                  ]}>
                    {buttonValue}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'flex-end',
    },
    displayContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 30,
    },
    displayText: {
      fontSize: 80,
      color: '#fff',
    },
    buttonGrid: {
      paddingBottom: 20,
      paddingHorizontal: 5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    button: {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
      backgroundColor: '#333',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 32,
      color: '#fff',
    },
    operatorButton: {
      backgroundColor: '#f09a36',
    },
    utilityButton: {
      backgroundColor: '#a5a5a5',
    },
    utilityButtonText: {
      color: '#000',
    },
    zeroButton: {
      width: buttonSize * 2 + 10,
      alignItems: 'flex-start',
      paddingLeft: 35,
    },
  });

export default CalculatorScreen;
