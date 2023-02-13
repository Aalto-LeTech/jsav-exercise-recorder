# Order of Growth (easy)

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json

  "ind": [{
    "v": "2n!"
  }, {
    "v": "101",
    "css": "transition: all 300ms linear 0s;"
  }, {
    "v": "n<sup>2</sup>"
  }, {
    "v": "<strong>lg</strong>(n)"
  }, {
    "v": "21n"
  }, {
    "v": "5<sup>n+1</sup>"
  }],
  "style": "width: 46px;",
  "classes": ["jsavsortablearray", "jsavcenter"]
}
```

Essentially the entries with the key `v` contain the sortable elements, with
values showing the text (representing a mathematical), coded as HTML.

- Logarithm as `<strong>lg</strong>`
- Power as `<sup>`

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, the contents of the array are included in the JSON every time the array
is changed.

## End state

```json
{
  "ind": [{
    "v": "1337",
    "cls": ["correct"],
    "css": "transition: all 300ms linear 0s;"
  }, {
    "v": "7n"
  }, {
    "v": "(n+1)!"
  }, {
    "v": "<strong>lg</strong>(n)"
  }, {
    "v": "5<sup>n+1</sup>",
    "cls": ["correct"],
    "css": "transition: all 300ms linear 0s;"
  }, {
    "v": "2n<sup>2</sup>"
  }],
  "style": "width: 46px;",
  "classes": ["jsavsortablearray", "jsavcenter"]
}
```

The end state is recorded. Notice that the correct choices are marked with
`"cls": ["correct"]`.

RR2 satisfied.
