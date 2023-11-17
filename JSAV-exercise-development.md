# Developing JSAV Exercises

## Software development

The testbench is this repository is useful for developing JSAV exercises
standalone, even without JSAV Exercise Recorder, full OpenDSA source, or a
learning management system. JSAV exercises are pure browser-side JavaScript,
HTML and CSS. If you would like to develop JSAV exercises but don't know how to
start, here is suggested reading in order.

1. [JSAV webpage](http://jsav.io/). There are installation instructions,
   JSAV API documentation, and even a tutorials to create slideshows and
   exercises.

2. [JSAV-exercise-notes.md](JSAV-exercise-notes.md). In this local repository, 
   written by Johanna Sänger who developed existing OpenDSA exercises further.
   This document contains a walkthrough of the code of one exercise.

3. [Testbench README](testbench/README.md). Good-to-know information, at least
   "Testing Finnish Translations"

4. [OpenDSA System Documentation](https://opendsa.readthedocs.io/en/latest/AV.html). OpenDSA is the
   open source interactive textbook which contains algorithm visualization
   exercises made with JSAV. Their extensive system documentation includes
   information for developing JSAV exercises. You don't need the whole OpenDSA
   to develop a new, standalone JSAV exercise, but some information here might
   be useful if you're wondering the meaning of some testbench code.

## Design

The *design* of JSAV exercises is another, advanced aspect involving user
interface design, computing education research, and learning sciences.

**Learning sciences**

Mayer, Richard E (2017). *Instruction Based on Visualizations*. In: [Handbook of
  Research on Learning and
  Instruction](https://www.routledge.com/Handbook-of-Research-on-Learning-and-Instruction/Mayer-Alexander/p/book/9781138831766),
  pp. 483-501. Routledge, New York, NY, USA. ISBN 978-1-138-83176-6.

**Computing education research**

Sorva, Juha (2012). [Visual program simulation in introductory programming
education](https://aaltodoc.aalto.fi/handle/123456789/3534). Doctoral
dissertation. Aalto University publication series DOCTORAL DISSERTATIONS,
61/2012. ISSN 1799-4942.

Ville Karavirta, Ari Korhonen, Otto Seppälä (2013). [Misconceptions in Visual Algorithm Simulation Revisited: On UI’s Effect on Student Performance, Attitudes and Misconceptions](http://dx.doi.org/10.1109/LaTiCE.2013.35). In Learning and Teaching in Computing and Engineering (LaTiCE), pages 62–69.

Clifford A. Shaffer, Matthew L. Cooper, Alexander Joel D. Alon, Monika Akbar,
Michael Stewart, Sean Ponce, and Stephen H. Edwards (2010). [Algorithm
Visualization: The State of the
Field](https://doi.org/10.1145/1821996.1821997). ACM Trans. Comput. Educ. 10,
3, Article 9 (August 2010), 22 pages.

## Integrating exercises to other software

While [OpenDSA](https://opendsa-server.cs.vt.edu/) itself provides JSAV
exercises integrated to its other learning material, the standalone JSAV
exercises can be integrated to other software as well.

Aalto University courses on data structures and algorithms
(CS-A1141/CS-A1143/CS-A1140) provide their learning material through [A+
LMS](https://apluslms.github.io/). These courses have custom code to integrate
the JSAV exercises into the material. Contact Artturi Tilanterä or Ari Korhonen
(firstname.lastname(at)aalto.fi) for more information.