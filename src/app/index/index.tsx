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
  //-- lista de LinkStorage que inicia vazia...
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [category, setCategory] = useState(categories[0].name)

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
                                    onDetails={() => console.log("Clicou")}
                                  />)}
        style={styles.links}                          
        contentContainerStyle={styles.linksContent}
      />

      <Modal transparent visible={false}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>Curso</Text>
              <TouchableOpacity>
                <MaterialIcons name="close" size={20} color={colors.gray[400]}/>
              </TouchableOpacity>
            </View>            

            <Text style={styles.modalLinkName}>Rocketseat</Text>
            <Text style={styles.modalUrl}>https://www.rocketseat.com.br/</Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant="secundary"/>
              <Option name="Abrir" icon="language"/>
            </View>
          </View>
        </View>
      </Modal>      
    </View>
  );
}