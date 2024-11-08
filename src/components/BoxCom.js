import { View, Text } from 'react-native'
import React from 'react'

const BoxCom = ({children}) => {
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
    {children}
    </View>
  )
}

export default BoxCom

