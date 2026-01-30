import { View, ViewProps, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedView({
  style,
  lightColor = COLORS.background,
  darkColor = COLORS.background,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = lightColor;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({});
