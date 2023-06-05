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
      "css": "position: absolute; left: 67px; top: 42px;"
    },
    {
      "v": "B",
      "css": "position: absolute; left: 185px; top: 57px;"
    },
    {
      "v": "C",
      "css": "position: absolute; left: 321px; top: 44px;"
    },
    {
      "v": "D",
      "css": "position: absolute; left: 439px; top: 59px;"
    },
    {
      "v": "E",
      "css": "position: absolute; left: 64px; top: 154px;"
    },
    {
      "v": "F",
      "css": "position: absolute; left: 194px; top: 142px;"
    },
    {
      "v": "G",
      "css": "position: absolute; left: 319px; top: 153px;"
    },
    {
      "v": "H",
      "css": "position: absolute; left: 437px; top: 147px;"
    },
    {
      "v": "I",
      "css": "position: absolute; left: 53px; top: 250px;"
    },
    {
      "v": "J",
      "css": "position: absolute; left: 185px; top: 255px;"
    },
    {
      "v": "K",
      "css": "position: absolute; left: 302px; top: 260px;"
    },
    {
      "v": "L",
      "css": "position: absolute; left: 429px; top: 252px;"
    },
    {
      "v": "M",
      "css": "position: absolute; left: 57px; top: 353px;"
    },
    {
      "v": "N",
      "css": "position: absolute; left: 193px; top: 353px;"
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
            ["M", 114, 69],
            ["L", 186, 78]
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
            ["M", 90, 89],
            ["L", 89, 155]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      1,
      4,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 191, 96],
            ["L", 106, 163]
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
            ["M", 211, 104],
            ["L", 216, 143]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      2,
      3,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 368, 71],
            ["L", 440, 80]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      2,
      7,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 363, 84],
            ["L", 443, 155]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      3,
      7,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 462, 106],
            ["L", 462, 148]
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
            ["M", 111, 176],
            ["L", 195, 168]
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
            ["M", 85, 201],
            ["L", 80, 251]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      4,
      9,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 106, 193],
            ["L", 191, 264]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      6,
      10,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 339, 200],
            ["L", 330, 261]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      8,
      9,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 100, 275],
            ["L", 186, 278]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      8,
      12,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 78, 297],
            ["L", 80, 354]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        }
      }
    ],
    [
      8,
      13,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 96, 288],
            ["L", 198, 363]
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
            ["M", 349, 283],
            ["L", 430, 277]
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
            ["M", 105, 377],
            ["L", 194, 377]
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
