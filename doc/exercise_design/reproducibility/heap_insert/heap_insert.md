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
    {"v": ""}
  ],
  "style": "height: 60px; width: 301px;",
  "classes": ["jsavcenter"]
},
```

It is an array representation of the heap, with the array containing 10 objects
that contain the stored values.

The stack of input values is not included in the recording. However, we know
that the user can either:
 (a) pop a value from the stack and insert it into an empty location in the
     heap array; or
 (b) swap two existing values in the heap array.

In addition, the size of the heap array is always 10, and there is always 10
values to be inserted.

By comparing the intermediate states, we can detect when a new value was
inserted into the heap array. The order of the input stack is reverse to
the order in which the values were inserted into the heap array. Therefore, we
can reconstruct to the input to the extent it was inserted into the heap.

RR1 partially satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, the contents of the array are included in the JSON every time the array is
changed. The values that are inserted into the heap appear in the first empty
array index, and then get sorted by swapping them around. A swap step can be
seen as it will first list a step by adding a `cls = ["highlight"]` to the
first-clicked object. Then in the next step, the values are swapped.

As already mentioned, the user can either insert a new value or perform a
swap with two existing values. It is possible to reconstruct both swaps and
inserts.

## End state

The end state is recorded. There is no indication of correctness, the end state
is merely a repeat of the last state. Whilst it is possible to retrace the
student steps, it is not possible to determine where the student diverges from
the model answer nor to see what the exact model answer is. In other words,
because RR1 is only partially satisfied, RR2 is not satisfied.

RR2 not satisfied.
