// Imports:
const https = require('https');
const fs = require("fs")
// List of words to get definition of:
var words = ["hello", "hi", "super"];
// Output file
var file = "./def.txt";
// Iterators
let i = 0;
let b = 0;

// Clear output file:
fs.writeFileSync(file, "");

// Dictionary API url:
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Get's the definition of every word in the "words" array
while (i < words.length) {
	b = 0;
	GetWord(words[i]);
	i++
}

// Top level function:
function GetWord(Word) {
	// HTTPS object containing th eAPI request 
	const request = https.request(url + Word, (response) => {
		// Initialize the variable "data"
		let data = '';
		response.on('data', (chunk) => {
			data = data + chunk.toString();
		});

		response.on('end', () => {
			//convert API response into JSON
			const body = JSON.parse(data);
			//Ammount of definitions returned
			var length = Object.keys(body[0].meanings).length;
			//itterate through returned definitions
			while (b < length) {
				let WordC = b + 1;
				//print out word, part of speech, and definition
				console.log(WordC.toString() + ".) " + Word + " (" + body[0].meanings[b].partOfSpeech + ") " + body[0].meanings[b].definitions[0].definition.toString() + "\n");
				//write definitions and other data to output file
				fs.appendFileSync(file, WordC.toString() + ".) " + Word + " (" + body[0].meanings[b].partOfSpeech + ") " + body[0].meanings[b].definitions[0].definition.toString() + "\n");

				b++;
			}
			// Reset itterator
			b = 0;
			fs.appendFileSync(file, "\n");
		});
	})
	// If there is one, print error
	request.on('error', (error) => {
		console.log('An error', error);
	});
	// End request
	request.end();


}
