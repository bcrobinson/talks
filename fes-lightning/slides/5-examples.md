<section data-markdown>
<textarea data-template>

```typescript
function lens<T, K extends keyof T>(property: K) : (item: T) => T[K] {
    return (item) => item[property];
}


function makeSquare(size: "big" | "small") {
    if(size === "big") {
        return { height: 100, width: 100 };
    }
    else if(size === "tiny") { // Error "tin
        return { height: 1, width: 1 };
    }
}

```
 
</textarea>
</section>
