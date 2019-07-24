/*
 * Basics
 */

interface Cat {
    name: string;
    purr(): void;
}

interface Dog {
    name: string;
    woof(): void;
    age: number;
}

// Intersection types
module IntersectionTypes {

    function sayHello(pet: Cat | Dog) {
        console.log(`hello ${pet.name}`);

        pet.purr()
        // Error:
        // Property 'purr' does not exist on type 'Cat | Dog'.
        //  Property 'purr' does not exist on type 'Dog'
    }
}

// Union Types
module UnionTypes {

    function sayHello(pet: Cat & Dog) {
        console.log(`hello ${pet.name}`);

        pet.purr() // OK
        pet.woof() // OK
    }
}

// Enums
module Enums {
    enum Size {
        Small,
        Big,
        Large,
    }


    function makeSquare(size: Size) { }
    makeSquare(Size.Big)
    makeSquare(Size.Small)

    // Output JavaScript
    module Output {
        var Size;
        (function (Size) {
            Size[Size["Small"] = 0] = "Small";
            Size[Size["Big"] = 1] = "Big";
            Size[Size["Large"] = 2] = "Large";
        })(Size || (Size = {}));
    }
}

module ConstEnums {
    enum Size {
        Small = "small",
        Big = "sig",
        Large = "sarge",
    }


    function makeSquare(size: Size) { }
    makeSquare(Size.Big)
    makeSquare(Size.Small)

    // Output JavaScript
    module Output {
        var Size;
        (function (Size) {
            Size["Small"] = "small";
            Size["Big"] = "sig";
            Size["Large"] = "sarge";
        })(Size || (Size = {}));
    }
}

// Type literals
module TypeLiterals {
    let size: "big" | "small" = "super-large"
    // Error: Type '"super-large"' is not assignable to type '"big" | "small"'

    function makeSquare(size: "big" | "small") {
        if (size === "tiny") {
            // ERROR: This condition will always return 'false' since the types '"big" | "small"' and '"tiny"' have no overlap.
            return { height: 1, width: 1 };
        }
    }

    const dogKeys: keyof Dog = "name";
    // const dogKeys: "name" | "woof"

    function getKeys<T>(item: T): (keyof T)[] {
        return Object.keys(item) as (keyof T)[];
    }

    const k1 = getKeys({ name: "ben", age: 21 });
    // const k1: ("name" | "age")[]
}

// Tuples
module Tuples {
    function getTuple(): [string, number, { name: string }] {
        return ["big", 1, { name: "spots" }];
    }

    let tuple = getTuple();
    // let tuple: [string, number, { name: string; }]

    tuple[0].substring(1, 2);
    tuple[1].toExponential(2);
    tuple[2].name;
    tuple[3] // Error: Tuple type '[string, number, { name: string; }]' of length '3' has no element at index '3'.

    let [size, num, pet] = getTuple();
    size.substring(1, 2);
    num.toExponential(2);
    pet.name;

    function tupleShortHand() {
        return ["big", 1] as const;
    }

    const shortHand = tupleShortHand();
    // const shortHand: readonly ["big", 1]
}

module ConditionalTypes {

    // Built In
    type Fn = (...args: any) => any;
    type Parameters<T extends Fn> = T extends (...args: infer P) => any ? P : never;
    type ReturnType<T extends Fn> = T extends (...args: any) => infer R ? R : any;

    function f1<T extends Fn>(fn: T, ...parameters: Parameters<T>) { }
    function f2<T extends Fn>(fn: T, parameters: Parameters<T>) { }
    function f3<T extends Fn>(fn: T, returnVal: ReturnType<T>) { }

    const callback = (a: number, b: string) => a + b.toString();
    // const callback: (a: number, b: string) => string
    const callback2 = (d: Date) => d.getTime();
    // const callback2: (a: Date) => number

    f1(callback, 42, "abc");
    f2(callback, [42, "abc"]);
    f3(callback, "xyz");

    f1(callback, "abc", 42); // Error: Argument of type '"abc"' is not assignable to parameter of type 'number'
    f2(callback, ["abc", 42]); // Error: Type 'string' is not assignable to type 'number'
    f3(callback, 92); // Error: Argument of type '92' is not assignable to parameter of type 'string'

    type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"

    type Record<K extends keyof any, T> = {
        [P in K]: T;
    };

}

module MappedTypes {
    type SimpledMappedType2 = {
        [k in "a" | "b" | "c" ]: string
    }

    let c: SimpledMappedType2

    type SimpledMappedType<K extends string> = {
        [k in K]: string
    }

    let a: SimpledMappedType<"x" | "y" | "z">;
    // let a: {
    //     x: string,
    //     y: string,
    //     z: string,
    // }

    type Mapped<T> = {
        [K in keyof T]: T[K]
    }

    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };

    let onlyName: Pick<Dog, "name" | "age">
    // let onlyName: {
    //     name: string,
    //     age: number,
    // }


    type FieldsOfType<T, U> = {
        [P in keyof T]: T[P] extends U ? P : never;
    }[keyof T]

    let numberFields : FieldsOfType<Dog, number>
    // let numberFields : "age"

    let numberAndStringFields : FieldsOfType<Dog, number | string>
    // let numberAndStringFields : "name" | "age"
    

    type StringFields<T> = {
        [P in keyof T]: T[P] extends string ? string : never;
    };

    function returnOnlyStringFields<T>(item: T): StringFields<T, keyof T> {
        return {} as any;
    }

    let onlyStringFields = returnOnlyStringFields({ a: "abc", b: 42, c: "def" });
    onlyStringFields.b
    // let onlyStringFields: {
    //     a: string,
    //     c: string,
    // }

    type Intersect<T, U> = {
        [P in Extract<keyof T, keyof U>]: (T[P] | U[P]);
    };

    interface ABC { a: string, b: string, c: number }
    interface BCD { b: string, c: string, d: number }

    let intersect: Intersect<ABC, BCD>;
    // let intersect: {
    //     b: string,
    //     c: string | number
    // }
}

// Mapped Types
function get<T, K extends keyof T>(item: T, property: K): T[K] {
    return item[property];
}

const person = {
    name: "ben",
    age: 21, // (still) ;)
}

const myName = get(person, "name");
// const myName: string

const myAge = get(person, "age");
// const myAge: number

const myCity = get(person, "city");
// ERROR: Argument of type '"city"' is not assignable to parameter of type '"name" | "age"'

module Things {
    let a: Required
    function max<T, K extends keyof T>()
}