# C= (C minus minus): minimal js flavored subset of C that compiles itself.

[![ci](https://github.com/unrenormalizable/cmin/actions/workflows/ci.yml/badge.svg)](https://github.com/unrenormalizable/cmin/actions/workflows/ci.yml) [![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?label=license)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## what?

C= is a minimal subset of C with js flavor that can compile itself.

PS: affectionately known as C min / C minus minus

## why?

to build a compiler that is sufficiently powerful compiles itself.

- bootstrap in js: 
  - start with the minimal grammar
  - compile to text LLVM IR
- using bootstrap to get working C= compiler
- add further features & language enhancements
  - built in smart pointer 
  - built in unit testing
  - multiple source files

## development principles

- clean room implementation
  - **not allowed**: referring to any existing code. 
  - **allowed**: tutorials / discussions on the web that is not code.
- test driven development.

## progress

- bootstrap
- self-dogfood
- enhancements
  - [ ] unit tests
  - [ ] smart pointers

## specs

- refer [.\cmin.ebnf]

## References

- [curated list of awesome resources](https://github.com/aalhour/awesome-compilers)
- [LLVM](https://mukulrathi.com/create-your-own-programming-language/llvm-ir-cpp-api-tutorial/)
- [jack crenshaw: let's build a compiler](https://xmonader.github.io/letsbuildacompiler-pretty/)