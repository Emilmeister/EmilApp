import React from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar, ScrollView,
} from "react-native"
import {Slider} from '@miblanchard/react-native-slider';
import {BaseClient} from "../../service/BaseClient";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Colors} from "../../constant/Colors";
import {StockLevel} from "../../constant/StockLevel";
import {DeadCross} from "../../constant/DeadCross";
import AppModal from "../../components/AppModal";
import {AppButton} from "../../components/AppButton";
import {TextSizes} from "../../constant/TextSizes";
import {AppCheckBox} from "../../components/AppCheckBox";
import {store} from "../../stores/GlobalStore";
import {observer, Observer} from 'mobx-react'
import {Currencies} from "../../constant/Currencies";
import {InstrumentTypes} from "../../constant/InstrumentTypes";

@observer
export default class StocksScreen extends React.Component {

    constructor({navigation}) {
        super();
        this.navigation = navigation
        this.state = {
            isShowFilterModal: false,
            pagination: {
                withLevel: true,
                page: 1,
                limit: 30,
                sort: "asd",
                total: null,
            },
            stocks: [],
        }

    }

    toggleFilterModal = () => {
        if (this.state.isShowFilterModal) {
            let pag = this.state.pagination
            pag.page = 1
            this.setState({pagination: pag, stocks: []})
            this.loadData(pag)
        }
        this.setState({isShowFilterModal: !this.state.isShowFilterModal})
    }

    componentDidMount() {
        this.loadData(this.state.pagination)
    }

    loadData = (pagination) => {
        let pag = {
            page: pagination.page,
            limit: pagination.limit,
            sort: pagination.sort,
            filter: {
                levels: store.FilterStore.levels.length === 0 ? null : store.FilterStore.levels,
                currencies: store.FilterStore.currencies.length === 0 ? null : store.FilterStore.currencies,
                instrumentTypes: store.FilterStore.instrumentTypes.length === 0 ? null : store.FilterStore.instrumentTypes,
                deadCrossFrom: store.FilterStore.deadCrossFrom,
                deadCrossTo: store.FilterStore.deadCrossTo
            }
        }
        BaseClient.sendRequest("POST", `/trading/stocks.json`, pag).then( resp => {
            let pag = {...this.state.pagination}
            let stocks = this.state.stocks
            stocks = stocks.concat(resp.data)
            pag.total = resp.total
            this.setState({pagination: pag, stocks: stocks})
        }).catch(err => console.info(err))
    }

    loadMoreData = () => {
        if(this.state.pagination.total > this.state.pagination.page * this.state.pagination.limit) {
            let pag = this.state.pagination
            pag.page = pag.page+1
            this.setState({pagination: pag})
            this.loadData(pag)
        }
    }

