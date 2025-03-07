# 3c4652

## Prerequisites

- Node.js (16+ recommended)
- npm

## Getting Started (macOS, Linux, or using WSL on Windows)

### Virtual Server:

#### Clone Repo:

1. `git clone https://github.com/mosaic-avantos/frontendchallengeserver.git`

#### Run Server:

1. `cd frontendchallengeserver`
2. `npm start`

### Frontend:

#### Clone Repo:

1. `git clone https://github.com/blackirishmec/3c4652.git`

#### Run Frontend:

1. `cd 3c4652`
2. `npm install`
3. `npm run dev`
    - Open your browser to the `Local:` url outputted by VITE in your terminal

## Notes:

### Takeaways:

- With more time (I'm at the 4 day mark) I'd:
    - Assassinate these heinously long variable/function names. Needed them explicit to build fast, dying to refactor them.
    - Add tests (integration + property based testing)
    - Flush out Type Guards

### Patterns to Pay Attention To:

- Any data sources will work with this project so long as they have an identifier of type `string`
- Transformers/resources would be created for said data types to sanitize them as they come in from the server
