# Max Validator

Fast and small validation framework based on schemas, inspired by Laravel.

## Install

You can install `max-validator` using any package manager:

```bash
npm i @shrtns/max-validator
```

## Quick Start

```js
import { validate } from 'https://cdn.skypack.dev/@shrnts/max-validator'

const user = {
    firstname: 'John',
    lastname: 'Doe',
    age: 20,
}

const schema = {
    firstname: 'required|string|min:3',
    lastname: 'required|string|min:3',
    age: 'number',
}

const validation = validate(user, schema)
console.log(validation.passed()) // true
```

You can check out the [docs](https://ubermanu.github.io/max-validator) for more information.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