    renderFilterModal = () => {
        return (
            <Observer>
                {() => {
                    return (
                        <AppModal
                            visible={this.state.isShowFilterModal}
                            onRequestClose={this.toggleFilterModal}
                        >
                            <ScrollView style={{flexDirection: "column", padding: 20, height: "85%"}}>
                                <Text style={{...Styles.name, flex: undefined, marginTop: 20}}>Select level</Text>
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInLevels(StockLevel.LOWER_LEVEL)}
                                    label={'Lower level'}
                                    onPress={() => store.FilterStore.setLevel(StockLevel.LOWER_LEVEL)}
                                />
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInLevels(StockLevel.CORIDOR)}
                                    label={'Coridor'}
                                    onPress={() => store.FilterStore.setLevel(StockLevel.CORIDOR)}
                                />
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInLevels(StockLevel.UPPER_LEVEL)}
                                    label={'Upper level'}
                                    onPress={() => store.FilterStore.setLevel(StockLevel.UPPER_LEVEL)}
                                />
                                <Text style={{...Styles.name, flex: undefined, marginTop: 15}}>Select currency</Text>
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInCurrencies(Currencies.RUB)}
                                    label={Currencies.RUB}
                                    onPress={() => store.FilterStore.setCurrency(Currencies.RUB)}
                                />
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInCurrencies(Currencies.USD)}
                                    label={Currencies.USD}
                                    onPress={() => store.FilterStore.setCurrency(Currencies.USD)}
                                />
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInCurrencies(Currencies.EUR)}
                                    label={Currencies.EUR}
                                    onPress={() => store.FilterStore.setCurrency(Currencies.EUR)}
                                />
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInCurrencies(Currencies.CNY)}
                                    label={Currencies.CNY}
                                    onPress={() => store.FilterStore.setCurrency(Currencies.CNY)}
                                />
                                <Text style={{...Styles.name, flex: undefined, marginTop: 15}}>Select instruments</Text>
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInInstrumentTypes(InstrumentTypes.BOND)}
                                    label={InstrumentTypes.BOND}
                                    onPress={() => store.FilterStore.setInstrumentType(InstrumentTypes.BOND)}
                                />
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInInstrumentTypes(InstrumentTypes.CURRENCY)}
                                    label={InstrumentTypes.CURRENCY}
                                    onPress={() => store.FilterStore.setInstrumentType(InstrumentTypes.CURRENCY)}
                                />
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInInstrumentTypes(InstrumentTypes.STOCK)}
                                    label={InstrumentTypes.STOCK}
                                    onPress={() => store.FilterStore.setInstrumentType(InstrumentTypes.STOCK)}
                                />
                                <AppCheckBox
                                    isChecked={store.FilterStore.isInInstrumentTypes(InstrumentTypes.ETF)}
                                    label={InstrumentTypes.ETF}
                                    onPress={() => store.FilterStore.setInstrumentType(InstrumentTypes.ETF)}
                                />
                                <Text style={{...Styles.name, flex: undefined, marginTop: 15}}>Dead Cross</Text>
                                <Slider
                                    value={[store.FilterStore.deadCrossFrom, store.FilterStore.deadCrossTo]}
                                    step={0.01}
                                    minimumValue={-0.1}
                                    maximumValue={0.1}
                                    onValueChange={store.FilterStore.setDeadCross}
                                />
                                <View style={{flexDirection: "row", justifyContent: "space-between", paddingBottom: 50}}>
                                    <Text style={{...Styles.ticker, flex: undefined}}>{DeadCross.LOW_BORDER}</Text>
                                    <Text style={{...Styles.ticker, flex: undefined}}>{0}</Text>
                                    <Text style={{...Styles.ticker, flex: undefined}}>{DeadCross.HIGH_BORDER}</Text>
                                </View>
                            </ScrollView>
                            <View style={{height: "10%"}}>
                                <AppButton
                                    title="Confirm"
                                    onPress={this.toggleFilterModal}/>
                            </View>
                        </AppModal>
                    )
                }}
            </Observer>
        )
    }

    renderItem = ({item,index}) => {
        let logoSize = 30
        let {ticker, name} = item.searchMarketInstrument
        let level = item.level
        let deadCross = item.deadCross
        let ma50Color = item.ma200 < item.ma50 ? Colors.GREEN : Colors.RED
        let ma200Color = item.ma50 < item.ma200 ? Colors.GREEN : Colors.RED

        let levelLogo = null
        let deadCrossLogo = null

        if(level === StockLevel.CORIDOR) {
            levelLogo = (
                <Ionicons
                    name='reorder-two-outline'
                    size={logoSize}
                    color={Colors.BLUE}
                />)
        }

        if(level === StockLevel.UPPER_LEVEL) {
            levelLogo = (
                <Ionicons
                    name='trending-down-outline'
                    size={logoSize}
                    color={Colors.RED}
                />)
        }

        if(level === StockLevel.LOWER_LEVEL) {
            levelLogo = (
                <Ionicons
                    name='trending-up-outline'
                    size={logoSize}
                    color={Colors.GREEN}
                />)
        }

        if(DeadCross.isClose(deadCross)){
            deadCrossLogo = (
                <Ionicons
                    name='close-outline'
                    size={logoSize}
                    color={Colors.RED}
                />
            )
        }



        return (
            <TouchableOpacity
                style={Styles.label}
                onPress={() => {
                    this.navigation.navigate('StocksDetail', {
                        stock: item,
                        title: name
                    })
                }}
            >
                <View style={Styles.labelLeft} >
                    <View>
                        <Text style={Styles.name}>{name}</Text>
                    </View>
                    <View>
                        <Text style={Styles.ticker}>{ticker}</Text>
                    </View>
                </View>
                <View style={Styles.labelRight}>
                    <View style={Styles.labelRight}>
                        <View style={{justifyContent: 'center'}}>
                            <View>
                                {/*<Text style={Styles.name}>{currentPrice}$</Text>*/}
                            </View>
                        </View>
                        <View>
                            <View>
                                 <Text style={{...Styles.ticker, color: ma200Color}}>ma200</Text>
                            </View>
                            <View>
                                <Text style={{...Styles.ticker, color: ma50Color}}>ma50</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.centered}>
                        {levelLogo}
                        {deadCrossLogo}
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={Styles.wrapper}>
                <StatusBar barStyle="dark-content"/>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.stocks}
                    renderItem={this.renderItem}
                    style={{flex: 1}}
                    onScrollEndDrag={this.loadMoreData}
                />
                <TouchableHighlight
                    activeOpacity={0.3}
                    underlayColor={Colors.MAIN_COLOR}
                    style={Styles.floatButton}
                    onPress={this.toggleFilterModal}>
                    <Text style={Styles.textButton}>Filter</Text>
                </TouchableHighlight>
                <this.renderFilterModal/>
            </View>
        )
    }

}

const Styles = StyleSheet.create({
    wrapper: {
        flex : 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.MAIN_COLOR
    },
    centered: {
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        flex: 1,
        flexDirection: "row",
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: Colors.GRAY_LIGHTER_TEXT_COLOR
    },
    labelRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    labelLeft: {
        flex: 4,
        flexDirection: "column",
    },
    ticker: {
        flex: 1,
        fontSize: TextSizes.SMALL_TEXT,
        fontFamily: "Arial",
        color: Colors.GRAY_LIGHTER_TEXT_COLOR,
        padding: 5
    },
    name: {
        flex: 1,
        fontSize: TextSizes.DEFAULT_TEXT,
        fontWeight: "bold",
        fontFamily: "Arial",
        color: Colors.GRAY_TEXT_COLOR,
        padding: 5
    },
    floatButton: {
        width: 70,
        height: 40,
        backgroundColor: Colors.DEFAULT_BUTTON_COLOR,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,

    },
    textButton: {
        fontSize: TextSizes.MEDIUM_TEXT,
        fontWeight: "bold",
        fontFamily: "Arial",
        color: Colors.GRAY_TEXT_COLOR,
    },

})
