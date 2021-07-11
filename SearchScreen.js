import React from 'react';
import { Text, View,StyleSheet, FlatList,TouchableOpacity,TextInput} from 'react-native';

import db from '../config';
export default class Searchscreen extends React.Component {
  constructor(){
    super();
    this.state={
      search:'',
      allTransactions:[],
      lastVisibleTransaction:''
    }
  }


  searchTransaction=async(searchText)=>{
   searchText=searchText.toLowerCase();
   var first_alpha=searchText.split("")[0]
   if(first_alpha==='s'){
    const transaction=await db.collection("transactions").where("studentId","==",searchText).limit(10).get()
    transaction.docs.map((doc)=>{
      this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()],
        lastVisibleTransaction:doc
      })

  })
}
  else if(first_alpha==='b'){
    const transaction=await db.collection("transactions").where("bookId","==",searchText).limit(10).get()
    transaction.docs.map((doc)=>{
      this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()],
        lastVisibleTransaction:doc
      })
      //console.log(this.state.lastVisibleTransaction.id)

    })

  }

}
  fetchMore=async()=>{
    var searchText=this.state.search.toLowerCase();
    var first_alpha=searchText.split("")[0]
    if(first_alpha==='s'){
     const transaction=await db.collection("transactions").where("studentId","==",this.state.search).startAfter(this.state.lastVisibleTransaction).limit(10).get()
     transaction.docs.map((doc)=>{
       this.setState({
         allTransactions:[...this.state.allTransactions,doc.data()],
         lastVisibleTransaction:doc
       })
 
   })
 }
   else if(first_alpha==='b'){
     const transaction=await db.collection("transactions").where("bookId","==",this.state.search).startAfter(this.state.lastVisibleTransaction).limit(10).get()
     transaction.docs.map((doc)=>{
       this.setState({
         allTransactions:[...this.state.allTransactions,doc.data()],
         lastVisibleTransaction:doc
       })
       //console.log(this.state.lastVisibleTransaction.id)
 
     })
  }
  console.log(this.state.allTransactions.length);
}


    render() {
      return (
      <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput style={styles.bar}
            placeholder="enter student id or book id"
            onChangeText={(text)=>{this.setState({
              search:text
            })}}
            />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={()=>{this.searchTransaction(this.state.search)}}>
            <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={this.state.allTransactions}
        keyExtractor={(item,index)=>{
          index.toString()
        }}
        renderItem={({item})=>(
          <View style={{borderBottomWidth:3}}>

            <Text>{"Book id :"+item.bookId}</Text>
            <Text>{"student id :"+item.studentId}</Text>
            <Text>{"transactionType :"+item.transactionType}</Text>
            <Text>{"Date :"+item.date.toDate()}</Text>
            </View>
        )}
        onEndReached={this.fetchMore}
        onEndReachedThreshold={0.7}
      />
      </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'pink',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })