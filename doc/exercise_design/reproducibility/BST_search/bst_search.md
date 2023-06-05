# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "v": "?",
  "cls": ["emptynode"],
  "css": "left: 0px; top: 0px; transform: translate3d(0px, 0px, 1px);"
},
```

Each object is the root node of the graph, and contains at least 3 fields: `v`, which stores the key (or a question mark if an unknown 'emptynode'), `css`,  a `cls` that is either `["emptynode"]` or `["jsavhighlight"]`. Additionally, it can have `left` or `right`. `left` and `right` are made up the same manner, so that from the root node the full is tree is stored. Each object in the outmost JSON list is, therefore, the tree at that step.  

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

As the learner searches down the tree, each new revealed node is included in the next step. 


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is. Additionally, if the learner makes a mistake, it is impossible to know all the values that would have been in the tree, and ergo it is impossible to create the right answer based on the tree itself. 

RR2 not satisfied.
