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

The first object in the array is the hashing table. The second object contains the value of `(k+i) mod 19` in `v`. 

Each hashing table spot has the value in `v`. Optionally, it also has a class `"cls": ["jsavarrow"]` to indicate that there is an arrow pointing at it. 

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

The stack of operations is  not stored, making it hard to determine what each operation is. Whilst highlighting of each step in a collision is done, it is not possible to see what the exact value of collision is if it is because of a search or delete operation: either the final item is the one wanted, or the one wanted is not in the list. 

When a value is highlighted, it gets the labelling `"cls": ["jsavarrow"]`. Otherwise the value is an empty array. 

## End state

The final state is merely a repeat of the last step of the student's solution. There is no indication that any step is correct.

RR2 not satisfied.
