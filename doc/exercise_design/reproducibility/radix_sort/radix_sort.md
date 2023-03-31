# Selection sort

## Initial state

Reproducibility Requirement 1 (RR1):
The input must be included in the recording, or a unique, unambiguous
input can be deduced from the steps in the recording.

This is the first object in the outermost JSON list. Example:

```json
{
  "ind": [
    {"v": "<span class=\"bit coloredbit\">1</span><span class=\"bit\">0</span><span class=\"bit\">1</span>"},
    {"v": "<span class=\"bit coloredbit\">1</span><span class=\"bit\">0</span><span class=\"bit\">1</span>"},
    {"v": "<span class=\"bit coloredbit\">0</span><span class=\"bit\">0</span><span class=\"bit\">1</span>"},
    {"v": "<span class=\"bit coloredbit\">0</span><span class=\"bit\">0</span><span class=\"bit\">0</span>"},
    {"v": "<span class=\"bit coloredbit\">1</span><span class=\"bit\">0</span><span class=\"bit\">1</span>"},
    {"v": "<span class=\"bit coloredbit\">0</span><span class=\"bit\">1</span><span class=\"bit\">0</span>"},
    {"v": "<span class=\"bit coloredbit\">1</span><span class=\"bit\">1</span><span class=\"bit\">1</span>"},
    {"v": "<span class=\"bit coloredbit\">0</span><span class=\"bit\">0</span><span class=\"bit\">0</span>"},
    {"v": "<span class=\"bit coloredbit\">0</span><span class=\"bit\">0</span><span class=\"bit\">1</span>"},
    {"v": "<span class=\"bit coloredbit\">0</span><span class=\"bit\">1</span><span class=\"bit\">0</span>"}
  ],
  "style": "height: 77px; width: 462px; top: 40px;",
  "classes": ["jsavcenter", "jsavautoresize"]
}
```

There is one object with the array. Each array entry has the values under key `v`. Each value has 3 bits which are in their own spans. Each span has the class `bit`, and one of the bits in each entry also has the class `coloredbit`. The `coloredbit` is the bit that currently is being sorted on with the radix sort.   

Once calls start to happen, the part that is not the current scope is greyed out and gains a `cls: ["greybg"]`.

RR1 satisfied.

## Intermediate states

RR2. All the steps in the recording must have a unique, unambiguous inter-
pretation on student’s choices such that it is clear on which step the student’s
steps begin to differ from the execution path of the correct algorithm.

Yes, the contents of the array are included in the JSON every time the array
is changed.

## End state

```json
{
  "ind": [
    {"v": "<span class=\"bit\">0</span><span class=\"bit coloredbit\">0</span><span class=\"bit\">1</span>"},
    {"v": "<span class=\"bit\">0</span><span class=\"bit coloredbit\">1</span><span class=\"bit\">0</span>"},
    {"v": "<span class=\"bit\">0</span><span class=\"bit coloredbit\">0</span><span class=\"bit\">1</span>"},
    {"v": "<span class=\"bit\">0</span><span class=\"bit coloredbit\">0</span><span class=\"bit\">0</span>"},
    {"v": "<span class=\"bit\">0</span><span class=\"bit coloredbit\">0</span><span class=\"bit\">0</span>"},
    {"v": "<span class=\"bit\">0</span><span class=\"bit coloredbit\">1</span><span class=\"bit\">0</span>"},
    {"v": "<span class=\"bit\">1</span><span class=\"bit coloredbit\">1</span><span class=\"bit\">1</span>",
      "cls": ["greybg"]},
    {"v": "<span class=\"bit\">1</span><span class=\"bit coloredbit\">0</span><span class=\"bit\">1</span>",
      "cls": ["greybg"]},
    {"v": "<span class=\"bit\">1</span><span class=\"bit coloredbit\">0</span><span class=\"bit\">1</span>",
      "cls": ["greybg"]},
    {"v": "<span class=\"bit\">1</span><span class=\"bit coloredbit\">0</span><span class=\"bit\">1</span>",
      "cls": ["greybg"]}
  ],
  "style": "height: 77px; width: 462px; top: 40px;",
  "classes": ["jsavcenter", "jsavautoresize"]
}
```

The final state is merely a repeat of the final state of the student. There is no indication of correctness. Based on the swaps and the `cls: ["greybg]` it is possible to infer the student actions and determine the current call stack. 

RR2 not satisfied.
