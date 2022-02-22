const fs = require("fs");
const definitions = require("./raw.json");
const fullDict = require("../1/dictionary-by-length.json");

const metadata = {
  numWords: 0,
  byLetter: {},
};

const shouldWordBeIgnored = (word) => {
  const invalidWordRegex = new RegExp(/[^a-z]/, "gi");
  return invalidWordRegex.test(word) || word.length < 2;
};

/** Returns a definition if valid; otherwise undefined */
const getValidatedDefinition = (definition) => {
  if (!definition) {
    return;
  }

  // don't allow definitions that just refer to other spellings
  const invalidDefinitionRegex = new RegExp(/^See .*/, "gmi");
  return invalidDefinitionRegex.test(definition) ? undefined : definition;
};

const writeDictionaryFile = (fileName, jsonObj) => {
  fs.writeFile(`./${fileName}.json`, JSON.stringify(jsonObj), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
    console.log(`Writing ${fileName} dictionary`);
  });

  for (const [len, words] of Object.entries(jsonObj)) {
    console.log(`Writing file for length ${len}`);

    fs.writeFile(`./${fileName}-${len}.json`, JSON.stringify(words), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
};

const resultsByLength = {};
const resultsByLengthWithDefinition = {};

// build the superset dictionary with and without definitions
for (const lenBasedArray of Object.values(fullDict)) {
  for (const word of lenBasedArray) {
    const len = word.length;
    if (shouldWordBeIgnored(word)) {
      // skip words meeting a certain pattern
      continue;
    }

    if (!resultsByLength[len]) {
      resultsByLength[len] = {};
    }

    resultsByLength[len][word] = {
      definition: getValidatedDefinition(definitions[word]),
    };
  }
}

// build dictionary only of words with definitions
for (const [word, definition] of Object.entries(definitions)) {
  const len = word.length;
  if (shouldWordBeIgnored(word)) {
    // skip words meeting a certain pattern
    continue;
  }

  if (!resultsByLengthWithDefinition[len]) {
    resultsByLengthWithDefinition[len] = {};
  }

  resultsByLengthWithDefinition[len][word] = definition;
}

// Write the files
writeDictionaryFile("by-len-full", resultsByLength);
writeDictionaryFile("by-len-full-with-defs", resultsByLengthWithDefinition);

console.log("Finished!");
