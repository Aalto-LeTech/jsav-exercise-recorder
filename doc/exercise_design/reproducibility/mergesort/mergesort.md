# Mergesort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
[{
  "ind": [
    {"v": 17},{"v": 20},{"v": 91},{"v": 20},{"v": 75},{"v": 57},{"v": 56
    },{"v": 32},{"v": 64},{"v": 18}
  ],
  "style": "height: 30px; display: none;",
  "classes": [
    "jsavcenter",
    "jsavautoresize"
  ]
},{
  "ind": [
    {"v": 5},{"v": 5},{"v": 4},{"v": 4},{"v": 4},{"v": 5},{"v": 5},{"v": 4},{"v": 4},{"v": 4}],
  "style": "height: 30px; display: none;",
  "classes": ["jsavcenter","jsavautoresize"]
}]
```

There are two arrays: the first array is the keys to be sorted. The second array is the depth that the keys are at. Each array has the entries with the key `v`. 

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, the contents of the array are included in the JSON every time the array
is changed.

## End state

```json
[{
  "ind": [
    {"v": 17},{"v": 20},{"v": 91},{"v": 20},{"v": 75},{"v": 57},{"v": 56},{"v": 32},{"v": 64},{"v": 18}
  ],
  "style": "height: 30px; display: none;",
  "classes": ["jsavcenter","jsavautoresize"]
},{
  "ind": [
    {"v": 4},{"v": 4},{"v": 3},{"v": 4},{"v": 4},{"v": 5},{"v": 5},{"v": 4},{"v": 4},{"v": 4}
  ],
  "style": "height: 30px; display: none;",
  "classes": ["jsavcenter","jsavautoresize"]
}]
```

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. This is clearly visible in `mergesort_2.json`, where in the last merge-steps the two arrays are concatenated rather than merged: 

```json
[
  {
    "ind": [
      {"v": 14}, {"v": 16}, {"v": 23}, {"v": 66}, {"v": 71}, {"v": 4}, {"v": 16}, {"v": 46}, {"v": 49}, {"v": 78}
    ],
    "style": "height: 30px; display: none;",
    "classes": ["jsavcenter", "jsavautoresize"]
  },
  {
    "ind": [
      {"v": 1}, {"v": 1}, {"v": 1}, {"v": 1}, {"v": 1}, {"v": 1}, {"v": 1}, {"v": 1}, {"v": 1}, {"v": 1}
    ],
    "style": "height: 30px; display: none;",
    "classes": ["jsavcenter", "jsavautoresize"]
  }
]
```

Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is. 

RR2 not satisfied.
