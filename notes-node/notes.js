let fs = require('fs');

let fetchNote = () => {
    try {
        let noteString = fs.readFileSync('note.json');
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
}

let saveNote = (notes) => {
    fs.writeFile('note.json', JSON.stringify(notes), e => {
        if (e) {
            console.log(e);
        }
    });
}

let addNotes = (title, body) => {
    let notes = fetchNote();
    let note = {
        title,
        body
    };

    let dublicateNote = notes.filter((note) => note.title === title);
    if (dublicateNote.length === 0 && title && body) {
        notes.push(note);
        saveNote(notes);
        return true;
    }

};

let removeNote = (title) => {
    let notes = fetchNote();
    let newNotes = notes.filter(note => note.title !== title);
    if (newNotes.length !== notes.length) {
        saveNote(newNotes);
        return true;
    }
}
let readNotes = () => {
    let notes = fetchNote();
    let output = '-   -    -   ALL NOTES   -   -   -\n';
    notes.forEach((note, i) => {
        output += `------- ${i + 1}:  ${note.title}: ${note.body} --------\n`;
    });
    if (notes.length === 0) {
        output += '   Empty list!\n';
    }
    output += '-  -   -   -   -    -    -   -   -';
    console.log(output);
}
module.exports = {
    addNotes,
    removeNote,
    readNotes
};