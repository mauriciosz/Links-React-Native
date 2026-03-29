import { useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { linkStorage } from "@/storage/link-storage";

export default function Add(){
    const [category, setCategory] = useState("")
    // Utiliza o useState para controlar a variavel name e url
    const [name, setName] = useState("")
    const [url, setUrl] = useState<string>()
    /* A forma escrita do useState para ambos os casos refletem a mesma coisa, 
        que ambos recebem uma string vazia... */

    async function handleAdd(){
        try{
            if(!category){
                return Alert.alert("Categoria", "Selecione a Categoria!")
            }

            if(!name.trim()){
                return Alert.alert("Nome", "Nome é um campo obrigatório!")
            }

            if(!url?.trim()){
                return Alert.alert("URL", "URL é um campo obrigatóri!")
            }

            //-- Grava os dados no Storage
            await linkStorage.Save({
                id: new Date().getTime().toString(),
                name,
                url,
                category
            })

            Alert.alert("Sucesso", "Novo Link adicionado", [
                { 
                    text: "Ok", 
                    onPress: () => router.back()
                }
            ])

            // -- UTILIZAR PARA TESTAR SE ESTÁ GRAVANDO CORRETAMENTE OS DADOS!!!
            const data = await linkStorage.Get()
            console.log(data)
            
            console.log({category, name, url})
        } catch(error){
            Alert.alert("Erro", "Não foi possível salvar o link")
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
                </TouchableOpacity>
                <Text style={styles.title}>Novo</Text>
            </View>                        
            
            <Text style={styles.label}>Seleciona uma Categoria</Text>

            <Categories onChange={setCategory} selected={category}/>

            <View style={styles.form}>
                <Input placeholder="Digite o nome do site" onChangeText={setName}/>
                <Input placeholder="Digite a URL..." onChangeText={setUrl} autoCapitalize="none"/>
            </View>

            <Button title="Adicionar" onPress={handleAdd}/>
        </View>
    )
}


