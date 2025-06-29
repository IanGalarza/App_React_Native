import LocationMap from '@/components/LocationMap';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useUserLocation } from '@/hooks/useUserLocation';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function ProfileScreen() {
  const [image, setImage] = useState(
    'https://static.vecteezy.com/system/resources/previews/034/371/675/non_2x/person-silhouette-icon-user-icon-vector.jpg'
  );
  const { location, error: locationError } = useUserLocation();

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access media library is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } else {
      Alert.alert(
        'Choose an option',
        'Select an image source',
        [
          {
            text: 'Camera',
            onPress: async () => {
              const { status } = await ImagePicker.requestCameraPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permission denied', 'Camera permission is required!');
                return;
              }

              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
              });

              if (!result.canceled) {
                setImage(result.assets[0].uri);
              }
            },
          },
          {
            text: 'Gallery',
            onPress: async () => {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Permission denied', 'Permission to access media library is required!');
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
              });

              if (!result.canceled) {
                setImage(result.assets[0].uri);
              }
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <View style={styles.separator} />
      <Text style={styles.subtitle}>Manage your account and preferences</Text>

      {/* Foto de perfil */}
      <Pressable onPress={pickImage} style={[styles.card, styles.rowCard]}>
        <Image source={{ uri: image }} style={styles.avatar} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Profile Picture</Text>
          <Text style={styles.cardSubtitle}>Tap to change your photo</Text>
        </View>
      </Pressable>

      {/* Nombre de usuario */}
      <View style={styles.card}>
        <View style={styles.iconRow}>
          <IconSymbol name="person.fill" color="#444" size={20} />
          <Text style={styles.cardValue}>example_user</Text>
        </View>
      </View>

      {/* Email */}
      <View style={styles.card}>
        <View style={styles.iconRow}>
          <IconSymbol name="envelope.fill" color="#444" size={20} />
          <Text style={styles.cardValue}>user@example.com</Text>
        </View>
      </View>

      {/* Ubicación */}
      {location && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Location</Text>
          <LocationMap latitude={location.latitude} longitude={location.longitude} />
        </View>
      )}
      {locationError && <Text style={styles.errorText}>{locationError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardValue: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
