# Order of Growth (easy)

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
[
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0;"
      }
    ],
    "e": []
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0; transform: translate3d(0px, 0px, 1px);"
      }
    ],
    "e": [
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            [
              "M",
              21,
              37
            ],
            [
              "L",
              21,
              48
            ]
          ],
          "arrow-end": "classic-wide-long",
          "opacity": 1
        }
      }
    ]
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0;"
      }
    ],
    "e": []
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0; transform: translate3d(0px, 0px, 1px);"
      }
    ],
    "e": [
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            [
              "M",
              21,
              37
            ],
            [
              "L",
              21,
              48
            ]
          ],
          "arrow-end": "classic-wide-long",
          "opacity": 1
        }
      }
    ]
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0;"
      }
    ],
    "e": []
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0;"
      }
    ],
    "e": []
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0;"
      }
    ],
    "e": []
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0;"
      }
    ],
    "e": []
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0;"
      }
    ],
    "e": []
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0; transform: translate3d(0px, 0px, 1px);"
      }
    ],
    "e": [
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            [
              "M",
              21,
              37
            ],
            [
              "L",
              21,
              48
            ]
          ],
          "arrow-end": "classic-wide-long",
          "opacity": 1
        }
      }
    ]
  },
  {
    "n": [
      {
        "v": "",
        "cls": [
          "jsavnonext"
        ],
        "css": "left: 0px; top: 0px; opacity: 0;"
      }
    ],
    "e": []
  },
  {
    "t": "number",
    "v": -1,
    "style": "display: none;"
  }
]
```

The first 11 objects are the entries into the array. The last object keeps track of the result of the calculation `k mod 11`. 

Each object that represents an array spot has two arrays in it. Array `n` holds the values of the entries in the hashing array at that point. Array `e` holds style information. For some unknown reason, two entries have style information at the start. 

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

The stack of operations is also not stored, making it hard to determine what each operation is. Whilst highlighting of each step in a search is done, it is not possible to see what the exact value of the search is in the case that all the nodes are highlighted of a linked list: either the final item is the one wanted, or the one wanted is not in the list. 

When a value is highlighted, it gets the labelling `"cls": ["jsavhighlight"]`. Otherwise the value is an empty array. 

## End state

The final state is merely a repeat of the last step of the student's solution. There is no indication that any step is correct.

RR2 not satisfied.
