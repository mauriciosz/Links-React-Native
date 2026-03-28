import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:62
    },

    titulo:{
        color:colors.gray[300],
        fontSize:22        
    },

    subTitulo:{
        color:colors.green[300],
        fontSize:18
    },

    header:{
        paddingHorizontal:24,
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:42
    },

    logo:{
        width:38,
        height:32
    },

    links: {
        borderTopWidth: 1,
        borderTopColor: colors.gray[600]
    },

    linksContent: {
        gap: 20,
        padding: 24,
        paddingBottom: 100
    },

    modal: {
        flex: 1,
        justifyContent: "flex-end"
    },

    modalContent: {
        borderTopWidth: 1,
        borderTopColor: colors.gray[800],
        backgroundColor: colors.gray[900],
        paddingBottom: 32,
        padding: 24
    },

    modalHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32
    },

    modalCategory: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: colors.gray[400]
    },

    modalLinkName: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.gray[200]
    },

    modalUrl: {
        fontSize: 14,
        color: colors.gray[400]
    },

    modalFooter: {
        flexDirection: "row",
        marginTop: 32,
        width: "100%",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: colors.gray[600],
        paddingVertical: 14
    }


})