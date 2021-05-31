import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface buttonProps {
  color: string;
  icon: any;
  text: string;
  textColor: string;
  disabled: boolean;
  action: any
}

export function Button({ color, icon, text, textColor, disabled, action }: buttonProps) {
  return(
    <View style={styles.mainWrapper}>
      <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: color }]} disabled={disabled} onPress={action}>
        {icon}
        <Text style={[styles.textStyle, { marginLeft: icon ? 10 : 0, color: textColor }]} >{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  contentWrapper: {
    flexDirection: "row"
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8
  },
  textStyle: {
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold"
  }
});
