# Insertion sort

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
    {"v": ""}
  ],
  "style": "height: 60px; width: 601px;",
  "classes": ["jsavcenter"]
},
```

The array contains twenty objects, each containing the value in `v`.  As values
get revealed, they get the class `"cls": ["jsavhighlight]`.

The JSON data does not contain the key that should be found. Therefore it is
impossible to determine whether the student found the correct key eventually.

RR1 not satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

As the learner searches across the array, the new values get revealed. Additionally, the object at that index gets the class `jsavhighlight`.


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is. Since the full array of values is not included, it is impossible to infer the correct solution when the learner makes a mistake.

RR2 not satisfied.
