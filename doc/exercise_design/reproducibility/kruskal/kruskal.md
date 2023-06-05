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
      "css": "position: absolute; left: 57px; top: 75px;"
    },
    {
      "v": "B",
      "css": "position: absolute; left: 184px; top: 70px;"
    },
    {
      "v": "C",
      "css": "position: absolute; left: 309px; top: 65px;"
    },
    {
      "v": "D",
      "css": "position: absolute; left: 429px; top: 61px;"
    },
    {
      "v": "E",
      "css": "position: absolute; left: 64px; top: 193px;"
    },
    {
      "v": "F",
      "css": "position: absolute; left: 191px; top: 200px;"
    },
    {
      "v": "G",
      "css": "position: absolute; left: 307px; top: 190px;"
    },
    {
      "v": "H",
      "css": "position: absolute; left: 434px; top: 197px;"
    },
    {
      "v": "I",
      "css": "position: absolute; left: 72px; top: 340px;"
    },
    {
      "v": "J",
      "css": "position: absolute; left: 191px; top: 332px;"
    },
    {
      "v": "K",
      "css": "position: absolute; left: 311px; top: 323px;"
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
            ["M", 104, 98],
            ["L", 185, 95]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "5",
        "w": 5
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
            ["M", 231, 93],
            ["L", 310, 90]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "9",
        "w": 9
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
            ["M", 209, 117],
            ["L", 214, 201]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "6",
        "w": 6
      }
    ],
    [
      2,
      6,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 333, 113],
            ["L", 331, 191]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "8",
        "w": 8
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
            ["M", 349, 106],
            ["L", 442, 204]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "3",
        "w": 3
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
            ["M", 454, 108],
            ["L", 457, 198]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "6",
        "w": 6
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
            ["M", 111, 218],
            ["L", 192, 223]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "4",
        "w": 4
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
            ["M", 89, 240],
            ["L", 95, 341]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "3",
        "w": 3
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
            ["M", 104, 235],
            ["L", 199, 338]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "8",
        "w": 8
      }
    ],
    [
      5,
      9,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 215, 248],
            ["L", 215, 333]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "1",
        "w": 1
      }
    ],
    [
      6,
      7,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            [ "M", 354,  215],
            ["L", 435, 220]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "2",
        "w": 2
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
            ["M", 332, 237],
            ["L", 334, 324]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "1",
        "w": 1
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
            ["M", 119, 362],
            ["L", 192, 358]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "1",
        "w": 1
      }
    ],
    [
      9,
      10,
      {
        "a": {
          "fill": "none",
          "stroke": "#000",
          "path": [
            ["M", 238, 354],
            ["L", 312, 349]
          ],
          "width": 500,
          "height": 400,
          "opacity": 1
        },
        "l": "6",
        "w": 6
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
