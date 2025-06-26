import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { useGameDetails } from '../../hooks/useGames';

export default function GameDetailScreen() {
    const { gameId } = useLocalSearchParams();
    const gameIdNum = Number(gameId);

    const { game, loading, error } = useGameDetails(gameIdNum);
    const navigation = useNavigation();

    useEffect(() => {
      if (game?.name) {
        navigation.setOptions({ title: game.name });
      }
    }, [game]);


    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;
    if (error || !game) return <Text style={styles.error}>Failed to load game.</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{game.name}</Text>
            <Image source={{ uri: game.background_image }} style={styles.image} />
            <Text style={styles.text}>Rating: {game.rating}</Text>
            <Text style={styles.text}>Released: {game.released}</Text>
            <Text style={styles.text}>{game.description_raw || 'No description available.'}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
    text: { fontSize: 16, marginBottom: 8 },
    error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
