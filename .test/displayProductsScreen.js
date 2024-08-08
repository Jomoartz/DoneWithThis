import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import apiClient from "./client";


const DisplayProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await apiClient
          .from('products')
          .select('*');
          console.log('gotten products')

        if (error) {
          throw error;
        }

        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.productName}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginBottom: 12,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DisplayProductScreen;
