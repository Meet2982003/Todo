import { Text, TextProps, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

interface ThemedTextProps extends TextProps {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "subtitle" | "default_semi_bold";
}

export function ThemedText({
  style,
  lightColor = COLORS.text_primary,
  darkColor = COLORS.text_primary,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      {...rest}
      style={[
        { color: lightColor },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "default_semi_bold" ? styles.defaultSemiBold : undefined,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
