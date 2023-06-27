# Order of Growth (easy)

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "ind": [
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""},
    {"v": ""}
  ],
  "style": "height: 62px; width: 705px;",
  "classes": ["jsavcenter"]
}
```

The first object is the new hashing table.

Each hashing table spot has the value in `v`. Optionally, it also has a class `"cls": ["jsavarrow"]` to indicate that there is an arrow pointing at it.

The old hashing table containing five values is not included. Unlike with
the Double hashing exercise, there is no deterministic way to deduce whether
the student read the old hashing table in the correct order.

RR1 not satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.


The stack of operations and the original hashing table are not stored. However, since the only type of action performed is "insert", we can retrace what happens. We do not see the exact value being inserted, but we can infer it from whatever value gets added to the new hashing table.

When a value is highlighted, it gets the labelling `"cls": ["jsavarrow"]`.

## End state

The final state is merely a repeat of the last step of the student's solution. There is no indication that any step is correct. Therefore it is not possible to see where the student diverges from the model answer.

RR2 not satisfied.
