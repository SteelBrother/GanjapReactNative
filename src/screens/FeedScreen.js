import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firestore, storage } from '../utils/firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import PostCard from '../components/shared/PostCard';
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const postsCollection = collection(firestore, 'posts');
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImageAsync = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `images/${Date.now()}-${Math.random().toString(36).substring(7)}`);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return '';
    }
  };

  const handleCreatePost = async () => {
    if (content) {
      setIsSubmitting(true);
      try {
        let imageUrl = '';
        if (image) {
          imageUrl = await uploadImageAsync(image);  // Subir imagen y obtener URL
        }
        await addDoc(collection(firestore, 'posts'), {
          content,
          imageUrl: imageUrl || '',
          likes: 0,
          comments: [],
        });
        setContent('');
        setImage(null);
      } catch (error) {
        console.error('Error al crear el post:', error);
      }
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={styles.loadingText}>Cargando posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Formulario para crear un nuevo post */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          placeholder="¿Qué estás pensando?"
          multiline
        />
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <Ionicons name="image-outline" size={24} color="#FFF" />
            <Text style={styles.iconButtonText}>Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCreatePost}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>{isSubmitting ? 'Publicando...' : 'Publicar'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista de posts */}
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay posts disponibles</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 10,
  },
  formContainer: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#444',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    minHeight: 100,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButtonText: {
    color: '#FFF',
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
