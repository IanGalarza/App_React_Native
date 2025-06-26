import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import { useGames } from '../../hooks/useGames';
import { Game } from '../../types/rawg.types';

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const { games, loading, error, pageInfo } = useGames(page, 10);
  const router = useRouter();
  // Primeros 10 juegos para carrusel
  const featuredGames = games.slice(0, 10);

  const loadMore = () => {
    if (!loading && pageInfo.next) {
      setPage(prev => prev + 1);
    }
  };

  const goToDetail = (gameId: number) => {
    router.push({
      pathname: '/game/[gameId]',
      params: { gameId: gameId.toString() }
    });
  };

  const renderFeaturedGame = ({ item }: { item: Game }) => (
    <TouchableOpacity onPress={() => goToDetail(item.id)} style={styles.carouselItem}>
      <Image source={{ uri: item.background_image }} style={styles.carouselImage} />
      <Text style={styles.gameTitle} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderGame = ({ item }: { item: Game }) => (
    <TouchableOpacity onPress={() => goToDetail(item.id)} style={styles.listItem}>
      <Image source={{ uri: item.background_image }} style={styles.listImage} />
      <View style={styles.listTextContainer}>
        <Text style={styles.gameTitle}>{item.name}</Text>
        <Text style={styles.gameInfo}>Rating: {item.rating.toFixed(1)}</Text>
        <Text style={styles.gameInfo}>Released: {item.released || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );


  const ListHeader = () => {
    const { width: windowWidth } = useWindowDimensions();

    const carouselWidth = (120 + 12) * featuredGames.length; // ancho total del carrusel
    const isWeb = windowWidth >= 768; // asumimos web si ancho >= 768 

    return (
      <>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.separator} />
        <Text style={styles.subtitle}>Explore your favorite games now!</Text>

        <View style={{ alignItems: isWeb ? 'center' : 'flex-start' }}>
          <FlatList
            data={featuredGames}
            renderItem={renderFeaturedGame}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.carousel, { width: isWeb ? carouselWidth : '100%' }]}
          />
        </View>

        <View style={styles.separator} />
        <Text style={styles.subtitle}>All Games</Text>
      </>
    );
  };

  const ListFooter = () => {
    if (loading) return <ActivityIndicator size="large" color="#000" style={{ marginVertical: 10 }} />;

    if (pageInfo.next)
      return (
        <TouchableOpacity onPress={loadMore} style={styles.loadMoreBtn}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );

    return null;
  };

  return (
    <FlatList
      data={games}
      renderItem={renderGame}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      contentContainerStyle={{ padding: 16, paddingTop: 80, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
    color: '#555',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
  },
  carousel: {
    marginBottom: 20,
  },
  carouselItem: {
    width: 120,
    marginRight: 12,
  },
  carouselImage: {
    width: '100%',
    height: 70,
    borderRadius: 6,
    marginBottom: 6,
  },
  gameTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  listImage: {
    width: 90,
    height: 90,
  },
  listTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  gameInfo: {
    fontSize: 12,
    color: '#555',
  },
  loadMoreBtn: {
    paddingVertical: 12,
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
