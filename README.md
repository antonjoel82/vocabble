# Vocabble

A word game similar to the viral one, but with customizable board sizes and randomized, shareable puzzles.

## Rules

- Guess the mystery word in the specified number of tries (_default is 6_)
- Each guess must be a valid word of the specified length (_default is 5_)
- The color of the tiles will change to show how close your guess was to the word
  - 🟩 Green: the letter is in the word and in the correct position
  - 🟨 Yellow: the letter is in the word but not in the correct position
  - 🔲 Gray: the letter is not in the word

## Awaiting Implementation

- [ ] Create settings page for custom board sizes
- [ ] Move dictionary to data store
  - [ ] consider grooming dictionary for unreasonable words
- [ ] Use theme styling

## Development

Clone the repository

### Getting Started

1. Run `npm i`
1. Run `npm run dev`

### Running Tests

1. Run `npm run test`
