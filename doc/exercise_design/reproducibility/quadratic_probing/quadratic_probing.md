# Order of Growth (easy)

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
[
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
      {"v": ""}
    ],
    "style": "height: 62px; width: 609px;",
    "classes": ["jsavcenter"]
  },
  {
    "t": "number",
    "v": -1,
    "style": "display: none;"
  }
]
```

The first object is an array of two objects. The first object is the hashing table. The second table contains the result of the hash function in the entry `v`.  

Each hashing table spot has the value in `v`. Optionally, it also has a class `"cls": ["jsavarrow"]` to indicate that there is an arrow pointing at it. 

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.


The stack of operations is not stored. Inserts can easily be tracked and we know the exact value of it when it appears in the array. However, for search and delete we do not necessarily know the value. If the value does not appear in the hashing table, or appears in the last possible spot for search, we do not know for sure whether it is a search or delete operation. 

When a value is highlighted, it gets the labelling `"cls": ["jsavarrow"]`.

## End state

The final state is merely a repeat of the last step of the student's solution. There is no indication that any step is correct. Therefore it is not possible to see where the student diverges from the model answer. 

RR2 not satisfied.
