# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "v": "",
  "cls": ["emptynode"],
  "css": "left: 0px; top: 0px; transform: translate3d(0px, 0px, 1px);"
},
```

Each step is a single object containing the tree at that step. The tree is built up from the root node. Each node contains several fields: `v` holds the key, `"cls": ["emptynode"]` if the key is empty, a `css` field. Additionally, non-leaf node always contain a `left` and `right` field.

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

As the learner inserts new nodes into the tree, they appear in the traces. As such, we can reconstruct the learner's trace. 


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is.

RR2 not satisfied.
