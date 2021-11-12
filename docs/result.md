# Validation

The validation result object contains many properties:

```js
result.failed() // Boolean
result.error(prop) // Boolean
result.message(prop) // String
```

## Error

Check if a field has an error

```js
result.error('name')
```

Check if a field has an error for a specific rule

```js
result.error('name', 'required')
```

## Error message

Get first error message for a field

```js
result.message('name')
```

Get all the error messages for a field (joined with comma)

```js
result.message('name', true)
```
