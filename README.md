#### Autor: Lukáš Janík, luky.janik@gmail.com
# Zadanie: Webová aplikácia, ktorá nie je nepodobná Trellu

Úlohou je vytvoriť webovú aplikáciu, v ktorej bude možné vytvárať tabule so zoznamami položiek.

**Board (tabuľa)**

Združuje zozamy položiek.

- má unikátne id
- má svoj názov (nemusí byť unikátny)
- obsahuje pole zoznamov (môže byť prázdne)

**List (zoznam)**

Združuje položky.

- má unikátne id
- má svoj názov (nemusí byť unikátny)
- patrí práve do jedného boardu
- obsahuje pole položiek

**item (položka)**

Patrí do zoznamu.

- má unikátne id
- má svoj názov (nemusí byť unikátny)
- patrí práve do jedného zoznamu

## Požiadavky

S pomocou ľubovoľného reaktívneho frameworku treba vytvoriť javascriptovú aplikáciu pozostávajúcu z dvoch stránok:
- zoznam boardov
- detail boardu

Na stránke so zoznamom boardov si viem vytvoriť nový prázdny board, pričom zadávam iba jeho názov.
Na stránke s detailom boardu vidím v stĺpcoch usporiadané zoznamy položiek, viem si tam vytvoriť nový zoznam
a viem si vytvoriť novú položku do hociktorého zoznamu.

Nie je potrebné riešiť editáciu a ani mazanie položiek.
Nepotrebujeme ani detailný pohľad na položku alebo zoznam.

Dáta sú ukladané na backende (kľudne vo forme json súboru). Prikladáme ukážkový json (súbor `data/data.json`),
ak vám nevyhovuje, jeho štruktúru môžete zmeniť.

Backend a komunikáciu frontendu s backendom je možné riešiť ľubovoľnou technológiou.

Netreba riešiť žiadne prihlasovanie (predpokladáme, že db patrí jednému používateľovi a nikto iný k nej nemá prístup).

Štýlovanie dizajnu môže byť pomocou ľubovoľného frameworku, paradigmy a/alebo aj vlastného riešenia.

## Použité technológie:
- **FE**: Angular 9, Typescript, Material Design, Redux (NgRx Store)
- **BE**: Express.js (Node.js), JavaScript
- **Docker**

## Postup pre spustenie aplikácie:
- stiahnutie repozitára (git clone, prípadne ako .zip)
- spustenie pomocou dockera v root adresári repozitára:
    - ```docker-compose up```
    - **FE** je dostupný na ```localhost:8080```
    - **BE** je dostupný na ```localhost:3000```
- otvorením http://localhost:8080/boards v browseri sa zobrazí úvodná obrazovka s vytvorenými boardami



