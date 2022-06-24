import React from "react";
import {View, StyleSheet, TouchableOpacity, Text} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import {TextSizes} from "../constant/TextSizes";


const Box = props => {
    const { isChecked } = props

    return (
        <View style={isChecked ? Styles.checked : Styles.unchecked}>
            { isChecked ?
                <Ionicons
                    name="checkmark-sharp"
                    size={TextSizes.BIG_TEXT}
                />
                : null
            }
        </View>
    )
}


export const AppCheckBox = props => {
    const { isChecked, label, onPress } = props
    return (
        <TouchableOpacity onPress={onPress} style={Styles.row}>
            <Box isChecked={isChecked}/>
            <Text>
                {label}
            </Text>
        </TouchableOpacity>
    )
}


const Styles = StyleSheet.create({
    checked: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: TextSizes.BIG_TEXT/4,
        borderWidth: 2,
        marginRight: TextSizes.BIG_TEXT/2,
    },
    unchecked: {
        paddingBottom: TextSizes.BIG_TEXT,
        paddingRight: TextSizes.BIG_TEXT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: TextSizes.BIG_TEXT/4,
        borderWidth: 2,
        marginRight: TextSizes.BIG_TEXT/2,
    },

    row: {
        margin: TextSizes.BIG_TEXT/2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})