import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        gap: 12
    },

    details: {
        flex: 1,        
    },

    name: {
        color: colors.gray[100],
        fontSize: 16,
        fontWeight: "600"
    },

    url: {
        color: colors.gray[400],
        fontSize: 14
    }
})