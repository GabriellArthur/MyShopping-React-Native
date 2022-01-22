import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import firestore from '@react-native-firebase/firestore';

import { styles } from './styles';
import { Product, ProductProps } from '../Product';

import { shoppingListExample } from '../../utils/shopping.list.data';

export function ShoppingList() {
   const [products, setProducts] = useState<ProductProps[]>([]);

   //Leitura unica de Documentos e fica observando alteração
   useEffect(() => {
      const subscribe = firestore()
         .collection('products')
         //.where('quantity','==', 1)  //filtrar
         //.limit(3)                   //Limitar quantidade aparecida
         //.orderBy('description')     //Ordernada pela descricao(por padrao A - Z(asc))
         /*.orderBy('quantity')        //Ordernar com um inicio e um fim
            .startAt(2)                //Ordernar com um inicio e um fim
            .endAt(4)*/                //Ordernar com um inicio e um fim
         .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map((doc)=>{
               return{
                  id: doc.id,
                  ...doc.data()
               }
            }) as ProductProps[];
            
            setProducts(data);
         })
         return () => subscribe();
   }, []);

   /*
   //Leitura unica de Documentos e não fica observando alteração
   useEffect(() => {
      firestore()
         .collection('products')
         .get()
         .then(response => {
            const data = response.docs.map(doc => {
               return {
                  id: doc.id,
                  ...doc.data()
               }
            }) as ProductProps[];
            setProducts(data);
         })
         .catch((error) => console.error(error));
   }, []);
   */

   /*
   //Leitura unica de um Documento
   useEffect(() => {
      firestore().collection('products')
      .doc('1tXpIqwjhHGbDybD6uNy') //ID
      .get()
      .then(response => console.log({
         id:response.id,
         ...response.data()
      }))
   }, []);
   */

   return (
      <FlatList
         data={products}
         keyExtractor={item => item.id}
         renderItem={({ item }) => <Product data={item} />}
         showsVerticalScrollIndicator={false}
         style={styles.list}
         contentContainerStyle={styles.content}
      />
   );
}
