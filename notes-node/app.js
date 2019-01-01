let notes = require('./notes.js');
let _ = require('lodash');
let yargs = require('yargs');
let argv = yargs.argv;
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