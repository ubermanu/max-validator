# Customize

The following examples uses an instance of the validator called `v`

```js
const v = new Validator()
```

## Rule

You can extend the validator by adding your own rules.

If the method returns an object, it will be considered as an error.

```js
v.extend(rule_name, method, error_message)
```

The following example implement a PG13 check for movies:

```js
v.extend(
    'pg13',
    (value, ...params) => (value >= 13 || { value }),
    ':name must be higher than 13, :value given'
)
```


## Message

You can update the default error message

```js
v.setDefaultMessage('There is an error there...');
```
