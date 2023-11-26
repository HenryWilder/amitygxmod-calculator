# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.1] - 2023-11-25
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
- Colorization of parameters
  - A: Red
  - B: Blue
  - C: Green
  - Result: Bold and orange
- Parameter colorization also apply to factor tables
- Parameter labels turn gray when empty
- Parameter inputs use "&empty;" for placeholder
- Calculate ("&fnof;") button
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

## [0.1.1] - 2023-11-26
### Added
- CHANGELOG.md
### Fixed
- Patched GCF always returning 1, which was also causing issues with simplifying fractions
### Changed
- Switched from 0.0 versioning to more standardized 0.0.0 versioning
