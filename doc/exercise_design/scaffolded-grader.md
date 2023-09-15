# Investigation for a scaffolded Prim/Dijkstra grader

## Switching a grader

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

Investigate this!

## Where is the grader function

JSAV: src/exercise.js:128-165: yes, this is the precise grading function.
