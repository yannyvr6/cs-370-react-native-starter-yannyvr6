import React, { useState } from "react";
import {  View,  Text,  ScrollView,  TouchableOpacity,  Image,  ActivityIndicator,  Alert,  StyleSheet, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { supabase } from "../../lib/supabaseClient";
import { useGlobal } from "../../context/GlobalContext";
import FormField from "../component/FormField";
import { useRouter } from "expo-router";

// Helper to upload file to Supabase storage and get public URL
async function uploadFile(file: any, folder: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from(folder)
    .upload(filePath, await fetch(file.uri).then((r) => r.blob()));

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage.from(folder).getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}

// Create video metadata in the database
async function createVideo({
  title,
  aiPrompt,
  videoFile,
  thumbnailFile,
  userId,
}: {
  title: string;
  aiPrompt: string;
  videoFile: any;
  thumbnailFile: any;
  userId: string;
}) {
  try {
    // Upload video and thumbnail simultaneously
    const [videoUrl, thumbnailUrl] = await Promise.all([
      uploadFile(videoFile, "videos"),
      uploadFile(thumbnailFile, "thumbnails"),
    ]);

    // Insert metadata into the videos table
    const { error } = await supabase.from("videos").insert([
      {
        title,
        url: videoUrl,
        thumbnail_url: thumbnailUrl,
        ai_prompt: aiPrompt,
        creator_id: userId,
      },
    ]);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Error creating video:", err);
    return { success: false, error: (err as any).message };
  }
}

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

  const handleSubmit = async () => {
    if (!title || !videoFile || !thumbnailFile) {
      Alert.alert("Error", "Please provide title, video, and thumbnail.");
      return;
    }

    setLoading(true);

    const result = await createVideo({
      title,
      aiPrompt,
      videoFile,
      thumbnailFile,
      userId: user?.id!,
    });

    setLoading(false);

    if (result.success) {
      Alert.alert("Success", "Video uploaded successfully!");
      setTitle("");
      setAiPrompt("");
      setVideoFile(null);
      setThumbnailFile(null);

      router.replace("/(tabs)/home");
    } else {
      Alert.alert("Error", "Failed to upload video.");
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