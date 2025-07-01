import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useGameDetails } from '../../hooks/useGames';

export default function GameDetailScreen() {
  const { gameId } = useLocalSearchParams();
  const gameIdNum = Number(gameId);

  const { game, loading, error } = useGameDetails(gameIdNum);
  const navigation = useNavigation();

  useEffect(() => {
    if (game?.name) {
      navigation.setOptions({ title: game.name });
    } else {
      navigation.setOptions({ title: 'Loading...' });
    }
  }, [game]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;
  if (error || !game) return <Text style={styles.error}>Failed to load game.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: game.background_image }} style={styles.image} />
        <Text style={styles.title}>{game.name}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Rating:</Text>
          <Text style={styles.infoValue}>{game.rating.toFixed(1)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Released:</Text>
          <Text style={styles.infoValue}>{game.released || 'N/A'}</Text>
        </View>

        {game.genres && game.genres.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Genres:</Text>
            <Text style={styles.infoValue}>{game.genres.map(g => g.name).join(', ')}</Text>
          </View>
        )}

        {game.platforms && game.platforms.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Platforms:</Text>
            <Text style={styles.infoValue}>{game.platforms.map(p => p.platform.name).join(', ')}</Text>
          </View>
        )}

        {game.developers && game.developers.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Developer:</Text>
            <Text style={styles.infoValue}>{game.developers.map(d => d.name).join(', ')}</Text>
          </View>
        )}

        {game.publishers && game.publishers.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Publisher:</Text>
            <Text style={styles.infoValue}>{game.publishers.map(p => p.name).join(', ')}</Text>
          </View>
        )}
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.description}>{game.description_raw || 'No description available.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  infoLabel: {
    fontWeight: '600',
    color: '#444',
    marginRight: 6,
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    flexShrink: 1,
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
    textAlign: 'justify',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
