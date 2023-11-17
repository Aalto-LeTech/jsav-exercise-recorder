# JSAV Exercise Recorder with New Exercises

## Summary

**JSAV Exercise Recorder** is a JavaScript software for creating recordings of
[JSAV](http://jsav.io)/[OpenDSA](https://github.com/OpenDSA/OpenDSA)
algorithm visualization exercises. The data format for recording the exercises
is [JSON-based Algorithm Animation Language](https://github.com/Aalto-LeTech/JAAL/).

This repository also contains **New JSAV Exercises** which were developed for
teaching and research on Aalto University course *CS-A1141/-43 Data Structures
and Algorithm Y*. This repository has a testbench which allows running each
exercise independently, without OpenDSA or any learning management system, to
develop the exercises and the JSAV Exercise Recorder.

For an easy introduction to the exercises and the Recorder, see the section
*Introduction with testbench*.

## git branches

This repository has the following branches.

`jaal2.0` is the 2022 development branch based on
[JAAL 2.0 rc2 specification](https://github.com/Aalto-LeTech/JAAL/releases/tag/2.0rc1).

`master` is the old development branch.

`traky` is integration work for Data Structures and Algorithms Y (DSA Y) course.
This version of JSAV Exercise recorder does not handle communication with the
A+ LMS. The communication with the LMS is done in the function `n.showGrade()`
in the file
*tools/extras/OpenDSA/lib/odsaAV-min.js* at [DSA Y course repository]
(https://version.aalto.fi/gitlab/course/traky/blob/jaal/tools/extras/OpenDSA/lib/odsaAV-min-commented.js#L759).
The main differences in the JSAV Exercise Recorder between the `master` and
`traky` branches are in the main file *exerciseRecorder.js*:

1. `rest-services/services.js` is not used.
2. `setSubmissionAndPostUrl()` is not used.
3. Exercise recording is accessible globally:
   `global.JSAVrecorder.getRecording()`

## Introduction with testbench

To test the exercises and the Recorder manually, you will need
[https://www.python.org](Python 3) and a web browser. Once you have those,
start the *test bench server* in the directory `testbench`. E.g. in a UNIX
environment:

```bash
cd testbench
./start-server.py
```

Next, open [http://localhost:8000/OpenDSA/AV/Development/](http://localhost:8000/OpenDSA/AV/Development/) at your web browser.
(If needed, you can specify another HTTP port as a parameter, e.g.
`./start-server.py 8001`.) You should see a web page with title
*Directory listing for /OpenDSA/AV/Development/*.

This directory contains the exercise files. Try clicking [PrimAVPE-scaffolded.html](http://localhost:8000/OpenDSA/AV/Development/PrimAVPE-scaffolded.html).
That should show a web page like this:

![Screenshot of a Prim's algorithm exercise](figures/PrimAVPE-scaffolded-gui.png)

This is just a regular JSAV/OpenDSA exercise. The exercise is about
[Prim's algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm) which
produces a minimum spanning tree. It is assumed that the reader is familiar
with the algorithm, as well as the concepts of graph, priority queue, and
binary heap; these are quite standard material for an introductory data
structures and algorithms course in university education.

The components in the exercise interface from top to bottom are the following:

1. Control buttons: *Undo*, *New Exercise*, *Model Answer*, and *Grade*.
2. Exercise instructions: "Reproduce the behavior..."
3. Node-link diagram: nodes (vertices) are circles and edges are lines.
4. Priority Queue view. It displays a
   [https://en.wikipedia.org/wiki/Binary_heap](Binary heap) and a *Dequeue*
   button.
   

Try a few steps of the exercise. Click any edge, then select *Enqueue* 
in the pop-up dialog, repeat. You should see the edges changing their color to
orange-brown and also appearing in the Priority Queue view. Example:

![Screenshot of a Prim's algorithm exercise in progress](figures/PrimAVPE-scaffolded-gui2.png)

As with regular JSAV/OpenDSA exercises, the control buttons have the following
purposes:
- *Undo* button undoes your recent action.
- *New Exercise* button gives a new exercise instance.
- *Model Answer* button opens a dialog which shows the model answer as
  a series of pictures and text.
- *Grade* button grades your solution.

Moreover, this exercise also has the JSAV Exercise Recorder enabled. To see
what it produces:

1. Open the JavaScript console in your web browser.
   - Firefox: Press the F12 key to open Developer Tools, then click the
     *Console* tab.
   - Chrome and Edge: the same as Firefox.
2. Click the *Grade* button in the exercise.
3. The exercise shows the message "Recording model answer steps" for a moment.
4. The exercise shows a dialog with the text: "Your score: X/22. Your score
   was successfully recorded." Click OK in the dialog.
4. There should be new text printed to the console. The text should be similar
   to the next text snippet.

```
Data conforms to JAAL 2.0.
Final JAAL data: 
Object { metadata: {…}, definitions: {…}, initialState: {…}, animation: (3)
[…] }
Data to be sent A+: 
{"description":"JAAL 2.0 recording","generator":"JSAV Exercise Recorder 2.0.1",
"encoding":"JSON string -> HTML escape -> zlib compress -> Base64 encode",
"data":"eJzt3X2Pm0i6NvCv…" }
```
![Screenshot of a Prim's algorithm exercise with console output](figures/PrimAVPE-scaffolded-console.png)

In the console, the line `Final JAAL data:` shows JSON data recorded from
the exercise. This is a JavaScript object. The line `Data conforms to JAAL 2.0`
indicates that the structure of the object is according to the rules of the
*JSON-based Algorithm Animation Language*, JAAL.

You can expand the JavaScript object it by clicking the small grey triangle
that begins the line
`Object { metadata: {…}, definitions: {…},`. You should see more lines
appearing as follows:

```
  animation: Array(3) [ {…}, {…}, {…} ]
​  definitions: Object { style: {}, score: {…}, options: {}, … }
​  initialState: Object { dataStructures: (2) […], svg: '<svg height="883" ...
```

![Screenshot of a Prim's algorithm exercise with console
output](figures/PrimAVPE-scaffolded-console2.png)

There are JavaScript objects `animation`, `definitions`, and `initialState`
shown briefly in blue. Notice that the `initialState` object has a subobject
`svg` which is a string containing the code of an SVG image:
`<svg height="883" version="1.1" width="900" ...`

Scroll to the bottom of the console. The main object should also have a
`metadata` sub-object at the end. Expand it similarly. It should show data
like this:

```
metadata: Object { uid: 0, ordinal_number: 0, browser: "Mozilla/5.0 (X11;
Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0", … }
​​    browser: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 
    Firefox/120.0"
​​    exercise: Object { name: "PrimAVPE-scaffolded.html", collection: "CS-A1141/
    CS-A1143", "running location": "http://localhost:8000/OpenDSA/AV/
    Development/PrimAVPE-scaffolded.html" }
​​    jaalGenerator: "JSAV Exercise Recorder 2.0.1"
​​    jaalVersion: "2.0"
​​    max_points: null
​​    ordinal_number: 0
​​    recordingStarted: "2023-11-17T08:19:53.654Z"
​​    recordingTimezone: 2
​​    uid: 0
```

This is the *Metadata section* of the recording showing information of
student's web browser, recording software, recording time, and the exercise
configuration.

If you want to examine this JSON data in your favorite IDE or text editor,
click the line `Object { metadata: {…}, definitions: {…},` with the right
mouse button and select *Copy Object*. This should work with Firefox, Chrome
and Edge. Then create a new file in your text editor and paste the data from
the clipboard with Ctrl+V.

This is the end of the technical demonstration of the test bench. You can stop
the web server at command line by Ctrl+C.

For a proper introduction to the JAAL structure itself, see the 
[examples at the JAAL repository](https://github.com/Aalto-LeTech/JAAL/tree/main/examples).

## Developing JSAV Exercise Recorder 

To compile the software, you will need:

- [Node.js](https://nodejs.org/en/)
- [Python 3](https://www.python.org/)


After you have cloned this git repository:

```
git submodule init
git submodule update
npm install
npm run build
```

## Testing at development

See `testbench/README.md`.


## JAAL

The export data format of the Exercise Recorder is *JSON-based Algorithm
Animation Language* (JAAL). The language is specified in the MSc thesis.
Each JAAL recording (file) contains a student's answer to a JSAV-based
visual algorithm simulation exercise. The main structure of a JAAL recording
is the following.

    {
        "metadata": {} ,
        "definitions": {},
        "initialState": {},
        "animation": [],
    }

JAAL specification and documentation is included as a git submodule in the
directory `validation/JAAL`.

## New designs of JSAV exercises

This repository contains new designs of JSAV exercises.

The exercise code itself is at `Testbench/OpenDSA/AV/Development`.
See `testbench/README.md` for how to start the test bench.

The design documentation of the exercises is at `doc/exercise_design`.

## Source code organisation

The Exercise Recorder is implemented on [Node.js](https://nodejs.org/en/).
A Node.js tool [Browserify](http://browserify.org/) compiles all source code
and required libraries into file *exerciseRecorderBundle.js* which can be
used with a JSAV-based exercise. The following figure represents the source
code modules and the build process.

![](./Exercise_Recorder_modules.png)


## How the Exercise Recorder works

When an HTML document containing the Exercise Recorder and the JSAV-based
exercise is loaded, the execution from the source code perspective begins at
file `exerciseRecorder.js`.

![](./Exercise_Recorder_process.png)

The Exercise Recorder initializes automatically when it is imported into an
HTML document. It starts listening for all JSAV log events. For this reason it
is important that the it is imported in the `<head>` element of the HTML
document, before the JSAV exercise is loaded.

Upon initialization the Exercise Recorder will look for the *post\_url* URL
parameter, which should contain the URL where the recorded animation data has to
be posted. Instead of a URL, the *post\_url* can also contain the string
"window", in which case the recorded data will be posted to the window where the
Exercise Recorder has been loaded.

![](./Exercise_data_flow.png)

Currently the recorded data is sent to the given *post_url* when the user clicks
the grade button.

## Installation for development with DSA Y

See doc/aplus_integration/aplus_integration.md.

### Running the tests
The tests are written with Jest. To run the tests do t/JSAV-exerciseshis the
`jsav-exercise-recorder` directory:

    npm run test

### Building the bundle file
To bundle all the required modules in one file use [Browserify](http://browserify.org/).

    npm install -g browserify
    npm run build

The DSA Y course repository, branch `traky`, should have a script called
`compile-jaal.sh` which does the rest.

## Literature

The initial version of the software ("JAAL 1.0") was introduced in
[Giacomo Mariani's MSc thesis](https://aaltodoc.aalto.fi/handle/123456789/44448).

For shorter reading, there is a conference article which describes the



