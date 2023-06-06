# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "v": false,
  "css": "left: 47px; top: 0px; transform: translate3d(0px, 0px, 1px);",
  "children": [
    {
      "v": "",
      "cls": ["emptynode"],
      "css": "left: 0px; top: 47px; transform: translate3d(0px, 0px, 1px);"
    },
    {
      "v": "",
      "cls": ["emptynode"],
      "css": "left: 47px; top: 47px; transform: translate3d(0px, 0px, 1px);"
    },
    {
      "v": "",
      "cls": ["emptynode"],
      "css": "left: 94px; top: 47px; transform: translate3d(0px, 0px, 1px);"
    }
  ]
},
```

Each step is a single object containing the tree at that step. The tree is built up from the root node. Each node contains several fields: `v` holds the key; `cls` has the value `"emptynode"` for an empty node, and `greenbg` for nodes with the label true; and a `css` field. Additionally, non-leaf node always contain an array with three fields, which are a, b, and c, respectively.

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Each step, either a new node appears or a node has the key switch to true and gains the `cls: ["greenbg"]`.At each step, we can see the full tree at that point. We do not see the student clicking the `Next` button, so if the same value appears twice in the stack, we do not see that. As such, we can fully reconstruct the learner's trace if the stack has no repeat values, but only partially reconstruct it if there are repeats. 


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is.

RR2 not satisfied.
