import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { Alert, FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/options";
import { linkStorage, LinkStorage } from "@/storage/link-storage";
import { categories } from "@/utils/categories";
import { useCallback, useState } from "react";

export default function Index() {
  const [link, setLink] = useState<LinkStorage>([] as LinkStorage)
  //-- lista de LinkStorage que inicia vazia...
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [category, setCategory] = useState(categories[0].name)
  const [showModal, setShowModal] = useState(false)

  async function getLinks(){
    try{
      //-- Retorna TODOS os registros no Storage
      const response = await linkStorage.Get();

      //-- Filtra somente registros da categoria selecionada
      const filtrados = response.filter((item) => item.category === category)

      //-- passa registros filtrados
      setLinks(filtrados)
    }catch(error){
      Alert.alert("Erro", "Não foi possível listar os Links")
    }
  }
  
  async function linkRemove(){
    try {
      //-- Revome o Link selecionado
      await linkStorage.Remove(link.id)

      //-- Atualiza lista de Links
      getLinks()

      //-- Fecha a tela Modal
      setShowModal(false)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir Link")
      console.log(error)
    }    
  }

  function handleRemove(){
    Alert.alert("Exclusão", "Certeza que deseja remover Link selecionado?", [
      { style: "cancel", text: "Não" },
      { text: "Sim", onPress: linkRemove}
    ])
  }

  function handleDetails(selected: LinkStorage){
    setShowModal(true)
    setLink(selected)
  }

  //-- É executado sempre que o valor de Category mudar, chamando assim a getLinks()
  /* Essa função foi trocada pelo UseCallBack com useFocusEffect
  useEffect(() => 
    {getLinks()}, [category]
  )
  */

  useFocusEffect(
    useCallback(() => {
      getLinks()  
    }, [category])
  ) 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo}/>
        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]}/>
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category}/>

      <FlatList 
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (<Link 
                                    name={item.name}
                                    url={item.url}
                                    onDetails={() => handleDetails(item)}
                                  />)}
        style={styles.links}                          
        contentContainerStyle={styles.linksContent}
      />

      <Modal transparent visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{link.category}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons name="close" size={20} color={colors.gray[400]}/>
              </TouchableOpacity>
            </View>            

            <Text style={styles.modalLinkName}>{link.name}</Text>
            <Text style={styles.modalUrl}>{link.url}</Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant="secundary" onPress={handleRemove}/>
              <Option name="Abrir" icon="language"/>
            </View>
          </View>
        </View>
      </Modal>      
    </View>
  );
}