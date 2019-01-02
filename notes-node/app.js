let notes = require('./notes.js');
let _ = require('lodash');
let yargs = require('yargs');

let body = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

let title = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

let argv = yargs
    .command('add', 'Add new note!', {
        title,
        body
    })
    .command('remove', 'Remove note!', {
        title
    })
    .command('read', 'Read all notes!')
    .help()
    .argv;
let command = process.argv[2];

if (command === 'add') {
    let response = notes.addNotes(argv.title, argv.body);
    if (response) {
        console.log(`-  -   -   -   -\n Note whit title "${argv.title}" is saved!\n-  -   -   -   -`);
    } else {
        console.log(`-  -   -   -   -\n Note whit title "${argv.title}" is already exist!\n-  -   -   -   -`);
    }
} else if (command === 'remove') {
    let response = notes.removeNote(argv.title);
    if (response) {
        console.log(`-  -   -   -   -\n Note whit title "${argv.title}" is removed!\n-  -   -   -   -`);
    } else {
        console.log(`-  -   -   -   -\n Note whit title "${argv.title}" is not exist!\n-  -   -   -   -`);
    }
} else if (command === 'read') {
    notes.readNotes();
}