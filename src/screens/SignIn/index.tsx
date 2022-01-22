import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   async function handleSignInAnonymously() {
      const { user } = await auth().signInAnonymously();
      console.log(user)
   }

   //ERROR:
   //https://firebase.google.com/docs/auth/admin/errors
   function handleCreateUserAccount() {                           //Criar conta
      auth().createUserWithEmailAndPassword(email, password)
         .then(() => Alert.alert('Usuario Criado com sucesso'))
         .catch(error => {
            switch (error.code) {
               case 'auth/email-already-in-use':
                  Alert.alert("O e-mail fornecido já está em uso por outro usuário. Cada usuário precisa ter um e-mail exclusivo.");
                  break;
               case 'auth/invalid-email':
                  Alert.alert("O valor fornecido para a propriedade do usuário email é inválido.");
                  break;
               case 'auth/weak-password':
                  Alert.alert("A senha fornecido é fraca, deve conter no minimo 6 digitos");
                  break;
               default:
                  Alert.alert("Os campos não foram preenchidos corretamente");
                  break;
            }
         })
   }

   function handleSigninWithEmailAndPassword() {               //Logar
      auth()
         .signInWithEmailAndPassword(email, password)
         .then(() => Alert.alert("Logado com Sucesso"))
         .catch(error => {
            switch (error.code) {
               case 'auth/user-not-found':
                  Alert.alert("Não há registro de usuário existente correspondente ao identificador fornecido.");
                  break;
               default:
                  Alert.alert("Os campos não foram preenchidos corretamente");
                  break;
            }
         })

   }

   function handleForgotPassword(){
      auth().sendPasswordResetEmail(email)
      .then(()=>Alert.alert("Enviamos um link para o seu e-mail, para você redefinir a sua senha"))
   }

   return (
      <Container>
         <Title>MyShopping</Title>
         <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

         <Input
            placeholder="e-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
         />

         <Input
            placeholder="senha"
            secureTextEntry
            onChangeText={setPassword}
         />

         <Button title="Entrar" onPress={handleSigninWithEmailAndPassword} />

         <Account>
            <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
            <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
         </Account>
      </Container>
   );
}