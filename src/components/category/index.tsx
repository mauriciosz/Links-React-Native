import { colors } from "@/styles/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, PressableProps, Text } from "react-native"
import { styles } from "./style"

/* Ao fazer "Props = PressableProps & {}" estamos dizendo que o tipo "Props" possui 
   tudo que tem no PressableProps e também o que foi passado de forma explicita, como
   o "name" e o "icon" 
*/
type Props = PressableProps & {
    name: string
    icon: keyof typeof MaterialIcons.glyphMap // extrai a tipagem baseado na chave (nome) dos icones definidos em MaterialIcons
    isSelected: Boolean
}

export function Category({ name, icon, isSelected, ...rest}: Props){
    const color = isSelected ? colors.green[300] : colors.gray[400]
    return (
        <Pressable style={styles.container} {...rest}>
            <MaterialIcons name={icon} size={16} color={color}/>
            <Text style={[styles.name, {color}]}>{name}</Text>
        </Pressable>
    )
}