import React from "react"
import {View, Text, StyleSheet, Button, FlatList} from "react-native"
import {Chart} from "../constant/Chart";
import {TouchableWithoutFeedback} from "react-native-web";
import {Colors} from "../constant/Colors";
import {TextSizes} from "../constant/TextSizes";


export default class CandleStickChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 100,
            height: 100,
            header: null,
            footer: null,
            underHeader: null
        }
    }

    handlePressIn = (item) => {
        this.setState({
            footer: item.time.toString(),
            header: item.volume,
            underHeader: item.high+'-'+item.low
        })
    }

    handlePressOut = (item) => {
        this.setState({
            header: null,
            footer: null,
            underHeader: null
        })
    }

    renderCandleStick = (item, index, MAX, MIN, MAX_VOLUME) => {
        let generalHeight = MAX-MIN
        let k = generalHeight/(this.state.height - Chart.volumeHeight)

        let flag = item.close > item.open
        let up = Math.round((item.high - Math.max(item.close, item.open))/k)
        let down = Math.round((Math.min(item.close, item.open) - item.low)/k)
        let height = Math.round(Math.abs(item.close - item.open)/k)
        let paddingBottom =  Math.round((item.low - MIN)/k)
        let paddingTop =   Math.round( (MAX - item.high)/k)
        let marginTopVolume = Math.round( (MAX_VOLUME - item.volume)*Chart.volumeHeight/MAX_VOLUME)
        // console.log("-------------------" + index, (item.low - MIN))
        // console.log(up+down+height+paddingBottom+paddingTop)
        // console.log(up, down, height, paddingBottom, paddingTop)

        let topShadow = {...Styles.shadow, height: up}
        let bottomShadow = {...Styles.shadow, height: down}
        let box = {...Styles.box, height: height-4, backgroundColor: flag ? "#0f0": "#f00", paddingLeft: this.state.width/(this.props.data.length)-7 }
        let wrapper = {...Styles.candleWrapper, paddingBottom: paddingBottom,  paddingTop: paddingTop}
        let volume = {...Styles.volume, marginTop: marginTopVolume, paddingTop: Chart.volumeHeight - marginTopVolume }


        // console.log(marginTopVolume, Chart.volumeHeight - marginTopVolume)

        return (
            <TouchableWithoutFeedback
                key = {index.toString()}
                onPressIn={() => this.handlePressIn(item)}
                onPressOut={() => this.handlePressOut(item)}
            >
                <View >
                    <View style={wrapper}>
                        <View style={topShadow}/>
                        <View style={box}/>
                        <View style={bottomShadow}/>
                    </View>
                    <View style={volume}/>
                 {/*       <View/>
                    </View>*/}
                </View>

            </TouchableWithoutFeedback>

        )
    }

    onLayout = event => {
        let {width, height} = event.nativeEvent.layout
        this.setState({width : width, height: height})
    }

    maximum = data => {
        let max = 0;
        data.forEach(item => {
            if (max < item.high){
                max = item.high
            }
        })
        return max
    }

    maxVol = data => {
        let max = 0;
        data.forEach(item => {
            if (max < item.volume){
                max = item.volume
            }
        })
        return max
    }

    minimum = data => {
        let min = 10000000000;
        data.forEach(item => {
            if (min > item.low){
                min = item.low
            }
        })
        return min
    }



    render() {
        let maxValue = this.maximum(this.props.data)
        let minValue = this.minimum(this.props.data)
        let maxVolume = this.maxVol(this.props.data)
        return (
            <>
                {/*<View style={Styles.header}>
                    <Text>{this.state.header?.toString()}</Text>
                </View>
                <View style={Styles.header}>
                    <Text>{this.state.underHeader?.toString()}</Text>
                </View>*/}
                <View style={Styles.wrapper}>
                    <View style={{flex: 7}}>
                        <FlatList
                            inverted={true}
                            data={this.props.data.slice().reverse()}
                            keyExtractor={(item,index) => index.toString()}
                            renderItem={({item, index}) => this.renderCandleStick(item,  index, maxValue, minValue, maxVolume)}
                            horizontal={true}
                            onLayout={this.onLayout}
                            showsHorizontalScrollIndicator ={false}
                        />
                    </View>
                    <View style={Styles.rightPanel}>
                        <View>
                            <Text style={Styles.borderText}>{maxValue.toFixed(2)}$</Text>
                        </View>
                        <View>
                            <Text style={Styles.borderText}>{((maxValue-minValue)*3/4 + minValue).toFixed(2)}$</Text>
                        </View>
                        <View>
                            <Text style={Styles.borderText}>{((maxValue-minValue)*2/4 + minValue).toFixed(2)}$</Text>
                        </View>
                        <View>
                            <Text style={Styles.borderText}>{((maxValue-minValue)/4 + minValue).toFixed(2)}$</Text>
                        </View>
                        <View>
                            <Text style={Styles.borderText}>{minValue.toFixed(2)}$</Text>
                        </View>
                    </View>
                </View>
                {/*<View style={Styles.header}>
                    <Text>{this.state.footer?.toString()}</Text>
                </View>*/}

            </>

        )
    }
}

const Styles = StyleSheet.create({
    header : {
        flex : 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    wrapper: {
        // margin: 10,
        flex : 7,
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        flexDirection: "row"
    },
    centered: {
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
    },
    rightPanel: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: Chart.volumeHeight
    },
    shadow: {
        borderWidth: 1,
    },
    box: {
        // paddingLeft: 10,
        paddingRight: 5,
        borderWidth : 2,
    },
    candleWrapper: {
        borderBottomWidth: 1,
        marginRight: 1,
        marginLeft: 1,
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    volume: {
        marginRight: 1,
        marginLeft: 1,
        borderWidth: 1,
        borderColor: "#F60"
    },
    borderText: {
        fontSize: TextSizes.SMALL_TEXT,
        fontFamily: "Arial",
        color: Colors.GRAY_LIGHTER_TEXT_COLOR,
    },
})
