import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

import api from '../../services/api/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarCliente() {
    const route = useRoute();
    const navigation = useNavigation();

    const [id, setId] = useState(route.params?.id);
    const [nome, setNome] = useState(route.params?.nome);
    const [telCel, setTelCel] = useState(route.params?.tel_cel);
    const [telFixo, setTelFixo] = useState(route.params?.tel_fixo);
    const [email, setEmail] = useState(route.params?.email);


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const exibeAlert = () => {
        setShowAlert(true);
    }
    const editarCliente = async () => {
        try {
            if (nome == '' || nome == null) {
                setAlertMessage('Preencha corretamente o nome')
                exibeAlert();
                return;
            }
            if (isNaN(telCel)) {
                setAlertMessage('O número digitado está incorreto')
                exibeAlert();
                return;
            }
            if (isNaN(telFixo)) {
                setAlertMessage('O número digitado está incorreto')
                exibeAlert();
                return;
            }
            if ( email == '' || email == null) {
                setAlertMessage('Informe um email corretamente')
                exibeAlert();
                return;
            }

            const response = await api.put(`/contatos/${txtId}`, { nome: nome, telCel: telCel, telFixo: telFixo, email: email})
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        if ((error.request._response).includes('Failed')) {
                            console.log('Erro ao conectar com a API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config)
                });

            if (response != undefined) {
                if (response.data[0].changedRows == 1) {
                    setId('');
                    setNome('');
                    setTelCel('');
                    setTelFixo('');
                    setEmail('');
                    setAlertMessage('Contato alterado com sucesso!')
                    exibeAlert();
                } else {
                    console.log('O registro não foi alterado, verifique e tente novamente')
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

            <Text>ID</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={id.toString()}
                onChangeText={setId}
                readOnly
            />

            <Text>Nome</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={nome}
                onChangeText={setNome}
            />

            <Text>Celular</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={telCel.toString()}
                onChangeText={setTelCel}
            />
            <Text>Telefone fixo</Text>
            <TextInput
                style={styles.caixaDeTexto}
                value={telFixo.toString()}
                onChangeText={setTelFixo}
            />

            <TouchableOpacity
                onPress={() => {
                    editarCliente();
                }}
                style={styles.alignVH}>
                <Text>Salvar</Text>
            </TouchableOpacity>


            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        {
                            text: 'OK', onPress: async () => {
                                setShowAlert(false)
                                navigation.navigate('TodosClientes', {status: true});
                            }
                        }
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
        width: '80%',
        fontWeight: 'bold'
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