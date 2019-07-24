<!-- Header -->
<section data-markdown>
<textarea data-template>

# Typescript Basics

</textarea>
</section>

<!-- Typing 1 -->
<section data-markdown>
<textarea data-template>

### Adding Types

```typescript
let age: number = 2;

function addOne(num: number) {
    return num + 1;
}
```

</textarea>
</section>

<!-- Type inference -->
<section data-markdown>
<textarea data-template>
### Type inference

Can infer types without explicit markup

```typescript
let geeting = "hello";
// let geeting: string;

function stringify(value) {
    if(typeof value === "string") {
        return value
    }
    else if(typeof value === "number") {
        return value.toFixed(2)
    }
    else {
        return JSON.stringify(value)
    }
}
// function stringify(value: any): string
```

</textarea>
</section>

<!-- Get out of jail -->
<section data-markdown>
<textarea data-template>
### `any` - The get out of jail free card

If your stuck and just want it to work, just cast to any

`any` will tell the TypeScript compiler to stop checking that value

```typescript
function magic(value: any): any {
    /* ... */
}

let result = (ohNoes as any).doMagic()
```

</textarea>
</section>

<!-- interfaces 1 -->
<section data-markdown>
<textarea data-template>

### Interfaces
Used to define what objects look like

```typescript
interface Cat {
    age: number;
    purr(): void;
}

interface Dog {
    age: number;
    woof(): void;
}

interface Robot {
    readonly serialNumber: number;
    maker?: string;
    beep(): void;
}
```

</textarea>
</section>

<!-- interfaces 2 -->
<section data-markdown>
<textarea data-template>

### Interfaces

Creating values

```typescript
let dog: Dog = { 
    age: 4, 
    woof: () => console.log("bark") 
};

let cat: Cat = { 
    age: 7, 
    purr: () => { /* ignore */ } 
};

function doWork(robot: Robot): void;

doWork({ 
    serialNumber: 3142, 
    beep: () => console.log("boop")
});
```

</textarea>
</section>

<!-- interfaces 3 -->
<section data-markdown>
<textarea data-template>

### Interfaces

Uses structural typing

"If it walks like a duck, quacks and looks like a duck then it's a duck"

```typescript
function makeOlder(animal: { age: number }) {
    // I only care that it's an object with an "age" property
    animal.age += 1;
}

makeOlder(dog) // OK
makeOlder(cat) // OK 
makeOlder(robot) 
// Error
// Argument of type 'Robot' is not assignable to 
//    parameter of type '{ age: number; }'.
// Property 'age' is missing in type 'Robot' but 
//    required in type '{ age: number; }'
```

</textarea>
</section>

<!-- Type aliases -->
<section data-markdown>
<textarea data-template>

### Type aliases

```typescript
type AnotherString = string

// Union Types
type StringOrNumber = string | number

function doSomething(value: string | number);

doSomething(123) // OK
doSomething("abc") // OK
```

</textarea>
</section>

<!-- Type aliases 2 -->
<section data-markdown>
<textarea data-template>

### Type aliases - Literal Types

Allows you create types for *exact values*

```typescript
type yes = "yes";
type yesOrNo = "yes" | "no";

function makeSquare(size: "big" | "small") {
    if (size === "tiny") {
        // ERROR: This condition will always return 'false'
        //  since the types '"big" | "small"' and '"tiny"'
        // have no overlap.
        return { height: 1, width: 1 };
    }
}
```

</textarea>
</section>

<!-- Generics -->
<section data-markdown>
<textarea data-template>

### Generics
Allows you to write resusable code that works accross multiple types


```typescript
// Instead of having multiple functions
function mapDogs(items: Dog[], mapper: (item: Dog) => any): void;
function mapCats(items: Cat[], mapper: (item: Cat) => any): void;

// Have a single function where the type is decided at compile time
function map<T, U>(items: T[], mapper: (item: T) => U): U[];

let numbers: number[] = [1,2,3]
let strings: string[] = map([1,2,3], i => "num " + i);
```
</textarea>
</section>
