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

As the learner inserts new nodes into the tree, they appear in the states.
When the learner performs a tree rotation, the state of the tree is recorded
again. Therefore, we can reconstruct both inserts and rotations, and thus,
the entire trace.

## End state

Based on the detected inserts, the model solution can be reconstructed.

RR2 satisfied.
