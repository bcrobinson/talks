
# Basics

## interfaces
* structural typing
* optional props
```typescript
interface IHasAge {
    age: number;
}

interface ICat {
    age: number;
    purr(): void;
}

interface ICat {
    age: number;
    WOOF(): void;
}

function makeOlder(animal: IHasAge) {
    animal.age += 1;
}
```

* type aliases
 * sort of like interfaces
 * don't have a name
 * required for advanced types (coditiona/mapped)
* generics
* tuples
 * just types on arrays
 * `as const`
* enums
 * const enums (serialization)

## Automatic typing
* type inference
  * types on return values

* type guards
  * typeof x === "string"
  * x instanceof type
  * custon type guards `function isCat(value: any) value is Cat {}`

* Exhaustiveness checking
* resricting 

## Nullable checking
 * strict null checks
 * compile with `--strictNullChecks`
 * works with type guards

# Fun things

# A
union types
Intersection types
type literals
-> Discriminated Unions



# C
mapped types
* make all nullable
conditional types

