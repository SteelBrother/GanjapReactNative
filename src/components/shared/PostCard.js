import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { firestore } from '../../utils/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function PostCard({ post }) {
  const [newComment, setNewComment] = useState('');

  const handleLike = async () => {
    try {
      const postRef = doc(firestore, 'posts', post.id);
      await updateDoc(postRef, {
        likes: post.likes + 1
      });
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const postRef = doc(firestore, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment)
      });
      setNewComment('');
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{post.content}</Text>
      {post.imageUrl ? <Image source={{ uri: post.imageUrl }} style={styles.image} /> : null}

      {/* Botón de Like */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Ionicons name="thumbs-up-outline" size={20} color="#FFF" />
          <Text style={styles.likeButtonText}> ({post.likes})</Text>
        </TouchableOpacity>

        {/* Comentarios */}
        <TouchableOpacity style={styles.commentButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#FFF" />
          <Text style={styles.commentButtonText}> Comentarios</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de comentarios */}
      <View style={styles.commentSection}>
        <Text style={styles.commentsTitle}>Comentarios:</Text>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <Text key={index} style={styles.commentText}>{comment}</Text>
          ))
        ) : (
          <Text style={styles.noCommentsText}>No hay comentarios aún</Text>
        )}
      </View>

      {/* Input para nuevo comentario */}
      <TextInput
        style={styles.input}
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Escribe un comentario"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
        <Text style={styles.commentButtonText}>Comentar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  likeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  commentSection: {
    marginTop: 10,
  },
  commentsTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentText: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 5,
  },
  noCommentsText: {
    color: '#AAA',
    fontSize: 14,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#555',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});
