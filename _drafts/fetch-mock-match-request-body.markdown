Fillt his out later.

```
fetchMock.post((url, { body }) => {
  return (
    url.indexOf(`${API_ROOT}/api/thing`) !== -1 &&
    isEqual(JSON.parse(body).thing, 'foo')
  )
}, { theResponse: true })
```
