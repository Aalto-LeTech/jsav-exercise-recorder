# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "v": 65,
  "css": "left: 240.883px; top: 0px; transform: translate3d(0px, 0px, 1px);",
  "left": {
    "v": 36,
    "css": "left: 105.75px; top: 47px; transform: translate3d(0px, 0px, 1px);",
    "left": {
      "v": 20,
      "css": "left: 23.5px; top: 94px; transform: translate3d(0px, 0px, 1px);",
      "left": {
        "v": 13,
        "css": "left: 0px; top: 141px; transform: translate3d(0px, 0px, 1px); display: block;"
      },
      "right": {
        "v": 27,
        "css": "left: 47px; top: 141px; transform: translate3d(0px, 0px, 1px);",
        "left": {
          "v": 23,
          "css": "left: 23.5px; top: 188px; transform: translate3d(0px, 0px, 1px);"
        }
      }
    },
    "right": {
      "v": 48,
      "css": "left: 188px; top: 94px; transform: translate3d(0px, 0px, 1px);",
      "left": {
        "v": 47,
        "css": "left: 141px; top: 141px; transform: translate3d(0px, 0px, 1px); display: block;",
        "left": {
          "v": 39,
          "css": "left: 117.5px; top: 188px; display: block;"
        }
      },
      "right": {
        "v": 52,
        "css": "left: 235px; top: 141px; transform: translate3d(0px, 0px, 1px);",
        "right": {
          "v": 55,
          "css": "left: 258.5px; top: 188px; transform: translate3d(0px, 0px, 1px); display: block;"
        }
      }
    }
  },
  "right": {
    "v": 82,
    "css": "left: 376px; top: 47px; transform: translate3d(0px, 0px, 1px);",
    "left": {
      "v": 73,
      "css": "left: 305.5px; top: 94px; transform: translate3d(0px, 0px, 1px);",
      "left": {
        "v": 67,
        "css": "left: 282px; top: 141px; transform: translate3d(0px, 0px, 1px);"
      },
      "right": {
        "v": 74,
        "css": "left: 329px; top: 141px; transform: translate3d(0px, 0px, 1px); display: block;",
        "right": {
          "v": 76,
          "css": "left: 352.5px; top: 188px; transform: translate3d(0px, 0px, 1px);"
        }
      }
    },
    "right": {
      "v": 94,
      "css": "left: 446.5px; top: 94px; transform: translate3d(0px, 0px, 1px);",
      "left": {
        "v": 93,
        "css": "left: 423px; top: 141px; transform: translate3d(0px, 0px, 1px);",
        "left": {
          "v": 87,
          "css": "left: 399.5px; top: 188px; transform: translate3d(0px, 0px, 1px);",
          "right": {
            "v": 92,
            "css": "left: 423px; top: 235px; transform: translate3d(0px, 0px, 1px);"
          }
        }
      }
    }
  }
},
```

Each object is the root node of the graph, and contains at least 3 fields: `v`, which stores the key, `css`, and information about the children: `"cls": ["emptynode"]` or `left` or `right`. `left` and `right` are made up the same manner, so that from the root node the full is tree is stored. Each object in the outmost JSON list is, therefore, the tree at that step.  

The data contains no stack that defines which keys should be removed and in
which order. Therefore, although we can deduce from the intermediate states
that a key has been removed, we cannot be sure whether it was the right one.

RR1 not satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, a child node is removed in each step. If a node is empty with a move needing to occur, then the node has the key `"v": ""`. In the next step, the move happens & a child node is possibly pruned.


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is.

RR2 not satisfied.
