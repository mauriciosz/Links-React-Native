import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    name: string
    icon: keyof typeof MaterialIcons.glyphMap
    variant?: "primary" | "secundary"
}

//-- Esse "...rest" serve para pegar todas as propriedades do TouchableOpacityProps
export function Option({name, icon, variant = "primary", ...rest}: Props){
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <MaterialIcons 
                name={icon} 
                size={16} 
                color={variant === "primary" ? colors.green[300] : colors.gray[400]}
            />

            <Text style={variant === "primary" ? styles.primaryTitle : styles.secundaryTitle}>
                {name}                
            </Text>
        </TouchableOpacity>


    )
}
