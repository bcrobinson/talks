<!-- Condition Types 1 -->
<section data-markdown>
<textarea data-template>

# Conditional Types

</textarea>
</section>

<!-- Condition Types 1 -->
<section data-markdown>
<textarea data-template>

### Conditional Types

Allows you to create an expression that evaluates a type at compile time

```typescript
type IsString<T> = T extends string ? "yes" : "no"

function isString<T>(value: T):  IsString<T>;

let a = isString("abc");
// let a: "yes"

let b = isString(123);
// let a: "no"
```

</textarea>
</section>

<!-- Condition Types 2 -->
<section data-markdown>
<textarea data-template>

### Built in types

TypeScript comes with a bunch of built in helper types

```typescript
type Fn = (...args: any) => any;

// Get the paramters of a function
type Parameters<T extends Fn> = 
    T extends (...args: infer P) => any ? P : never;

// Get the return type of a function
type ReturnType<T extends Fn> = 
    T extends (...args: any) => infer R ? R : any;
```

</textarea>
</section>

<!-- Condition Types 3 -->
<section data-markdown>
<textarea data-template>

### Built in types

```typescript
// Requires you to pass the correct types
function f1<T extends Fn>(fn: T, ...parameters: Parameters<T>);
// Requires you pass value with the same type as return value
function f2<T extends Fn>(fn: T, returnVal: ReturnType<T>);

const callback1 = (a: number, b: string) => a + b.toString();
// const callback2: (a: number, b: string) => string
const callback2 = (d: Date) => d.getTime();
// const callback2: (a: Date) => number

f1(callback1, 42, "abc");
f1(callback2, new Date());
f1(callback1, "abc", 42);
// Error: Argument of type '"abc"' is not assignable to parameter 
// of type 'number'

f2(callback, "xyz");
f2(callback, 92);
// Error: Argument of type '92' is not assignable to parameter
// of type 'string'
```

</textarea>
</section>
