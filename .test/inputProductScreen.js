import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Alert,
} from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";

// Validation schema
const validationSchema = Yup.object({
  productName: Yup.string().required("Required"),
  image: Yup.mixed().required("Required"),
  description: Yup.string().optional(),
  price: Yup.number().required("Required").positive("Must be positive"),
});

export default function InputProductScreen({ sendData }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleImagePick = async (setFieldValue) => {
    if (!hasPermission) {
      Alert.alert(
        "Permission required",
        "You need to grant access to the media library."
      );
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setFieldValue("image", result.assets[0].uri);
      } else {
        console.log("Image selection cancelled");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          productName: "",
          image: null,
          description: "",
          price: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Convert price to number and prepare data
          const formValues = { ...values, price: Number(values.price) };
          console.log('Form Values:', formValues);

          // Use the sendData prop to send data to the parent component
          {sendData && sendData(formValues);}
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <View>

            <View style={styles.field}>
              <Text>Product Name:</Text>
              <TextInput
                placeholder="Product Name"
                autoCapitalize="words"
                onChangeText={handleChange("productName")}
                onBlur={handleBlur("productName")}
                value={values.productName}
                style={styles.input}
              />
              {touched.productName && errors.productName && <Text style={styles.error}>{errors.productName}</Text>}
            </View>

            <View style={styles.field}>
              <Text>Description:</Text>
              <TextInput
                placeholder="Description"
                autoCapitalize="words"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text>Price:</Text>
              <TextInput
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                style={styles.input}
              />
              {touched.price && errors.price && <Text style={styles.error}>{errors.price}</Text>}
            </View>

            <View style={styles.field}>
              <Text>Image:</Text>
              <Button
                title="Pick an image"
                onPress={() => handleImagePick(setFieldValue)}
              />
              {values.image && (
                <Image source={{ uri: values.image }} style={styles.image} />
              )}
            </View>

            <Button title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  field: {
    marginBottom: 12,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 4,
  },
  error: {
    color: 'red',
  },
});
