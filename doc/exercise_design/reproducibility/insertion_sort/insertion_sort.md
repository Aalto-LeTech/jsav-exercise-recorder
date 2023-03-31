# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
[
    {
      "ind": [
        {"v": 79}, {"v": 99}, {"v": 13}, {"v": 19}, {"v": 10}, {"v": 47}, {"v": 39}, {"v": 65}, {"v": 51}, {"v": 39}
      ],
      "style": "width: 471px;",
      "classes": [
        "jsavcenter",
        "jsavautoresize"
      ]
    },
    {
      "ind": [{"v": 24}],
      "style": "height: 47px; width: 48px;",
      "classes": ["jsavcenter", "jsavautoresize"]
    }
  ],
```

There are two object: the first object is the array to be sorted. The second object is the temporary variable for the swapping. Each object has the entries with the key `v`. 

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, the contents of the array are included in the JSON every time the array
is changed.

## End state

```json
[
  {
    "ind": [
      {"v": 79}, {"v": 13}, {"v": 99}, {"v": 19}, {"v": 10}, {"v": 47}, {"v": 39}, {"v": 65}, {"v": 51}, {"v": 39}
    ],
    "style": "width: 471px;",
    "classes": ["jsavcenter", "jsavautoresize"]
  },
  {
    "ind": [
      {"v": 13}
    ],
    "style": "height: 47px; width: 48px;",
    "classes": ["jsavcenter", "jsavautoresize"]
  }
]
```

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is. 

RR2 not satisfied.
