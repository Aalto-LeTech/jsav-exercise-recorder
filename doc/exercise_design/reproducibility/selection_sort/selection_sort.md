# Selection sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "ind": [
    {"v": 23, "cls": ["jsavhighlight"]},
    {"v": 109},
    {"v": 80},
    {"v": 32},
    {"v": 80},
    {"v": 105},
    {"v": 83},
    {"v": 107},
    {"v": 17},
    {"v": 21}
  ],
  "style": "width: 471px;",
  "classes": ["jsavcenter", "jsavautoresize"]
},
```

There is one object with the array. Each array entry has the values under key `v`. Additionally, the array entry can have a class as well, with key `cls`. This is either `"jsavhighlight"` for the current swap indice, or `"bggreen"` if it is highlighted as green to indicate that it has finished swapping.  

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
  "ind": [
    {"v": 17, "cls": ["greenbg"]},
    {"v": 21, "cls": ["greenbg"]},
    {"v": 23, "cls": ["greenbg"]},
    {"v": 32, "cls": ["greenbg"]},
    {"v": 105, "cls": ["greenbg"]},
    {"v": 80, "cls": ["jsavhighlight"]},
    {"v": 83},
    {"v": 107},
    {"v": 80},
    {"v": 109}
  ],
  "style": "width: 471px;",
  "classes": ["jsavcenter", "jsavautoresize"]
}
```

The final state is recorded. There is no indication of correctness, the final state is the last step of the student. It is not even a repeat of the previous state, i.e. the penultimate state is the student's penultimate step. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is. 

RR2 not satisfied.
