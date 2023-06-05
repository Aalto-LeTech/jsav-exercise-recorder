# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
[false,false,false,false,false,false,false,false,false],
```

The representation is an array of whether the nodes have been selected or not. As such, the initial array is 10 times `false`, as no node has been selected yet. 
The nodes are represented in a level-order way in the array, however, it is not possible to know the values of the tree. As such, it is not possible to have an unambiguous start state. 

RR1 not satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

The array has one value swap from `false` to `true` when a learner selects a node. However, since the values of the tree are never stored, it is not possible to know whether what the student did is corerct or not.  

## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. 

RR2 not satisfied.
