import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const navigation = useNavigation();

    const navegaPesquisaPorNome = () => {
        navigation.navigate('DetalhesClientes')
    }

    const navegaNovoCliente = () => {
        navigation.navigate('NovoCliente')
    }
    const navegaTodosClientes = () => {
        navigation.navigate('TodosClientes')
    }

    return (
        <SafeAreaView style={styles.container}>
        <Text>Seja bem vindo(a)!</Text>
        <Button title='Abrir pesquisa por nome' onPress={navegaPesquisaPorNome}/>
        <Button title='Abrir cadastro cliente' onPress={navegaNovoCliente}/>
        <Button title='Exibir todos os clientes' onPress={navegaTodosClientes}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    }
});