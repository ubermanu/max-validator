# Result

The validation result object contains many properties:

```js
result.hasError // Boolean
result.errors // Map
result.isError(prop) // Boolean
result.getError(prop) // String
```

## Error

Check if a field has an error

```js
result.isError('name')
```

Check if a field has an error for a specific rule

```js
result.isError('name', 'required')
```

## Error message

Get first error message for a field

```js
result.getError('name')
```

Get all the error messages for a field (joined with comma)

```js
result.getError('name', true)
```
