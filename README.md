# Amity GX - Calculator
A browser extension designed for Opera GX, made for helping with algebra.

The extension currently has two sections:
1. [The notes section](#the-notes-section)
2. [The calculator section](#the-calculator-section)

# The notes section
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/88530bd4-71e2-4cc8-8b13-e71af0bda4e9)

The notes section is a textarea for users to type notes into.
Its only meaningful qualities, at the time of writing, are:
- Being vertically resizeable.
- Horizontally scaling to fit the width of the entire panel.
- Using a monospace font so that text can be aligned across multiple lines through the use of whitespace characters like space.

# The calculator section
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/5d7d7d58-89bb-4ecf-821f-b7b164473c22)

The calculator section is used for quickly performing all operations on a combination of numbers simultaneously, giving the user insights about how the numbers may relate to each other.

The calculator section is made up of three elements:
1. [Parameters](#parameters)
2. [Run calculations (&fnof;) button](#run-calculations-ƒ-button)
3. [Results section](#results-section)

## Parameters
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/86a2b560-184f-49b1-b050-18d457bd1330)

The parameters are a set of up to three numeric inputs. The number of parameters available is dependent on how many are filled in, or active.
The number of active parameters also determines what operations are available in the [Results section](#results-section).

Zero parameters:  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/aac15d9f-9a9c-42ec-8778-34819c83638e)

One parameter ([unary](#unary-results)):  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/40feff8a-c2a3-447a-8022-116deb494607)

Two parameters ([binary](#binary-results)):  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/55e2310e-a8a3-414f-878e-209d7a4d18e3)

Three parameters ([ternary](#ternary-results)):  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/90c6156a-e701-4648-9a86-372d71f23041)

Entering a value into a parameter activates it, and makes the next parameter available. An available but inactive parameter has a grayed-out label and the &empty; (empty set) placeholder.  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/9ead6d1d-1b99-4eba-b289-5e31c54e4cb7)
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/08182698-b310-444e-8f49-d9e727fd321c)
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/6ee65390-af48-48f3-a541-c54e4d55f2a0)


## Run calculations (&fnof;) button
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/dda99129-6153-49cc-a9b4-3a03b6d7621e) _(enabled)_  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/cd0e91af-ba3c-4fb7-83aa-fc744ff0a62b) _(disabled)_

<!-- todo: explain when the button is disabled -->

## Results section
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/7d319212-005f-4171-aa1d-be31f1f1fbc4)
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/d1ab1fc0-aada-4239-bf88-f238a98b0491)
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/c45a7d29-beba-48d1-a97d-56a04893961f)

The results section shows the results of each operation for the [parameters](#parameters) simultaneously.
<!-- todo: explain colors -->
<!-- todo: explain dashed outlines -->

### Unary results
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/7d319212-005f-4171-aa1d-be31f1f1fbc4)

Unary results disply all operations which can be performed on a single integer.
Currently included are the following operations:
- Quick Insights (name isn't final)
  - Whether the number is **even** or **odd**
  - Whether the number is **prime** or **composite**
- Square $(A^{2})$
- Square root $(\sqrt{A})$ &mdash; Simplifies radical to exact value
- Factors (set of positive integers that multiply to make $A$)

![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/88457982-de86-48f3-89b0-9336d61d6b85)


### Binary results
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/d1ab1fc0-aada-4239-bf88-f238a98b0491)

Binary results disply all operations which can be performed on a pair of integers.
Currently included are the following operations:
- Comparison $(A \lt=\gt B)$ ($(A\lt{B};A=B;A\gt{B})$)
- Sum $(A+B)$
- Difference $(A-B)$
- Product $(AB)$
- Quotient $(\frac{A}{B})$ &mdash; Simplifies fraction to exact value
- Remainder $(A\bmod{B})$
- Power $(A^{B})$
- GCF (Greatest Common Factor)
- LCM (Least Common Multiple)
- Common factors (the set of positive integers that multiply by the $A$ column (second; red) to make $A$, and the $B$ column (third; blue) to make $B$)

![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/a14b1912-8246-4442-a7ec-ff99ad83ae5b)


### Ternary results
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/c45a7d29-beba-48d1-a97d-56a04893961f)

Ternary results disply all operations which can be performed on a triplet of integers.
Currently included are the following operations:
- Quick Insights (name isn't final)
  - Whether the parameters are **normalized** or not
  - Whether the parameters **compose a Pythagorean Triple** $(A^{2}+B^{2}=C^{2})$ or not
- Vector definition $(\underline{v}=(A,B,C))$
- Vector length $(|\underline{v}|)$ $((\sqrt{A^{2}+B^{2}+C^{2}}))$
- Vector normal $(\underline{\hat v})$ $((\frac{\underline{v}}{|\underline{v}|}))$ $(((\frac{(A,B,C)}{\sqrt{A^{2}+B^{2}+C^{2}}})))$
- Sum $(A+B+C)$
- Product $(ABC)$
- GCF (Greatest Common Factor)
- LCM (Least Common Multiple)
- Quadratic formula $(\frac{-B\pm\sqrt{B^{2}-4AC}}{2A})$ &mdash; **not yet implemented**
- Common factors (the set of positive integers that multiply by the $A$ column (second; red) to make $A$, the $B$ column (third; blue) to make $B$, and the $C$ column (fourth; green) to make $C$)

![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/c0189dff-2427-4bd4-8ba3-da2b77ebf013)
