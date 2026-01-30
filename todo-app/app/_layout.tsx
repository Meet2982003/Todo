// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { COLORS } from "../constants/colors";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.background,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="tabs"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
