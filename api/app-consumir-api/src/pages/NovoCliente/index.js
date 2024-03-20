import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NovoCLiente() {
    const [nome, setNome] = useState('');
    const [celular, setCel] = useState('');
    const [telefone, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const exibeAlert = () => {
        setShowAlert(true);
    }
    const salvarCliente = async () => {
        try {
            if (nome == '' || nome == null) {
                setAlertMessage('Preencha corretamente o nome')
                exibeAlert();
                return;
            }

            const response = await api.post('/contatos', { nome: nome, celular: celular, telefone: telefone, email: email })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if(error.request) {
                        if((error.request._response).includes('Failed')) {
                            console.log('Erro ao conectar com a API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config)
                });

                if (response != undefined) {
                    if(response.data[0].affectedRows == 1) {
                        setAlertMessage('Contato cadastrado com sucesso!')
                        exibeAlert();
                        setNome('')
                        setIdade(0);
                    } else {
                        console.log('O registro não foi inserido, verifique e tente novamente')
                    }
                }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardTitle}>
                <Text style={styles.title}>Preencha os campos abaixo:</Text>
            </View>

            <Text>Nome</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={nome}
                onChangeText={setNome}
            />

            <Text>Celular</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={celular.toString()}
                onChangeText={setCel}
            />
            
            <Text>Telefone fixo</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={telefone.toString()}
                onChangeText={setTel}
            />
            
            <Text>Email</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={email.toString()}
                onChangeText={setEmail}
            />
            
            <TouchableOpacity
                onPress={() => {
                    salvarCliente();
                }}
                style={styles.alignVH}>
                <Text>Salvar</Text>
            </TouchableOpacity>


            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setShowAlert(false) }
                    ]
                )
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 10
    },
    alignVH: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    caixaDeTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        width: '80%'
    },
    cardTitle: {
        paddingBottom: 30,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})