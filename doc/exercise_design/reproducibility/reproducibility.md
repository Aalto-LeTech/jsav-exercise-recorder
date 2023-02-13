# The reproducibility of JSAV exercises

## How to do it

### General

- Read Artturi's master's thesis section 4.3 Reproducibility of JSAV exercise
  recordings (File Tilantera_MSc.pdf, here, pages 43-46)
- Quickly inspect JSON produced by JSAV (details later)
  - Does the outermost array have more than the initial and last states?

- Inspect the data
- Write a short report into reproducibility/<exercise_name>/<exercise_name.md>  
- Write new data in columns O-Q in recording-status.ods

### How to inspect JSON produced by JSAV

Example exercise: Order of Growth 1

1. [Open exercise submissions in A+](https://plus.cs.aalto.fi/a1141/2022/analyysi/funktiot/order_of_growth_easy/submissions/)
2. Click *Inspect* on one of the submissions
3. Click *Submission details*
4. Copy-paste the *grading_data* JSON string into a code editor

## Example

See the subdirectory `order_of_growth_easy`.
