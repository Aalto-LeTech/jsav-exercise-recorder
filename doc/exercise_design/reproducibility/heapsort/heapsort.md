# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "ind": [
    {"v": 95},
    {"v": 79},
    {"v": 60},
    {"v": 56},
    {"v": 75},
    {"v": 17},
    {"v": 31},
    {"v": 29},
    {"v": 34},
    {"v": 59}
  ],
  "style": "height: 60px; width: 301px;",
  "classes": ["jsavcenter"]
}
```

It is an array representation of the heap, with the array containing 10 objects that contain the stored values.

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, the contents of the array are included in the JSON every time the array is changed. The values that are inserted into the heap appear in the first empty array index, and then get sorted by swapping them around. A swap step can be seen as it will first list a step by adding a `cls = ["enlarge"]` to the first-clicked object. Then in the next step, the values are swapped.

When the heap-size is decremented by the click of the button, this can be seen in the data by the entry gaining a `cls = ["unused"]`. This happens to the last itemof the array that does not yet have the `cls = ["unused"]` tag.

## End state

Because RR1 is satisfied, it is possible to reconstruct the correct solution:
we know that the exercise requires the student to perform three adjacent
remove operations with Min-Heapify. Therefore, it is possible to determine
where the student diverges from the model answer.

RR2 satisfied.
