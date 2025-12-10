import React, { useState } from "react";
import {  View,  Text,  ScrollView,  TouchableOpacity,  Image,  ActivityIndicator,  Alert,  StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { supabase } from "../../lib/supabaseClient";
import { useGlobal } from "../../context/GlobalContext";
import FormField from "../component/FormField";
import { useRouter } from "expo-router";

export default function Create() {
  const { user } = useGlobal();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [videoFile, setVideoFile] = useState<any>(null);
  const [thumbnailFile, setThumbnailFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Pick a file (video or thumbnail)
  const openPicker = async (type: "video" | "image") => {
    const result = await DocumentPicker.getDocumentAsync({
      type: type === "video" ? "video/*" : "image/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      if (type === "video") setVideoFile(result.assets[0]);
      else setThumbnailFile(result.assets[0]);
    }
  };

  // Upload file to Supabase storage
  const uploadFile = async (file: any, folder: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(folder)
      .upload(filePath, await fetch(file.uri).then((r) => r.blob()));

    if (error) throw error;

    // Return public URL
    const { data: publicUrlData } = supabase.storage.from(folder).getPublicUrl(filePath);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async () => {
    if (!title || !videoFile || !thumbnailFile) {
      Alert.alert("Error", "Please provide title, video, and thumbnail.");
      return;
    }

    try {
      setLoading(true);

      // Upload video and thumbnail
      const videoUrl = await uploadFile(videoFile, "videos");
      const thumbnailUrl = await uploadFile(thumbnailFile, "thumbnails");

      // Insert metadata into Supabase table
      const { error } = await supabase.from("videos").insert([
        {
          title,
          url: videoUrl,
          thumbnail_url: thumbnailUrl,
          creator_id: user?.id,
          ai_prompt: aiPrompt,
        },
      ]);

      if (error) throw error;

      Alert.alert("Success", "Video uploaded successfully!");
      setTitle("");
      setAiPrompt("");
      setVideoFile(null);
      setThumbnailFile(null);

      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.heading}>Upload Video</Text>

        <FormField
          label="Video Title"
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Video Picker */}
        <Text style={styles.label}>Video</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => openPicker("video")}
        >
          {videoFile ? (
            <Text>{videoFile.name}</Text>
          ) : (
            <Text style={styles.uploadText}>Select Video</Text>
          )}
        </TouchableOpacity>

        {/* Thumbnail Picker */}
        <Text style={styles.label}>Thumbnail</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => openPicker("image")}
        >
          {thumbnailFile ? (
            <Image
              source={{ uri: thumbnailFile.uri }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Text style={styles.uploadText}>Select Thumbnail</Text>
          )}
        </TouchableOpacity>

        <FormField
          label="AI Prompt"
          placeholder="Enter AI prompt used"
          value={aiPrompt}
          onChangeText={setAiPrompt}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Upload Video</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  heading: { fontSize: 24, fontWeight: "700", marginBottom: 16 },
  label: { fontSize: 16, fontWeight: "600", marginVertical: 8 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploadText: { color: "#666" },
  submitBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
