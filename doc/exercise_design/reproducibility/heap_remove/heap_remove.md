# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "ind": [
    {"v": 11},
    {"v": 13},
    {"v": 42},
    {"v": 35},
    {"v": 20},
    {"v": 57},
    {"v": 68},
    {
      "v": 62,
      "css": "opacity: 1;"
    },
    {
      "v": 81,
      "css": "opacity: 1;"
    },
    {
      "v": 42,
      "css": "opacity: 1;"
    }
  ],
  "style": "height: 60px; width: 301px;",
  "classes": ["jsavcenter"]
},
```

It is an array representation of the heap, with the array containing 10 objects that contain the stored values. The last three objects have an css tag with the opacity of those. These three are the ones that will be removed in the trace and thus turned to opacity 0 to hide them. The number of opacity tags is equal to the amount of times that the student has clicked the `Decrement heapsize` button. 

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, the contents of the array are included in the JSON every time the array is changed. The values that are considered removed have `"css": "opacity: 0;`, so when the value switches from 1 to 0, we know that the learner has clicked the `decrement heapsize` button. A swap step can be seen as it will first list a step by adding a `cls = ["jsavhighlight"]` to the first-clicked object. Then in the next step, the values are swapped. 

## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is. 

RR2 not satisfied.
