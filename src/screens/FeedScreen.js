// FeedScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { firestore } from '../utils/firebase'
import { collection, onSnapshot } from 'firebase/firestore';

const PostCard = ({ post }) => (
  <View style={styles.card}>
    {post.imageUrl ? (
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
    ) : (
      <View style={styles.imagePlaceholder}>
        <Text>Sin imagen</Text>
      </View>
    )}
    <Text style={styles.title}>{post.title || 'Sin título'}</Text>
    <Text style={styles.status}>{post.status || 'Sin estado'}</Text>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.likeButton}>
        <Text>👍 {post.likes || 0}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.commentButton}>
        <Text>💬 {post.comments?.length || 0}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postsCollection = collection(firestore, 'posts'); // 'posts' es el nombre de la colección en Firestore
    const unsubscribe = onSnapshot(
      postsCollection,
      querySnapshot => {
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(fetchedPosts);
        setLoading(false);
      },
      err => {
        console.error('Error al obtener los posts:', err);
        setError('Error al obtener los posts');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text>No hay posts disponibles</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  status: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  likeButton: {
    padding: 5,
  },
  commentButton: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});
