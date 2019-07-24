<!-- Mapped Types 1 -->
<section data-markdown>
<textarea data-template>

# Mapped Types

Where the crazyness really starts

</textarea>
</section>

<!-- Mapped Types 2 -->
<section data-markdown>
<textarea data-template>

### Mapped Types

Allows you to dynamically create new types

```typescript
type SimpledMappedType = {
    [K in "a" | "b" | "c" ]: string
}

let a: SimpledMappedType;
// let a: {
//     a: string,
//     b: string,
//     c: string,
// }
```

</textarea>
</section>

<!-- Mapped Types 3 -->
<section data-markdown>
<textarea data-template>

### Pick Type

Create a new type that only certain keys

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

function pickKeys<T, K extends string>(item :T, keys: K): Pick<T, K>

let onlyNameAndAge = pickKeys(dog, "name" | "age");
// let onlyName: {
//     name: string,
//     age: number,
// }
```

</textarea>
</section>

<!-- Mapped Types 4 -->
<section data-markdown>
<textarea data-template>

### Fields of Types

A type that only allows keys of a certain type

```typescript
type FieldsOfType<T, U> = {
    [P in keyof T]: T[P] extends U ? P : never;
}[keyof T]

let numberFields : FieldsOfType<Dog, number>
// let numberFields : "age"

let numberAndStringFields : FieldsOfType<Dog, number | string>
// let numberAndStringFields : "name" | "age"
```

</textarea>
</section>

<!-- Mapped Types 5 -->
<section data-markdown>
<textarea data-template>

### A better max function

```typescript
function max<T>(items: T[], getNum: (item: T) => number): number;
function max<T>(items: T[], field: FieldsOfType<T, number>): number;
function max<T>(items: T[], fieldOrFn) {
    let m = 0;
    if(typeof fieldOrFn === "string") {
        items.forEach(item => i = Math.max(m, item[fieldOrFn]));
    }
    else {
        items.forEach(item => i = Math.max(m, item(fieldOrFn));
    }
    return m;
}

let dogs: Dog[];
let maxAge1 = max(dogs, "age"); // OK
let maxAge2 = max(dogs, "name"); // Error
let maxAge3 = max(dogs, d => d.age); // OK
```

</textarea>
</section>

<!-- Mapped Types 5 -->
<section data-markdown>
<textarea data-template>

### Dynamically proxy functions

This will create a new type that will add a "listen" member to every function on an object

```typescript
type Listenable<Args> = { listen(cb: (...args: Args) => void): void }
type MakeListenable<T> = {
    [K in keyof T]: T[K] extends ((...args: infer Args) => void) ? 
            T[K] & Listenable<Args>:
            T[K];
}

function makeListenable<T>(item: T): MakeListenable<T>;

let d = makeListenable(dog);
// d : {
//     age: number;
//     woof: {
//        (): void;
//        listen(callBack: () => void): Function
//     }
// }
```

</textarea>
</section>


<!-- Mapped Types 5 -->
<section data-markdown>
<textarea data-template>

### Turn everything into a Cat or Dog

Because why not

```typescript
type CatOrDog<T, A extends "yes" | "no"> = {
    [P in keyof T]: A extends "yes" ?
        Dog :
        Cat;
}

function areYouADogPerson<T, A extends "yes" | "no">
    (item: T, answer: A): CatOrDog<T, A>;

let a = areYouADogPerson<T>({ x: "abc", y: 123 }, "yes");
// let a : {
//     x: Dog,
//     y: Dog
// }

a.x.woof() // Ok
a.x.purr() // Error
```

</textarea>
</section>
