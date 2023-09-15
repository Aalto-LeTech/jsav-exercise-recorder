# Investigation for a scaffolded Prim/Dijkstra grader

## Switching a grader

### Pondering

Using the URL parameter "JXOP-feedback": "continuous" one can switch to the
continuous grader.

- How can one make a custom grader in a JSAV exercise?

ohj/traky/exercises/jsav/doc/grading.png:
in JSAV, function exerproto.grade() calls graders["default].
This should be investigated. This is also the function
which sets this.score that odsaAV-min.js function showGrade()
will use to trigger the AJAX request.

From JSAV documentation:

http://jsav.io/exercises/exercise/

{showGrade}: <function>} A function that can be used to customize the way the grade is shown. The function will be added to the exercise and can be called with exercise.showGrade. The function can access the grade information from attribute this.score. Example content of that attribute: {total: 15, correct: 3, undo: 0, fix: 0, student: 5}. Total is the total number of steps in the model solution, student the number of steps in student solution, and correct the number of correct steps. Values undo and fix show how many steps were undone/fixed in the continuous feedback mode. Note, that to make sure the grading is up to date, this function should call the grade function of the exercise before showing the grade.

Hmmm. :/ I don't want to modify showGrade() if it is not necessary.

Can we just override the grade function of the exercise? Like in the
exercise initialization function:

    this.grade = function () { return something; }

Where is the grader function?

JSAV: src/exercise.js:128-165: yes, this is the precise grading function.


### Result

Investigated: yes, new grading function can be set as an exercise option `grader`.
This is not documented, but luckily JSAV is easily hackable. :)

Now DijkstraPE-research-v2.js has:

```JavaScript
  // JSAV Exercise
  var exercise = jsav.exercise(model, init, {
    compare: [{ class: ["marked", "queued"] }],
    controls: $('.jsavexercisecontrols'),
    modelDialog: {width: "960px"},
    resetButtonTitle: interpret("reset"),
    grader: scaffoldedGrader,
    fix: fixState
  });

  /* some other code */

  /**
   * Custom grading function for the exercise.
   */
  function scaffoldedGrader() {
    console.log("Why hello! <3");
    let score = {
      correct: 1,
      fix: 2,
      student: 3,
      total: 4,
      undo: 5
    }
    this.score = score;
  }

```


## The Undo function

The [original undo function](https://github.com/Aalto-LeTech/jsav-exercise-recorder/blob/scaffolded-grader/testbench/OpenDSA/JSAV/build/JSAV-min.js#L8215-L8233) is a prototype function for the exercise. It is possible to replace this in the exercise object created by the exercise JavaScript, but do we want to do that?

There seems to be two ways:

```
1. Create an event queue when the student works with the exercise. Create another event queue in the model answer. Upon grading, the custom grading function compares the two event queues.
+ easy data structures
- requires modifying the undo function

2. Produce event queues at the grading phase by comparing student's and model answer steps as JSAV data structures.
- computationally laborious way to do this
- implementing it might be laborious
+ no need to modify the undo function
```

Okay, Way 1 seems the way to go. :)