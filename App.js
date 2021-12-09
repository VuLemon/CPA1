import React ,{ useState, useEffect, component} from 'react'
import { Button, Text, View, StyleSheet, TextInput, Image, SafeAreaView, FlatList} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Navigate = createNativeStackNavigator()



export default function App() {
  return (
    <NavigationContainer>
      <Navigate.Navigator>
        <Navigate.Screen name="Home" component ={HomeScreen}/>
        <Navigate.Screen name="About" component ={AboutScreen}/>
        <Navigate.Screen name="AddFunds" component ={AddScreen}/>
        <Navigate.Screen name="Limit" component ={LimitPage}/>
        <Navigate.Screen name="List" component ={GameList}/>
      </Navigate.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    backgroundColor: 'midnightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  GameListScreen: {
    flex: 1,
    backgroundColor: 'midnightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  AddScreen1: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'navy'

  },
  AddScreen2: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkblue'

  },
  AddScreenBack: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkslateblue'
  },

  AboutScreen: {
    flex:2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'midnightblue',
  },

  MonthLimit: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'midnightblue',
  },

  Buttons: {
    flex: 1,
    color: "green",


  },
  Description: {
    fontSize:15,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  Trademark: {
    fontSize:15,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },

  Item: {
  backgroundColor: "gray",
  fontSize:28,
  },


  Title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: "white"
  },

  Textinput: {
    color: "white",
    fontSize: 20
  },

  Image: {
    height: 1000,
    width:  400,
    flex: 1,
  }
}
)
const ScreenTemplate = ({header,footer,children}) => {
  return (
    <SafeAreaView style={{flex:1,padding:0,margin:0}}>
      {header}
      <View style={{flex:1, backgroundColor:"#eee"}}>
            {children}
      </View>
      {footer}
    </SafeAreaView>
  )
}
const header =
  <Text style = {styles.Trademark}> Trademark by me!! </Text>
const footer =
  <Text style = {styles.Trademark}> It is I, eating macaroni </Text>



const Limit = ({month}) => {
  const[text, setText] = useState(0)
  const[limit,setLimit] = useState(0)

   useEffect(() => {GetLimit()},[])

  const StoringLimit = async(value) => {
    try{
  await AsyncStorage.setItem("limit",value)
  console.log("Success!")
    }
    catch (e) {
      console.log("error in storing balance")
    }
}

  const GetLimit = async() => {
    try{
  const limit = await AsyncStorage.getItem("limit")
  setLimit(limit)
  console.log("set successful")
  }
  catch{
    console.log("eggror")
  }
}

  return(
    <View>
      <Text style = {styles.Description}>
        Your current monthly limit for {month}  is {limit} $
      </Text>
      <TextInput style = {styles.Textinput}
        placeholder = "Amount of $$$"
        onChangeText = {text => {setText(parseFloat(text))}}
      />
      <Button style = {styles.Buttons}
        title = "set monthly limit"
        onPress = {() => {
          setLimit(text)
          StoringLimit(text)
        }
      }
      />
    </View>
  )
}



const GameList = ({navigation}) => {
  const [data,setData] = useState([])
  const getData = async() => {
    try{
    const data = await fetch("https://reactnative.dev/movies.json")
    const result = await data.json()
    setData(result.movies)
    } catch(e){
      console.dir();("error getting data")
    }
  }
  const renderitem = ({item}) => {
   return(
       <View style = {{flexDirection:"column", padding: 8}}>
         <Text style = {styles.Item}> {item.title}
         </Text>
       </View>
   )
 }
  useEffect(() => {getData()},[])
  return(
    <ScreenTemplate
      header = {header}
      footer = {footer}
      >
      <View style = {styles.GameListScreen}>
        <Text style = {styles.Description}> Current top 100 games according to GiantBomb </Text>
        <FlatList
          data = {data}
          renderItem = {renderitem}
          KeyExtractor = {item => item.id}
        />
        <Button style = {styles.Button}
          title = "return to home"
          onPress = {() => navigation.navigate("Home")}
        />
      </View>
    </ScreenTemplate>
  )
}

const LimitPage = ({navigation}) => {
  return(
    <ScreenTemplate
      header = {header}
      footer = {footer}
      >
      <View style = {styles.MonthLimit}>
        <Limit month = {"October"}/>
        <Button style = {styles.Button}
          title = "return to home"
          onPress = {() => navigation.navigate("Home")}
        />
      </View>
    </ScreenTemplate>
  )
}

