# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased](https://github.com/HenryWilder/amitygxmod-calculator/compare/659da2f...HEAD)
Link will be changed to a specific version tag once no longer in pre-release.

## [v0.1-alpha](https://github.com/HenryWilder/amitygxmod-calculator/compare/659da2f...v0.1-alpha) - 2023-11-25
**Note:** It was relatively easy to implement a large chunk of this due to much of the design and math code having already written (in C#) for my [AlgebraBalancer](https://github.com/HenryWilder/AlgebraBalancer) UWP application. This application is slightly more capable than the original however, due to the browser being somewhat easier to work with than UWP in certain ways.
### Added
- SCSS styling
  - Using accent color for borders by default
  - Using foreground color (black in lightmode, white in darkmode) for text by default
- Manifest JSON
- Package JSON
  - Dev dependencies
  - Build script which copies files to dist
- Settings JSON (configures SASS compilation)
- Tasks JSON (task for tsc watch)
- "Goop" Icon (placeholder)
- Panel HTML
- Notetaking area
- A, B, and C number inputs
  - Colorization
    - A: Red
    - B: Blue
    - C: Green
    - Result: Bold and orange
  - Colorization also apply to factor tables
  - Labels turn gray when empty
  - Use "&empty;" for placeholder
  - Changed parameter references in results section have dashed, gray outlines
  - Number of parameter inputs automatically grow/shrink depending on number of filled inputs, and shift left to fill holes
- Calculate ("&fnof;") button for activating calculations
  - Button is disabled when all parameters match the currently visible calculation
  - Width scales to match the combined width of ABC-parameter inputs
- Unary operations
  - Quick insights
    - Even/odd
    - Prime/composite
  - Square
  - Square root
  - Factors table
- Binary operations
  - Comparison (`<=>`)
  - Addition
  - Subtraction
  - Multiplication
  - Division
  - Remainder
  - Power
  - GCF
  - LCM
  - Common factors table
- Ternary operations
  - Quick insights
    - Unit vector/unnormalized vector
    - Pythagorean triple/not
  - Definition of <u>&vscr;</u> as a vector of the parameters
  - Vector length
  - Normalized vector
  - Sum
  - Product
  - GCF
  - LCM
  - Polynomial (A&xscr;&sup2;+B&xscr;+C) (Currently a non-functional placeholder)
  - Common factors table
- Non-decimal (exact value) support \
  (values are simplified instead of evaluated)
  - Fractions (`number`/`number`)
  - Radicals (`number`&Sqrt;`number`)
  - Radical Fractions (`Radical`/`number`)

## [v0.1.1-alpha](https://github.com/HenryWilder/amitygxmod-calculator/compare/v0.1-alpha...v0.1.1-alpha) - 2023-11-27
### Added
- CHANGELOG.md
### Fixed
- GCF always returning 1, which was also causing issues with simplifying fractions
- Always displaying "not composing a Pythagorean Triple" even when parameters did compose a Pythagorean Triple - [`#6`](https://github.com/HenryWilder/amitygxmod-calculator/issues/6)
### Changed
- Switched from v0.0 versioning to more standardized v0.0.0 versioning
