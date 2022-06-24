import React from "react"
import {View, Button, Text, StyleSheet} from "react-native"
import AppModal from "../components/AppModal";

export default class SettingsScreen extends React.Component {

    constructor() {
        super();
        this.state={
            visible: false
        }
    }


    render() {
        return (
            <View style={Styles.wrapper}>
                <View style={Styles.centered}>
                    <Button
                        title='Open modal'
                        onPress={() => this.setState({visible: true})}
                    />
                    <AppModal
                        visible={this.state.visible}
                        onRequestClose={() => {
                            console.log(1)
                            this.setState({visible: false})
                        }}
                    >
                        <Button
                            title='Close modal'
                            onPress={() => this.setState({visible: false})}
                        />
                    </AppModal>
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