const HomeScreen = ({navigation}) => {
  return(
    <ScreenTemplate
      header = {header}
      footer = {footer}
      >
      <View style = {{flex: 1}}>
        <View  style = {styles.HomeScreen}>
          <Text style = {styles.Title}>
          WISHLIST
          </Text>
          <Text style = {styles.Description}>
          Save up for the game you want!
          </Text>
        </View>
        <View style = {styles.HomeScreen}>
          <Image
            style = {styles.Image}
            source = {{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjYE8Ym74TbHf1QxL2cVumJmG0PuQwigQvg&usqp=CAU",}}
          />
        </View>
        <View  style = {styles.HomeScreen}>
          <Button style = {styles.Buttons}
            title = "Add budget"
            onPress = {() => navigation.navigate("AddFunds")}
          />
          <Button style = {styles.Buttons}
            title = "Set monthly limit"
            onPress = {() => navigation.navigate("Limit")}
          />
          <Button style = {styles.Buttons}
            title = "About us"
            onPress = {() => navigation.navigate("About")}
          />
          <Button style = {styles.Buttons}
            title = "Check out the top games right now"
            onPress = {() => navigation.navigate("List")}
          />
        </View>
      </View>
    </ScreenTemplate>
    )
}






const AddScreen = ({navigation}) => {
  return(
    <ScreenTemplate
      header = {header}
      footer = {footer}
      >
      <View style = {{flexDirection: 'column', flex: 1}}>
        <View style = {{flexDirection: 'row', flex: 5}}>
            {FirstHalfAdd()}
            {SecondHalfAdd()}
        </View>
        <View style = {styles.AddScreenBack}>
          <Button style = {styles.Buttons}
            title = "Go Home"
            onPress = {() => navigation.navigate("Home" )}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}

const FirstHalfAdd = () => {
  const [balance,setBalance] = useState(0)
  const [text,setText] = useState(0)

  useEffect(() => {GetBalance()},[])

  const StoringBalance = async(value) => {
    try{
  await AsyncStorage.setItem("balance",value)
  console.log("Success!")
    }
    catch (e) {
      console.log("error in storing balance")
    }
}

  const GetBalance = async() => {
  try{
  const balance = await AsyncStorage.getItem("balance")
  setBalance(balance)
  console.log("set successful")
  }
  catch{
    console.log("eggror")
  }
}
  return(
  <View style = {styles.AddScreen1}>
    <View style = {{flex: 5}}>
      <Text style = {styles.Description}>
        Want to keep track of how much money you have to spend on your favourite games?
        Wishlist helps you budget by showing how much money you have set aside for your gaming hobbies!
      </Text>
      <Text style = {styles.Title}>
        Your current budget: {balance}$
      </Text>
    </View>
    <View style = {{flex: 3}}>
      <TextInput style = {styles.Textinput}
        placeholder = "Amount of $$$"
        onChangeText = {text => {setText(parseFloat(text))}}
      />
    </View>
    <View style = {{flex: 1}}>
      <Button style = {styles.Buttons}
        title = "ADD"
        onPress ={() => {
          setBalance(text)
          StoringBalance(text)
          }
        }
      />
    </View>
  </View>
    )
}

const SecondHalfAdd = () => {
  const [gameText, setGameText] = useState('Nothing yet')
  const [favourite, setFavourite] = useState('Nothing yet')

useEffect(() => {GetFave()},[])

  const StoringFave = async(value) => {
    try{
  await AsyncStorage.setItem("fave",value)
  console.log("Succ!ess!")
    }
    catch (e) {
      console.log("error in storing fave")
    }
}

  const GetFave = async() => {
  try{
  const fave = await AsyncStorage.getItem("fave")
  setFavourite(fave)
  console.log("set successful!!!!!")
  }
  catch{
    console.log("egggy")
  }
}
  return(
  <View style = {styles.AddScreen2}>
    <View style = {{flex: 3}}>
      <Text style = {styles.Description}>
        Add your favourite games here!
        It is a wishlist afterall :33.
      </Text>
    </View>
    <View style = {{flex: 5}}>
      <Text style = {styles.Title}>
        Your top wish right now is {favourite}
      </Text>
      <TextInput style = {styles.Textinput}
        placeholder= "enter your favourite game here"
        onChangeText = {(text) => setGameText(text)}
      />
      <Button style = {styles.Buttons}
        title = "make favorite"
        onPress ={() => {
          setFavourite(gameText)
          StoringFave(gameText)
          }
        }
      />
    </View>
  </View>
    )
}

const AboutScreen = ({navigation}) => {
  return(
    <ScreenTemplate
      header = {header}
      footer = {footer}
      >
      <View style = {{flex:1}}>
        <View style = {styles.AboutScreen}>
          <Text style = {styles.Title}>
           What is Wishlist?
          </Text>
          <Text style = {styles.Description}>
          Wishlist is an app that helps you
          keep track of the money you set aside for your gaming hobbies. Enter the amount you wish
          to set aside each month, and the app will keep track of a total balance with which you can spend
          on your games. Also included is a literal wishlist (the app is called wishlist after all) that keeps
          track of which game you want to buy. That way when the time comes, you
          won't forget what you want to buy
          </Text>
        </View>
        <View style = {{flexDirection: 1}}>
          <Button style = {styles.Buttons}
              title = "Go Home"
              onPress = {() => navigation.navigate("Home" )}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}
