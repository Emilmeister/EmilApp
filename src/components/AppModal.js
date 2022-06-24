import React from "react"
import {View, Modal, StyleSheet} from "react-native"


export default class AppModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(JSON.stringify(props.visible))
    }


    render() {
        return (
            <Modal
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
                onDismiss={this.props.onDismiss}
                animationType='slide'
                presentationStyle='pageSheet'

            >
                <View style={{...Styles.default, ...this.props.style}}>
                    {this.props.children}
                </View>
            </Modal>
        )
    }

}

const Styles = StyleSheet.create({
    default: {
        flex: 1,
        flexDirection: 'column'
    },
})
