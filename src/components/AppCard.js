import React from "react"
import {View, Text, StyleSheet} from "react-native"
import {Colors} from "../constant/Colors";


export default class AppCard extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{...Styles.default, ...this.props.style}}>
                {this.props.children}
            </View>
        )
    }

}

const Styles = StyleSheet.create({
    default: {
        flex : 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: Colors.MAIN_COLOR,
        borderRadius: 6,
        elevation: 5,
        // margin: 20,
    },
})
