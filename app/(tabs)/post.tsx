import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const ThreadsScreen = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const db = getFirestore();
  const auth = getAuth();
  
  const handlePostSubmit = async () => {
    setUserId(auth.currentUser!.uid);
    setUserName(auth.currentUser!.displayName);
    await addDoc(collection(db, "posts"), {
      comments: "",
      content: content,
      image: '',
      likes: 0,
      user: {
        name: userName,
        id: userId
      }
    });
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: 10, paddingVertical: 30 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />

        <Text>{userName ?? "Username"}</Text>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor={"black"}
          placeholder="O que tem passado na sua mente?"
          multiline
        />
      </View>

      <View style={{ marginTop: 20 }} />

      <Button onPress={handlePostSubmit} title="Compartilhar" />
    </SafeAreaView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});
