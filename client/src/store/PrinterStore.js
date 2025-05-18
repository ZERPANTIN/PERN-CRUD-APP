import {makeAutoObservable} from "mobx";

export default class PrinterStore {
    constructor() {
        this._print_technologys = []
        this._brands = []
        this._printers = []
        this._selectedPrint_Technology = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setPrint_Technologys(print_technologys) {
        this._print_technologys = print_technologys
    }
    setBrands(brands) {
        this._brands = brands
    }
    setPrinters(printers) {
        this._printers = printers
    }

    setSelectedPrint_Technology(print_technology) {
        this.setPage(1)
        this._selectedPrint_Technology = print_technology
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get print_technologys() {
        return this._print_technologys
    }
    get brands() {
        return this._brands
    }
    get printers() {
        return this._printers
    }
    get selectedPrint_Technology() {
        return this._selectedPrint_Technology
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
