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

## Extend New Data Source:

- Non-node data sources can be added via api fetches from the `redux/features/model/globalDataSubsets` slice.
    - New data sources will need Resources and Transformers in the `globalDataSubsets/thunks` file to match the `GlobalDataSubset` type used by the slice.
    - Any data sources will work with this project so long as they have an identifier of type `string`

## Patterns to Pay Attention To:

### Import Order:

1. External dependencies (react and @xyflow highest priority)
2. Type imports
3. Internal modules, organized in the following order:
    - ./types
    - @/interfaces
    - @/enums
    - @/models
    - @/api
    - @/redux
    - @/hooks
    - @/utilities
    - @/functions
    - @/components
    - @/styles
    - @/tests

### File Organization:

- Module-first architecture

### Linting:

- Modern ruleset influenced by the Airbnb Style Guide

### Dev Patterns:

- React hooks
- Modern ECMAScript features
- Testing-ready setup with specific patterns for test files
- Factory/Resource patterns

## Takeaways:

- With more time (I'm up to the the 4 day mark) I'd:
    - **Assassinate** these heinously _unreasonable_ long variable/function names. Needed them explicit to build fast, dying to refactor them. I hope you at least get a chuckle out of them!
    - Add tests (integration + property based testing)
    - Flush out Type Guards
