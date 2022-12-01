class MyZaehlerStandClass {

    constructor(datum, kWhErfassung, kWhVerbrauch, id) {
        this.datum = datum;
        this.kWhErfassung = kWhErfassung;
        this.kWhVerbrauch = kWhVerbrauch;
        this.id = id;
    }
}

let printSpeicher = ''
var myZaehlerStandArray = [];

function addData(record_datum, record_kWhErfassung){
    let id = 0;


    if (window.localStorage.getItem('myLocalStorageKey')) {
        this.myZaehlerStandArray = JSON.parse(window.localStorage.getItem('myLocalStorageKey'));
        id = this.myZaehlerStandArray.length;
    }



    this.myZaehlerStandArray.push(new MyZaehlerStandClass(record_datum, record_kWhErfassung, 'test', id));
    window.localStorage.setItem('myLocalStorageKey', JSON.stringify(this.myZaehlerStandArray));
    console.log(this.myZaehlerStandArray);
}
