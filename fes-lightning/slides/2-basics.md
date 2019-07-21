<!-- Header -->
<section data-markdown>
<textarea data-template>

# Typescript Basics

</textarea>
</section>

<!-- interfaces -->
<section data-markdown>
<textarea data-template>

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

interface IDog {
    age: number;
    WOOF(): void;
}
```

```typescript
function makeOlder(animal: IHasAge) {
    animal.age += 1;
}
```

</textarea>
</section>

<!-- Type aliases -->
<section data-markdown>
<textarea data-template>

## Type aliases

* sort of like interfaces
* don't have a name
* required for advanced types (coditiona/mapped)
* generics
* tuples
 * just types on arrays
 * `as const`
* enums
 * const enums (serialization)

</textarea>
</section>


<!-- Generics -->
<section data-markdown>
<textarea data-template>

## Generics

### TODO
* tuples
 * just types on arrays
 * `as const`
* enums
 * const enums (serialization)

</textarea>
</section>


<!-- Tuples -->
<section data-markdown>
<textarea data-template>

## Tuples
### TODO

* just types on arrays
* `as const`
* enums
 * const enums (serialization)

</textarea>
</section>


<!-- Enums -->
<section data-markdown>
<textarea data-template>

## Enums
### TODO

* enums
* const enums (serialization)

</textarea>
</section>