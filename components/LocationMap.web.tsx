import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  latitude: number;
  longitude: number;
}

const containerStyle = {
  width: '100%',
  height: '200px',
};

export default function LocationMapWeb({ latitude, longitude }: Props) {
  const center = { lat: latitude, lng: longitude };

  const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;

  return (
    <View style={styles.wrapper}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
});