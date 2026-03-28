import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/styles/colors";
import { styles } from "./styles";

import { Categories } from "@/components/categories";
import { Link } from "@/components/link";
import { Option } from "@/components/options";
import { categories } from "@/utils/categories";
import { useState } from "react";

export default function Index() {
  const [category, setCategory] = useState(categories[0].name)

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
        data={["1", "2", "3"]}
        keyExtractor={item => item}
        renderItem={() => (<Link 
                              name="RocketSeat"
                              url="https://www.rocketseat.com.br/"
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