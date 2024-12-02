import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons

const BMIScreen = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  // Function to calculate BMI
  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (
      isNaN(weightNum) ||
      isNaN(heightNum) ||
      weightNum <= 0 ||
      heightNum <= 0
    ) {
      Alert.alert(
        "Invalid Input",
        "Please enter valid weight and height values."
      );
      return;
    }

    // BMI formula: weight (kg) / (height (m) * height (m))
    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue.toFixed(1)); // Round to 1 decimal place
    determineCategory(bmiValue);
  };

  // Function to determine BMI category
  const determineCategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obesity");
    }
  };

  // Function to reset all inputs and results
  const resetCalculator = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
  };

  // Recommendations based on BMI value
  const getRecommendations = (bmi) => {
    if (bmi < 18.5) return "Increase calorie intake with balanced meals.";
    if (bmi < 24.9) return "Maintain a balanced diet and regular exercise.";
    if (bmi < 29.9)
      return "Focus on moderate calorie deficit and regular workouts.";
    return "Consult a dietitian and focus on cardio exercises.";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>
      <TextInput
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Height (m)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={calculateBMI} style={styles.button}>
          <Ionicons name="calculator" size={20} color="white" />
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetCalculator} style={[styles.button, styles.resetButton]}>
          <Ionicons name="refresh" size={20} color="white" />
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      {bmi && (
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Your BMI: {bmi}</Text>
            <Text style={styles.categoryText}>Category: {category}</Text>
            <Text style={styles.recommendationText}>
              {getRecommendations(parseFloat(bmi))}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f8ff", // Lighter background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50", // Darker text color
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000", // Shadow effect
    shadowOffset: { width: 0, height: 4 }, // Deeper shadow offset
    shadowOpacity: 0.2, // Slightly higher opacity
    shadowRadius: 6, // Larger radius for smoother shadow
    elevation: 5, // For Android devices
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db", // Blue button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: "48%",
    justifyContent: "center",
    shadowColor: "#000", // Button shadow
    shadowOffset: { width: 0, height: 4 }, // Deeper shadow offset
    shadowOpacity: 0.2, // Slightly higher opacity
    shadowRadius: 8, // Larger radius for smoother shadow
    elevation: 5, // For Android devices
  },
  resetButton: {
    backgroundColor: "#e74c3c", // Red button
    shadowColor: "#000", // Button shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // For Android devices
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    elevation: 10, // Larger card shadow
    shadowColor: "#000", // Card shadow
    shadowOffset: { width: 0, height: 4 }, // Deeper shadow offset
    shadowOpacity: 0.2, // Slightly higher opacity
    shadowRadius: 10, // Larger radius for smoother shadow
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  categoryText: {
    fontSize: 20,
    color: "#555",
    marginTop: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: "#777",
    marginTop: 10,
  },
});


export default BMIScreen;
