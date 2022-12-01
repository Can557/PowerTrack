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
                <th class="small"></th>
                <th class="large"></th>
                <th class="small"><img src="bilder/counter_light.png"></th>
                <th class="large">${state[state.length - 1].kWhErfassung + ' kWh'}</th>
                <th class="small"><img src="bilder/energy-consumption_light.png"></th>
                <th class="large-sec"> 
                    <div>${state[state.length - 1].kWhErfassung - state[0].kWhErfassung + ' kWh'}</div>
                    <div style="font-weight: normal">${convert_date(state[0].datum) + ' - ' + convert_date(state[state.length - 1].datum)}</div>
                </th>
                <th class="small"></th>
             </tr>
        </thead>
        <tbody>
     `;

    let carry = 0, difference = 0, y = 0;

    // Für jeden Zähler eintrag in state
    for (var myZaehler of state.reverse()) {
        // Wenn kein Zähler vorhanden
        if (typeof myZaehler === 'undefined') {
            return
        }
        // Setze den carry der ersten Ausgabe auf die Erfassung der ersten Ausgabe
        if (carry === 0) {
            carry = myZaehler.kWhErfassung;
        } else {
            // Ziehe von der Xten Erfassung den vorliegenden wert (gespeichert im carry) ab und gebe ihn in Form der difference aus
            difference = myZaehler.kWhErfassung - carry;
            carry = myZaehler.kWhErfassung;
        }
        // Gebe HTML aus
        if (myZaehler.id !== 0) {
            content += `
         <tr>
            <td class="small"><img src="bilder/calendar.png"></td>
            <td class="large">${convert_date(myZaehler.datum)}</td>
            <td class="small"><img src="bilder/counter_dark.png"></td>
            <td class="large">${myZaehler.kWhErfassung} kWh</td>
            <td class="small">
               <img src="bilder/energy-consumption_dark.png">       
            </td>
            <td class="large-sec">
                <div>${state[y].kWhErfassung - state[y + 1].kWhErfassung + ' kWh'}</div>
                <div style="font-weight: normal">${convert_date(state[y + 1].datum) + ' - ' + convert_date(state[y].datum)}</div>
            </td>
            <td class="small"><img src="bilder/delete.png" onclick="deleteEntry(${myZaehler.id})"></td>
         </tr>`;
        } else {
            content += `
         <tr>
            <td class="small"><img src="bilder/calendar.png"></td>
            <td class="large">${convert_date(myZaehler.datum)}</td>
            <td class="small"><img src="bilder/counter_dark.png"></td>
            <td class="large">${myZaehler.kWhErfassung} kWh</td>
            <td class="small"></td>
            <td class="large"></td>
            <td class="small"><img src="bilder/delete.png" onclick="deleteEntry(${myZaehler.id})"></td>
         </tr>`;
        }
        y++;
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


function convert_date(x) {
    // weist das Datum einer localen Variable zu
    const date = x;
    //bindestrich wird entfernt
    const [year, month, day] = date.split('-');
    //datum wird in das richtige format gebracht
    const result = [day, month, year].join('.');

    console.log(result);
    return result
}
