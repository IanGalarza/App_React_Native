import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <View style={styles.separator} />
      <Text style={styles.subtitle}>Manage your account and preferences</Text>

      {/* Foto de perfil */}
      <View style={[styles.card, styles.rowCard]}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/034/371/675/non_2x/person-silhouette-icon-user-icon-vector.jpg' }}
          style={styles.avatar}
        />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Profile Picture</Text>
          <Text style={styles.cardSubtitle}>This is your current profile photo.</Text>
        </View>
      </View>

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
});
