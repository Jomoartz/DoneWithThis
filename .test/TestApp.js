import React from "react";
import InputProductScreen from "./inputProductScreen";
import apiClient from "./client";
import DisplayProductScreen from './displayProductsScreen'
import { View, StyleSheet } from "react-native";

// Define the InsertData function properly
const InsertData = async (data) => {
  try {
    const { data: responseData, error } = await apiClient
      .from("products")
      .insert([
        {
          productName: data.productName,
          image: data.image,
          description: data.description,
          price: data.price,
        }
      ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted:", responseData);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};



// Main App component
export default function TestApp() {
  return (
    <View style={styles.container}>
    <InputProductScreen sendData={InsertData} />
    <View style={{width:"100%", height:30, backgroundColor:'grey'}}/>
    <DisplayProductScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:'100%',
    paddingTop:10,

  }
})