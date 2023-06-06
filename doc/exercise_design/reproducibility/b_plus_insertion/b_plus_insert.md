# Recurrence relations

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "v": ["", "", ""],
  "cls": ["jsavarraytreenode"],
  "css": "left: 0px; top: 0px; transform: translate3d(0px, 0px, 1px);"
}
```

The key `v` contains the tree node with an array of size 3. 

The input is not explicitly recorded. The input can be reconstructed from student's
steps, because the student can only insert new keys into the tree one by one. If a
node is split, the split and key insertion are recorded in the same step. A
systematic reconstruction of steps should be possible, because the split
functionality is deterministic and defined in the exercise code.

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, the contents of the arraynodes are included in the JSON every time the arraynode
is changed.

## End state

```json
{
  "v": [52, "", ""],
  "cls": ["jsavarraytreenode"],
  "css": "left: 69.5px; top: 0px; display: block;",
  "children": [
    {
      "v": [44, 47, ""],
      "cls": ["jsavarraytreenode"],
      "css": "left: 0px; top: 54px; transform: translate3d(0px, 0px, 1px);"
    },
    {
      "v": [52, 98, ""],
      "cls": ["jsavarraytreenode"],
      "css": "top: 54px; left: 139px; transform: translate3d(0px, 0px, 1px); display: block;"
    }
  ]
}
```

The end state is recorded. 

RR2 satisfied.
