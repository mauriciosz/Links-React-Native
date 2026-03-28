import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";

type Props = {
    name: string
    url: string
    onDetails: () => void // função sem retorno... apenas para fazer o "selected"
}

export function Link(props: Props){
    return (
        <View style={style.container}>
            <View style={style.details}>
                <Text style={style.name} numberOfLines={1}>
                    {props.name}
                </Text>

                <Text style={style.url} numberOfLines={1}>
                    {props.url}
                </Text>
            </View>

            <TouchableOpacity onPress={props.onDetails}>
                <MaterialIcons name="more-horiz" size={20} color={colors.gray[400]}/>
            </TouchableOpacity>
        </View>
    )
}
