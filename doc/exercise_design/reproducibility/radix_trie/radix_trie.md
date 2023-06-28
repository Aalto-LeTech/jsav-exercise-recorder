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
  "css": "left: 0px; top: 0px; z-index: 110; transform: translate3d(0px, 0px, 1px);"
},
```

Each step is a single object containing the tree at that step. The tree is built
up from the root node. Each node contains several fields: `v` holds the key;  an
optional `"cls": ["emptynode"]` for an empty node; and a `css` field.
Additionally, non-leaf node always contain a `left` and `right` field.

The student inserts keys representing letters A-O into the tree. Each letter
has a 4-digit binary code as follows.

```
A 0001    E 0101    I 1001    M 1101
B 0010    F 0110    J 1010    N 1110
C 0011    G 0111    K 1011    O 1111
D 0100    H 1000    L 1100
```

The JSON data does not include the stack of keys which should be inserted into
the tree. However, each intermediate state represents the state of the entire
tree after an insertion of a key. Therefore, by comparing the adjacent states,
it is possible to reconstruct the input - to the extent which student has
inserted the values into the tree.

RR1 partially satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Each step is an insertion in which we see a new node appear. At each step, we can see the full tree at that point. As such, we can reconstruct the learner's trace.


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state.

The exercise always has ten (10) to be inserted. If the student has inserted
ten keys, we can reconstruct the input by reversing the order in which the keys
were inserted into the tree. As we know the Radix Search Tree algorithm and
the binary code of the keys, in this case, it is possible to reconstruct the
entire model answer. Then it is possible to compare student's solution to the
model solution and see where the solutions diverged.

If the student has inserted less than ten keys, we can reconstruct the model
solution to the extent in which we see the keys. There are two possibilities:
(a) student's solution steps diverge somewhere from the model solution;
(b) student's solution is idential to the model solution that could be
reconstructed.

RR2 partially satisfied.
