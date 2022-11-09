import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
 
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
 
export const screenDimensions = () => {
  const [dimensions, setDimensions] = useState({ window, screen });
 
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });
 
  return { sw: dimensions.screen.width, sh: dimensions.screen.height, ww: dimensions.window.width, wh: dimensions.window.height };
};