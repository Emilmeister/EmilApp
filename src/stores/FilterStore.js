import {makeAutoObservable, runInAction} from "mobx";


class FilterStore {

    constructor() {
        makeAutoObservable(this)
    }

    levels = []
    currencies = []
    instrumentTypes = []
    deadCrossFrom = -0.1
    deadCrossTo = 0.1


    setDeadCross = arr => {
        runInAction( () => {
            this.deadCrossFrom = arr[0]
            this.deadCrossTo = arr[1]
        })
    }


    setLevel = value => {
        runInAction( () => {
            if (this.levels.findIndex(item => item === value) === -1) {
                console.log(1)
                this.levels.push(value)
            } else {
                console.log(2)
                this.levels = this.levels.filter(item => item !== value)
            }
        })
    }

    isInCurrencies = value => {
        return this.currencies.findIndex( item => item === value) !== -1
    }

    setCurrency = value => {
        runInAction( () => {
            if (this.currencies.findIndex(item => item === value) === -1) {
                this.currencies.push(value)
            } else {
                this.currencies = this.currencies.filter(item => item !== value)
            }
        })
    }

    isInLevels = value => {
        return this.levels.findIndex( item => item === value) !== -1
    }

    setInstrumentType = value => {
        runInAction( () => {
            if (this.instrumentTypes.findIndex(item => item === value) === -1) {
                this.instrumentTypes.push(value)
            } else {
                this.instrumentTypes = this.instrumentTypes.filter(item => item !== value)
            }
        })
    }

    isInInstrumentTypes = value => {
        return this.instrumentTypes.findIndex( item => item === value) !== -1
    }


}

export default new FilterStore()