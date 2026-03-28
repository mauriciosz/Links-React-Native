import { FlatList } from "react-native";

import { categories } from "@/utils/categories";
import { Category } from "../category";
import { styles } from "./style";

type Props = {
    selected: string
    onChange: (category: string) => void
}

export function Categories({selected, onChange}: Props){
    return (
        <FlatList
            //-- Dados (lista) que serão renderizados
            data={categories} 

            //-- Define quem é a chave utilizada para identificação (única)
            keyExtractor={(item) => item.id} 

            //-- Componente (Category) que será renderizado para cada item da lista
            renderItem={({ item }) => (
                <Category 
                    name={item.name} 
                    icon={item.icon} 
                    isSelected={selected === item.name}
                    onPress={() => onChange(item.name)}/>)} 

            //-- Apresenta a lista de categorias na horizontal
            horizontal

            //-- Aplica o estileo "Container" que criamos em style.ts
            style={styles.container}

            //-- Aplica o estilo "content" que criamos em style.ts para o contant container
            contentContainerStyle={styles.content}
        />
    )
}