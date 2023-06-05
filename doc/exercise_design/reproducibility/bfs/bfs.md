# Insertion sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "n": [
    {
      "v": "A",
      "cls": ["marked"],
      "css": "position: absolute; left: 64px; top: 51px;"
    },
    {
      "v": "B",
      "css": "position: absolute; left: 179px; top: 54px;"
    },
    {
      "v": "C",
      "css": "position: absolute; left: 318px; top: 41px;"
    },
    {
      "v": "D",
      "css": "position: absolute; left: 432px; top: 40px;"
    },
    {
      "v": "E",
      "css": "position: absolute; left: 55px; top: 145px;"
    },
    {
      "v": "F",
      "css": "position: absolute; left: 197px; top: 150px;"
    },
    {
      "v": "G",
      "css": "position: absolute; left: 307px; top: 142px;"
    },
    {
      "v": "H",
      "css": "position: absolute; left: 431px; top: 144px;"
    },
    {
      "v": "I",
      "css": "position: absolute; left: 57px; top: 251px;"
    },
    {
      "v": "J",
      "css": "position: absolute; left: 186px; top: 248px;"
    },
    {
      "v": "K",
      "css": "position: absolute; left: 315px; top: 251px;"
    },
    {
      "v": "L",
      "css": "position: absolute; left: 431px; top: 251px;"
    },
    {
      "v": "M",
      "css": "position: absolute; left: 67px; top: 340px;"
    },
    {
      "v": "N",
      "css": "position: absolute; left: 197px; top: 358px;"
    }
  ],
  "e": [
    [
      0,
      1,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 111, 76],
            ["L", 180, 77]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      0,
      4,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 86, 98],
            ["L", 81, 146]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      0,
      5,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 107, 89],
            ["L", 202, 160]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      1,
      2,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 226, 76],
            ["L", 319, 67]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      1,
      5,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 207, 101],
            ["L", 217, 151]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      2,
      5,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 324, 81],
            ["L", 239, 158]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      3,
      6,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 438, 79],
            ["L", 349, 151]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      4,
      5,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 102, 170],
            ["L", 198, 173]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      4,
      8,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 79, 193],
            ["L", 81, 252]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      5,
      8,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 202, 188],
            ["L", 100, 261]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      6,
      9,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 313, 182],
            ["L", 228, 256]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      7,
      10,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 438, 184],
            ["L", 356, 259]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      7,
      11,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 455, 192],
            ["L", 455, 252]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      10,
      11,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 363, 275],
            ["L", 432, 275]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      10,
      13,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 321, 291],
            ["L", 239, 366]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      12,
      13,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 114, 367],
            ["L", 198, 379]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ]
  ]
}
```

Each object contains two values: `n` and `e`. `n` is an array that contains the nodes in the graph, and `e` is an array that contains the edges. Each object in `n`s array has the node label stored in `v`, and the position in `css`. As such, it is possible to reproduce the node layout exactly as it was for the student. When a node is marked, it gains the tag `"cls": ["marked"]`. 

The edges in `e` are stored as arrays. Each array is formatted as `[source index, destination index, object]`, where the object contains more information, including the weight of the edge in `w` and as the label in `l`. When an edge is marked, it gains the tag `"cls": ["marked"]` in the object. 

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, list of nodes and edges is included every step. By keeping track of what edge gains the `"cls": ["marked"]` in every step, we can track the learner's steps. 


## End state

The end state is recorded. There is no indication of correctness, the end state is merely a repeat of the last state. Whilst it is possible to retrace the student steps, it is not possible to determine where the student diverges from the model answer nor to see what the exact model answer is. 

RR2 not satisfied.
