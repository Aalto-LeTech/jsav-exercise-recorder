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

Each object is the root node of the graph, and contains at least 3 fields: `v`, which stores the key, `css`, and information about the children: `"cls": ["emptynode"]` or `left` or `right`. `left` and `right` are made up the same manner, so that from the root node the full is tree is stored. Each object in the outmost JSON list is, therefore, the tree at that step.  

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, a new child node appears in each step. 


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is. 

RR2 not satisfied.
