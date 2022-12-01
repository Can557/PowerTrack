var element = document.getElementById('showArray');

// Wird beim Betreten der Seite ausgerufen
window.onload = function () {
    render(element, getFromLocal());
}

function getFromLocal() {
    // Hole den aktuellen Wert aus dem Local Storage
    return JSON.parse(window.localStorage.getItem('myLocalStorageKey'));
}

function render(elem, state) {
    // Gibt den definierten head der Tabelle aus -> Die Tabelle ist noch falsch herum
    let content = `
        <thead>
            <tr id="zf">
                <th></th>
                <th><img src="bilder/counter_light.png">Letzterstand kWh</th>
                <th><img src="bilder/energy-consumption_light.png"> gesamtverbauch(min-max)</th>
                <th></th>
             </tr>
        </thead>
        <tbody>
     `;

    let carry = 0, difference = 0;

    // Für jeden Zähler eintrag in state
    for (var myZaehler of state) {
        // Wenn kein Zähler vorhanden
        if (typeof myZaehler === 'undefined') {
            return
        }
        // Setze den carry der ersten Ausgabe auf die Erfassung der ersten Ausgabe
        if(carry === 0) {
            carry = myZaehler.kWhErfassung;
        } else {
            // Ziehe von der Xten Erfassung den vorliegenden wert (gespeichert im carry) ab und gebe ihn in Form der difference aus
            difference = myZaehler.kWhErfassung - carry;
            carry = myZaehler.kWhErfassung;
        }
        // Gebe HTML aus
        content += `
         <tr>
            <td><img src="bilder/calendar.png">${convert_date(myZaehler.datum)}</td>
            <td><img src="bilder/counter_dark.png">${myZaehler.kWhErfassung} kWh</td>
            <td><img src="bilder/energy-consumption_dark.png">${carry === 0 ? '' : difference} kWh</td>
            <td><img src="bilder/delete.png" onclick="deleteEntry(${myZaehler.id})"></td>
         </tr>`;
    }
    // Schliest den tbody ganz am Ende
    elem.innerHTML = content + "</tbody>";
}

function deleteEntry(index) {
    // Hole den aktuellen status der tabelle aus dem local storage
    var state = getFromLocal();
    // Lösche den ausgewählten Eintrag
    state.splice(index, 1);
    // Verringere den Index im Array aller Einträge die über dem gelöschten Eintrag liegen
    for (var myZaehler of state) {
        if (myZaehler.id > index) {
            myZaehler.id--;
        }
    }
    // Speichere die Änderung in den Local Storage
    window.localStorage.setItem('myLocalStorageKey', JSON.stringify(state));
    // Gebe die änderung auf der Seite aus
    render(element, state);
}


function convert_date(x){
    // weist das Datum einer localen Variable zu
    const date = x;
    //bindestrich wird entfernt
    const [year, month, day] = date.split('-');
    //datum wird in das richtige format gebracht
    const result = [day, month, year].join('.');

    console.log(result);
    return result
}
