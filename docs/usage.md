# Usage

The validator takes into account 2 parameters: a `schema` definition and an `object`:

```js
import Validator from '@shrnts/max-validator'

const v = new Validator(schema)
const result = v.validate(object)
```

On a side note, a common validator is available, if you don't need anything specific.

```js
import { validate } from '@shrnts/max-validator'

const result = validate(object, schema)
```

## Schema

A schema is a JS object that defines the validator's rules.

Each property of the schema is an expected field on the tested object.

For example:

```js
const registerRequestScheme = {
  name: 'required|string|min:2|max:50',
  lastname: 'required|string|min:2|max:50',
  gender: 'required|in_array:male,female',
  accept_policy: 'checked',
}
```
```js
const formData = {
    name: 'Malkhazi',
    lastname: 'Dartsmeldize',
    email: 'malkhazidartsmelidze@gmail.com',
    gender: 'male',
    accept_policy: 'true',
    address: 'Tbilisi, Georgia',
}

const result = v.validate(formData, registerRequestScheme);
```

For more information about this, see the [schema](schema.md) section.

## Result

The `result` variable contains a validation object with possible errors:

```js
result.failed() // Boolean
```

For more information about this, see the [result](result.md) section.
