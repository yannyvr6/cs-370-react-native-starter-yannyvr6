import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomFormField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) {
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={{ marginBottom: 16, width: "100%" }}>
      {label && <Text style={{ marginBottom: 4, fontWeight: "bold" }}>{label}</Text>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          paddingHorizontal: 12,
        }}
      >
        <TextInput
          style={{ flex: 1, height: 48 }}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
