# Grader for Scaffolded Prim & Dijkstra JSAV exercises

## Background

Problem: the default grader of JSAV counts how many gradeable steps (states)
match between the model answer and student's answer from the beginning. The
order of the states must be exactly the same.

To counteract this problem, Scaffolded Prim & Dijkstra exercises require
iterating the neighbours of recently dequeued node in alphabetical order.
However, this generates new problem, as seen in the year 2022 think-aloud
interviews: students may not follow the alphabetic order in neigbour
iteration, or apply alphabetic order when *dequeueing*. Alphabetic order
slips are also common. This seems evidence that the alphabetic order is
extraneous cognitive load: it is not essential for learning the Dijkstra's
algoritm, but it is required to do the exercise correctly.

## New solution: custom grading algorithm

Create a custom grader algorithm for the exercises:
- Scaffolded Prim's algorithm
- Scaffolded Dijkstra's algorithm

Definitions:
*operation sequence*: finite sequence of operations: (o_1, o_2, ..., o_n).
    Each of operations o_i is a pair: (t, e), where
    t in {'enq', 'upd', 'deq'} is a *operation type*, representing the
           enqueue, update, and dequeue operations, respectively;
    e = (v_1, v_2) is an undirected edge, where
         v_i in {'A', 'B', ..., 'Z'}.
         For convenience reasons, v_1 < v_2 in the alphabetic order.

---------------------------------------------------------------------------
Algorithm Grade-Operations(s1, s2)
Input: s1: *operation sequence* (student's solution)
       s2: *opeartion sequence* (model solution)
Output: (student_grade, max_grade) (two natural numbers)

i <- 0
j <- 0
s1_op_set = {}
s2_op_set = {}

while i < |s1| and j < |s2|:
    model_op = s2[j]
    if s2[[j][0] == 'deq'
        if s1[i][0] == 'deq' and s1[i][1] == s2[j][1]
            i <- i + 1
            j <- j + 1
        else
            break
        end if
    else
        s1_op_set = {}
        k <- i
        while k < |s1| and s1[k][0] != 'deq'
            s1_op_set = s1_op_set union s1[k]
            k <- k + 1
        end while
        s2_op_set = {}
        k <- j
        while k < [s2] and s2[j][0] != 'deq'
            s2_op_set = s2_op_set union s2[k]
            k <- k + 1
        end while
        shared_set = s1_op_set intersection s2_op_set
        union_set = s1_op_set union s2_op_set
        i <- i + |shared_set|
        j <- j + |shared_set|
        if |shared_set| > |common_set|
            break
        end if
    end if
end while
student_grade <- i
max_grade <- |s2|
return (student_grade, max_grade)
---------------------------------------------------------------------------
