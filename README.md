# Amity GX - Calculator
A browser extension designed for Opera GX, made for helping with algebra.

The extension currently has two sections:
1. [The notes section](#the-notes-section)
2. [The calculator section](#the-calculator-section)

# The notes section
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/1363b01f-820d-4c3e-b6ad-e490e27c5603)

The notes section is a textarea for users to type notes into.
Its only notable qualities are:
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

0. Zero parameters:  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/aac15d9f-9a9c-42ec-8778-34819c83638e)

1. One parameter ([unary](#unary-results)):  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/40feff8a-c2a3-447a-8022-116deb494607)

2. Two parameters ([binary](#binary-results)):  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/55e2310e-a8a3-414f-878e-209d7a4d18e3)

3. Three parameters ([ternary](#ternary-results)):  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/90c6156a-e701-4648-9a86-372d71f23041)

Entering a value into a parameter activates it, and makes the next parameter available. An available but inactive parameter has a grayed-out label and the &empty; (empty set) placeholder.  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/9ead6d1d-1b99-4eba-b289-5e31c54e4cb7)
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/08182698-b310-444e-8f49-d9e727fd321c)
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/6ee65390-af48-48f3-a541-c54e4d55f2a0)


## Run calculations (&fnof;) button
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/dda99129-6153-49cc-a9b4-3a03b6d7621e) _(enabled)_  
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/cd0e91af-ba3c-4fb7-83aa-fc744ff0a62b) _(disabled)_

When there is a change to the parameters, the &fnof; button is enabled. Clicking it will refresh the [results](#results-section).

The &fnof; button is only enabled when the current [parameters](#parameters) are not identical to what they when used to calculate the currently-displayed [results](#results-section).

Calculations can also be run by pressing enter while focusing any of the [parameters](#parameters).

## Results section
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/7d319212-005f-4171-aa1d-be31f1f1fbc4)
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/d1ab1fc0-aada-4239-bf88-f238a98b0491)
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/c45a7d29-beba-48d1-a97d-56a04893961f)

The results section shows the results of each operation for the [parameters](#parameters) simultaneously.

Wherever a [parameter](#parameters) appeares in the results section, it is colored to match that [parameter](#parameters)'s label. Results are shown in bold.  
By default, the colors are as follow:
- A: &#x1F7E5; Red
- B: &#x1F7E6; Blue
- C: &#x1F7E9; Green
- [result]: &#x1F7E7; **Orange**
<!-- todo: change from emojis to the hex squares used in amitygxmod -->

When a [parameter](#parameters) changes, all instances of references to it in the results section are boxed in a gray, dashed outline to show what inputs of the calculation will be affected by the change. If it changes back to what it was when used to calculate the currently-displayed results, the outline disappears.

### Unary results
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/7d319212-005f-4171-aa1d-be31f1f1fbc4)

Unary results disply all operations which can be performed on a single integer.
Currently included are the following operations:
- Quick Insights (name isn't final)
  - Whether the number is **even** or **odd**
  - Whether the number is **prime** or **composite**
- Square $(A^{2})$
- Square root $(\sqrt{A})$ &mdash; Simplifies radical to exact value
- Factors
  | factor | $A$ |
  | :----: | :-: |
  | $1$ | $\large\frac{A}{1} \therefore A$ |
  | ... | ... |
  | $n$ | $\large\frac{A}{n}$ |
  
  $\forall n \in \\{1,...,A\\} : \frac{A}{n} \in \Bbb{Z}^+$

![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/88457982-de86-48f3-89b0-9336d61d6b85)


### Binary results
![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/d1ab1fc0-aada-4239-bf88-f238a98b0491)

Binary results disply all operations which can be performed on a pair of integers.
Currently included are the following operations:
- Comparison $(A \lt=\gt B)$ $((A\lt{B};A=B;A\gt{B}))$
- Sum $(A+B)$
- Difference $(A-B)$
- Product $(AB)$
- Quotient $(\frac{A}{B})$ &mdash; Simplifies fraction to exact value
- Remainder $(A\bmod{B})$
- Power $(A^{B})$
- Log $(\log_{A}B)$ <!-- todo: add image -->
- GCF (Greatest Common Factor)
- LCM (Least Common Multiple)
- Common factors
  | factor | $A$ | $B$ |
  | :----: | :-: | :-: |
  | $1$ | $\large\frac{A}{1} \therefore A$ | $\large\frac{B}{1} \therefore B$ |
  | ... | ... | ... |
  | $n$ | $\large\frac{A}{n}$ | $\large\frac{B}{n}$ |
  
  $\forall n \in \\{1,...,\displaystyle\min_{\\{A,B\\}}\\} : \\{\frac{A}{n}, \frac{B}{n}\\} \subset \Bbb{Z}^+$

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
- Common factors
  | factor | $A$ | $B$ | $C$ |
  | :----: | :-: | :-: | :-: |
  | $1$ | $\large\frac{A}{1} \therefore A$ | $\large\frac{B}{1} \therefore B$ | $\large\frac{C}{1} \therefore C$ |
  | ... | ... | ... | ... |
  | $n$ | $\large\frac{A}{n}$ | $\large\frac{B}{n}$ | $\large\frac{C}{n}$ |
  
  $\forall n \in \\{1,...,\displaystyle\min_{\\{A,B,C\\}}\\} : \\{\frac{A}{n}, \frac{B}{n}, \frac{C}{n}\\} \subset \Bbb{Z}^+$

![image](https://github.com/HenryWilder/amitygxmod-calculator/assets/74995093/c0189dff-2427-4bd4-8ba3-da2b77ebf013)
