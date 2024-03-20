import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList, showAlert } from 'react-native';

import api from '../../services/api/api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'


export default function TodosClientes() {
    const navigation = useNavigation();
    const route = useRoute();

    let [flatListClientes, setFlatListClientes] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [status, setStatus] = useState(false);


    const navegaEditar = (pId, pNome, pTel_cel, pTel_fixo, pEmail) => {
        navigation.navigate('EditarCliente', { id: pId, nome: pNome, celular: pTel_cel, telefone: pTel_fixo, email: pEmail });
    }

    const exibeAlert = () => {
        setShowAlert(true);
    }

    const listarClientes = async () => {
        try {

            const response = await api.get('/contatos')
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
                if (response.data.length > 0) {
                    let temp = [];
                    for (let i = 0; i < response.data.length; i++) {
                        temp.push(response.data[i]);
                    }
                    setFlatListClientes(temp);

                    temp = [];

                } else {
                    setAlertMessage('Nenhum registro foi localizado!');
                    exibeAlert();
                    return;
                }
            }

        } catch (error) {
            console.log(error)
        }
    }


    const deletarCliente = async (id) => {
        try {

            const response = await api.delete(`/contatos/${id}`)
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
                if (response.data[0].affectedRows > 0) {
                    setRefresh(prevState => !prevState);
                    setAlertMessage('Registro excluido com sucesso!');
                    exibeAlert();

                } else {
                    setAlertMessage('Nenhum registro foi localizado!');
                    exibeAlert();
                    return;
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            listarClientes();
        }, [refresh])
    )

    let listViewItem = (item) => {
        return (
            <View style={styles.modeloCard}>
                <Text style={styles.textHeader}>ID</Text>
                <Text style={styles.textValue}>{item.id}</Text>

                <Text style={styles.textHeader}>Nome</Text>
                <Text style={styles.textValue}>{item.nome}</Text>

                <Text style={styles.textHeader}>Celular</Text>
                <Text style={styles.textValue}>{item.celular}</Text>

                <Text style={styles.textHeader}>Telefone</Text>
                <Text style={styles.textValue}>{item.telefone}</Text>

                <Text style={styles.textHeader}>Email</Text>
                <Text style={styles.textValue}>{item.email}</Text>


                <View style={[styles.containerButton, styles.align]}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Atenção!',
                                'Deseja realmente excluir esse registro?',
                                [
                                    {
                                        text: 'SIM',
                                        onPress: () => { deletarCliente(item.id) }
                                    },
                                    {
                                        text: 'Cancelar',
                                        onPress: () => { return }
                                    }
                                ]
                            )
                        }}>
                        <FontAwesome5 name='trash-alt' color='#FA8072' size={24} />
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => {
                            navegaEditar(item.id, item.nome, item.celular, item.telefone, item.email)
                        }}>
                        <FontAwesome5 name='edit' color='yellow' size={24} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                <FlatList
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={flatListClientes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listViewItem(item)}
                />

            </View>
            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setShowAlert(false) }
                    ]
                )
            )}
        </View>
    )

}


const styles = StyleSheet.create({
    containerButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10
    },
    modeloCard: {
        backgroundColor: 'purple',
        marginBottom: 30,
        padding: 15,
        borderRadius: 10,
        elevation: 8
    },
    textHeader: {
        color: 'pink',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textValue: {
        color: 'white',
        fontSize: 20
    }
})