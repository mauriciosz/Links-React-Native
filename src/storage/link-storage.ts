/* 
    O Async Storage é um armazenamento baseado em "chave" e "Valor", 
    guardando o valor sempre como um texto, exemplo:

    chave: valor
    name: "Mauricio"

    chave: valor
    links: [{name: "Rocketseat", url: "www.rocketseat.com.br"}, {name: "Google", url: "www.google.com"}, {}, {}]
*/

import AsyncStorage from "@react-native-async-storage/async-storage"

const LINKS_STORAGE_KEY = "links-storage"

export type LinkStorage = {
    id: string
    name: string
    url: string
    category: string
}

//-- recupera o conteúdo gravado em string e converte em objeto
async function Get(): Promise<LinkStorage[]>{
    //-- Busca os dados gravados em LINKS_STORAGE_KEY 
    const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY)
    
    //-- Se não for NULL converte a string em JSON, se for NULL devolve uma lista/array vazia
    const response = storage ? JSON.parse(storage) : []

    //-- retorna o objeto JSON do tipo especificado na função (LinkStorage)
    return response
}

//-- recebe o objeto e converte em string para gravar no storage
async function Save(newLink: LinkStorage){
    try{
        //-- recupera os dados gravados no LINKS_STORAGE_KEY
        const storage = await Get()

        //-- Passa para o Update o que foi recuparado do Storage mais o novo link 
        //-- e converte tudo em string antes de salvar
        const update = JSON.stringify([...storage, newLink])

        //-- Grava no storage pela chave LINKS_STORAGE_KEY
        await AsyncStorage.setItem(LINKS_STORAGE_KEY, update)

    }catch (error){
        throw error
    }}

//-- assim facilita para usar, podendo chamar como linkStorage.Get ou linkStorage.Save
export const linkStorage = {
    Get, 
    Save
}

