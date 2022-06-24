import React from "react"
import {View, Text, StyleSheet} from "react-native"
import CandleStickChart from "../components/CandleStickChart";


export default class HomeScreen extends React.Component {


    render() {
        return (
            <View style={Styles.wrapper}>
                <View style={Styles.centered}>
                   <CandleStickChart/>
                </View>
            </View>
        )
    }

}

const Styles = StyleSheet.create({
    wrapper: {
        flex : 1,
        flexDirection: "row"
    },
    centered: {
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
    }
})
