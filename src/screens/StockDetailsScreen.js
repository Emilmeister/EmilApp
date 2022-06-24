import React from "react"
import {View, Text, StyleSheet, StatusBar} from "react-native"
import CandleStickChart from "../components/CandleStickChart";
import {BaseClient} from "../service/BaseClient";
import {CandlesResolution} from "../constant/CandlesResolution";


export default class StockDetailsScreen extends React.Component {

    constructor({route, navigation}) {
        super();
        let {stock} = route.params

        this.state = {
            data: []
        }

        this.loadCandles(stock.searchMarketInstrument.figi, CandlesResolution.DAY)
    }

    loadCandles(figi, resolution) {
        BaseClient.sendRequest('GET', `/trading/candles.json?figi=${figi}&candleResolution=${resolution.value}`).then(
            res => {
                let arr = res.map( item => {
                    let candle = {
                        open:  item.o,
                        close: item.c,
                        high:  item.h,
                        low:   item.l,
                        volume: item.v,
                        time: this.convertTime(item.time)
                    }
                    return candle
                })
                this.setState({data : arr})
            }
        )
    }


    convertTime = time => {
        return new Date(time.year, time.monthValue-1, time.dayOfMonth, time.hour, time.minute)
    }




    render() {
        return (
            <View style={Styles.wrapper}>
                <StatusBar barStyle="dark-content"/>
                <View style={Styles.centered}>
                    <CandleStickChart
                        data = {this.state.data}
                    />
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
        flexDirection: 'column',
        // alignItems: "center",
        // justifyContent: "center",
    }
})
