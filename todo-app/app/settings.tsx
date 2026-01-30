import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { storageService } from "@/services/storageService";
import { ThemedText } from "@/components/ThemedText";
import { COLORS } from "@/constants/colors";
import { ThemedView } from "@/components/ThemedView";

export default function SettingsScreen() {
  const handleClearCache = async () => {
    Alert.alert("Clear Cache", "Are you sure you want to clear the cache?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Clear",
        onPress: async () => {
          try {
            await storageService.clear();
            Alert.alert("Success", "Cache cleared successfully");
          } catch (error) {
            Alert.alert("Error", "Failed to clear cache");
          }
        },
        style: "destructive",
      },
    ]);
  };

  const SettingItem = ({
    icon,
    label,
    description,
    onPress,
  }: {
    icon: string;
    label: string;
    description: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon as any} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.settingContent}>
        <ThemedText style={styles.settingLabel}>{label}</ThemedText>
        <ThemedText style={styles.settingDescription}>{description}</ThemedText>
      </View>
      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={COLORS.text_disabled}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Settings</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          App
        </ThemedText>
        <SettingItem
          icon="information-circle"
          label="About"
          description="Version 1.0.0"
        />
        <SettingItem
          icon="help-circle"
          label="Help & Support"
          description="Get help with the app"
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Data
        </ThemedText>
        <SettingItem
          icon="trash"
          label="Clear Cache"
          description="Remove cached data"
          onPress={handleClearCache}
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          About
        </ThemedText>
        <SettingItem
          icon="logo-github"
          label="GitHub"
          description="View source code"
        />
        <SettingItem
          icon="mail"
          label="Contact"
          description="Get in touch with us"
        />
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Todo App v1.0.0</ThemedText>
        <ThemedText style={styles.footerSubtext}>
          Built with React Native & Expo
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  settingIconContainer: {
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text_primary,
  },
  settingDescription: {
    fontSize: 13,
    color: COLORS.text_secondary,
    marginTop: 2,
  },
  footer: {
    marginTop: "auto",
    paddingVertical: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text_primary,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.text_secondary,
    marginTop: 4,
  },
});
