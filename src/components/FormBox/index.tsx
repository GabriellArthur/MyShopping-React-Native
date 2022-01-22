import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Container } from './styles';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Input';
import { Alert } from 'react-native';

export function FormBox() {
   const [description, setDescription] = useState('');
   const [quantity, setQuantity] = useState(0);

   //.doc('my-custom-id') e .set({ description,quantity,done:false})
   //ID Customizado

   //.add({ description,quantity,done:false})
   //firebase cuida do id pra mim
   async function handleProductAdd() {
      firestore()
         .collection('products')
         .add({ description, quantity, done: false, created: firestore.FieldValue.serverTimestamp()})
         .then(() => { Alert.alert('Deu certo') })
         .catch((error) => console.error(error));
   }
   return (
      <Container>
         <Input
            placeholder="Nome do produto"
            size="medium"
            onChangeText={setDescription}
         />

         <Input
            placeholder="0"
            keyboardType="numeric"
            size="small"
            style={{ marginHorizontal: 8 }}
            onChangeText={value => setQuantity(Number(value))}
         />

         <ButtonIcon
            size='large'
            icon="add-shopping-cart"
            onPress={handleProductAdd}
         />
      </Container>
   );
}
