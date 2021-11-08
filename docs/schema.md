# Schema

A schema is a set of rules for the tested object fields.

The rules can be defined in 3 different ways:

## String

```js
const schema = {
    firstname: 'required|min:3'
}
```

## Array

```js
const schema = {
    firstname: [
        'required',
        'min:3'
    ]
}
```

## Function

```js
const schema = {
    firstname: (value) => {
        if (value.length < 3) {
            return 'Firstname must be at least 3 characters long'
        }
        return true
    }
}
```
