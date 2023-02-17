# Recurrence relations

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "ind": [{
      "v": "T(1) = 1,<br>T(N) = T(N/2) + 1",
      "css": "transition: all 300ms linear 0s;"
    },{
      "v": "T(1) = 1,<br>T(N) = T(N-1) + 2N",
      "css": "transition: all 300ms linear 0s;"
    },{
      "v": "T(1) = 1,<br>T(N) = 2T(N/2) + N",
      "css": "transition: all 300ms linear 0s;"
    },{
      "v": "T(1) = 1,<br>T(N) = T(N/2) + 2N",
      "css": "transition: all 300ms linear 0s;"
    }],
  "style": "width: 46px;",
  "classes": ["jsavsortablearray","jsavcenter"]
}
```

Essentially the entries with the key `v` contain the sortable elements, with
values showing the text (representing a recurrence relation), coded as HTML.

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
      "v": "T(1) = 1,<br>T(N) = T(N/2) + 1",
      "cls": ["correct"],
      "css": "transition: all 300ms linear 0s;"
    },{
      "v": "T(1) = 1,<br>T(N) = T(N/2) + 2N",
      "cls": ["correct"],
      "css": "transition: all 300ms linear 0s;"
    },{
      "v": "T(1) = 1,<br>T(N) = 2T(N/2) + N",
      "cls": ["correct"],
      "css": "transition: all 300ms linear 0s;"
    },{
      "v": "T(1) = 1,<br>T(N) = T(N-1) + 2N",
      "cls": ["correct"],
      "css": "transition: all 300ms linear 0s;"
    }],
  "style": "width: 46px;",
  "classes": ["jsavsortablearray","jsavcenter"]
}
```

The end state is recorded. Notice that the correct choices are marked with
`"cls": ["correct"]`.

RR2 satisfied.
