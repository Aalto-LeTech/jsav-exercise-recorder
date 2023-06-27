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
      {"v": 13},
      {"v": 13},
      {"v": 13},
      {"v": 13},
      {"v": 14},
      {"v": 15},
      {"v": 16},
      {"v": 18},
      {"v": 22},
      {"v": 27},
      {"v": 35},
      {"v": 46},
      {"v": 60},
      {"v": 75},
      {"v": 90},
      {"v": 104},
      {"v": 115},
      {"v": 123},
      {"v": 128},
      {"v": 132},
      {"v": 134},
      {"v": 135},
      {"v": 136},
      {"v": 137},
      {"v": 137},
      {"v": 137}
    ],
    "style": "width: 703px;",
    "classes": ["jsavcenter"]
  },
  {
    "t": "number",
    "v": 0,
    "style": "display: none;"
  },
  {
    "t": "number",
    "v": 25,
    "style": "display: none;"
  },
  {
    "t": "number",
    "v": -1337,
    "style": "display: none;"
  }
],
```

The array contains four objects: The first object contains the sorted array on which the interpolation search is conducted. The second and third object contain the low and high index respectively. The fourth object contains the returned index.

The JSON data does not contain the key that should be found. Therefore it is
impossible to determine whether the student found the correct key eventually.

RR1 not satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

As the learner searches across the array, the value of the low and high pointer shifts. When the student returns an index, the fourth object gets its value changed.


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is.

RR2 not satisfied.
