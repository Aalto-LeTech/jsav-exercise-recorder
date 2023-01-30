"""
A+ Data downloader for JSAV Exercise Recorder 1.0 submissions.
Language: Python 3.8

Copyright (C) 2021-2022 Artturi Tilanterä <artturi.tilantera@aalto.fi>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

"""

import base64
import csv
from datetime import datetime

import dateutil.parser
import html
import json
import os
import pathlib
import random
import re
import requests
import time
import zlib
from enum import Enum
from pathlib import Path

class Student:
    """
    Represents a student enrolled on a course in A+ LMS.
    """
    def __init__(self, aplus_id, full_name, email, student_id, course, tags):
        """
        Initializer.

        Parameters:
        aplus_id   (int): A+ user id number
        full_name  (str): Full name
        email      (str): E-mail address
        student_id (str): Aalto University student ID
        tags: (list(str)): list of user tags

        """
        self.aplus_id = aplus_id
        self.student_id = student_id
        self.pseudonym = ""
        self.email = email
        self.full_name = full_name
        self.tags = tags
        self.course = course # Aalto University course code
        self.research_consent = False
        self.research_consent_time = None
        self.exercises = {}

    def __str__(self):
        """
        Returns a string representation of the student.

        Returns:
        'aplus_id, student_id, pseudonym, email, full_name, tags, course'
        """
        s1 = "Student: {}, {}, {}, {}, {}, {}, {}".format(
            self.aplus_id, self.student_id, self.pseudonym,
            self.email, self.full_name, self.tags, self.course
            )
        return s1

    def __tag_str(self, tags):
        s = ''
        for t in tags:
            if s != 'user-internal':
                s += ' ' + t
        return s.lstrip()

    def pseudonymized_dict(self):
        """
        Returns pseudonymized shallow copy of the student as a dictionary.
        The dict is JSON serializable.
        :return:
        """

        return {
            'tags': self.tags,
            'course': self.course,
            'research_consent': self.research_consent,
            'research_consent_time': str(self.research_consent_time),
            'exercises': self.exercises
        }

class DownloadStatus(Enum):
    DOWNLOAD_OK = 0         # successfully downloaded
    NO_MATCHING_STUDENT = 1 # A + id mentioned in the submission is not in the
                            # student list
    ALREADY_DOWNLOADED = 2  # JAAL file already exists, skipping

class AplusDownloader:
    def __init__(self, api_url_base, api_token, download_dir):
        """
        Initializer.

        Parameters:
        api_url_base: URL of the api, e.g. https://plus.cs.aalto.fi/api/v2
        course_id:
        api_token:    A+ API token (a string)
        download_dir: download directory
        """
        self.__api_url_base = api_url_base

        # A+ id number of the current course to be downloaded course, e.g. 185
        self.__course_id = -1
        self.__course_code = ""

        # HTTP request headers
        self.__headers = {
            'Content-type': 'application/json',
            'Authorization': 'Token {0}'.format(api_token)
            }
        self.__students = dict() # by aplus_id

        self.__sleep_time = 1 # seconds between HTTP requests

        self.set_download_dir(download_dir)

    def set_course(self, id, code):
        """
        Set information of the current course from which we want to download
        information.

        Parameters:
        id: A+ course id number, e.g. 123
        code: course code, e.g. "CS-A1141"
        """
        self.__course_id = id
        self.__course_code = code

    def set_download_dir(self, dir):
        """
        Sets current download directory.
        """
        self.__download_dir = dir

    def ensure_download_dir(self):
        """
        Sets current download directory. Creates the directory if it does not
        exist.
        """
        if os.access(self.__download_dir, os.W_OK) == False:
            os.makedirs(self.__download_dir)
            print("Created download directory: {}".format(self.__download_dir))

    def retrieve_student_list(self):
        """
        Retrieves basic information of all enrolled students for the current
        course. Does not save anything to disk.
        """
        print("")
        print("Downloading list of students. Course: {}".format(
            self.__course_id))
        print("---------------------------------------------------------")
        total_entries = 0
        downloaded_entries = 0
        api_url = '{}/courses/{}/students/'.format(
            self.__api_url_base, self.__course_id)

        while True:
            print("Requesting {}".format(api_url))
            response = requests.get(api_url, headers=self.__headers)
            if response.status_code != 200:
                raise Exception("Got HTTP {} from {} . Cannot proceed.".format(
                    response.status_code, api_url))

            json_data = json.loads(response.content.decode('utf-8'))
            total_entries = int(json_data['count'])
            downloaded_entries += len(json_data['results'])
            print("Downloaded {} / {} records".format(
                downloaded_entries, total_entries))
            for student in json_data['results']:
                aplus_id = student['id']
                if aplus_id in self.__students:
                    old_courses = self.__students[aplus_id].course
                    self.__students[aplus_id].course = "{}:{}".format(
                        old_courses, self.__course_code)
                else:
                    self.__students[aplus_id] = Student(
                        int(student['id']), student['full_name'],
                        student['email'], student['student_id'],
                        self.__course_code, student['tag_slugs'])

            if json_data['next'] == None:
                break
            else:
                api_url = json_data['next']

        print("Downloaded {} students.".format(len(self.__students)))

    # Note: saving and loading list of students is convenient, because
    # downloading the list of students and their research consents takes
    # some minutes. If someone is developing this software in the future,
    # this might be convenient.
    def save_students(self, filename):
        """
        Saves student information.
        """
        path = pathlib.Path(filename)

        if os.access(path.parent, os.W_OK) == False:
            os.makedirs(path.parent)

        with open(filename, 'w', newline='') as csvfile:
            csvfile.write("aplus_id,student_id,pseudonym,email,full_name,"
            "course,research_consent,research_consent_time,tags\n")
            for student in self.__students.values():
                csvfile.write("{},{},{},{},{},{},{},{},\"{}\"\n".format(
                    student.aplus_id,
                    student.student_id,
                    student.pseudonym,
                    student.email,
                    student.full_name,
                    student.course,
                    student.research_consent,
                    student.research_consent_time,
                    " ".join(student.tags)
                ))
        print("Student identities written to {}".format(filename))

    def load_students(self, filename):
        """
        Loads student information.
        """
        with open(filename, newline='\n') as f:
            reader = csv.reader(f)
            next(reader) # skip the header

            for row in reader:
                aplus_id = int(row[0])
                student_id = row[1]
                pseudonym = row[2]
                email = row[3]
                full_name = row[4]
                course = row[5]
                tags = row[8].split(' ')
                student = Student(aplus_id, full_name, email, student_id,
                    course, tags)
                student.pseudonym = pseudonym
                student.research_consent = bool(row[6])
                student.research_consent_time = None
                if (row[7] != 'None'):
                    student.research_consent_time = dateutil.parser.isoparse(row[7])
                self.__students[aplus_id] = student

    def print_students(self):
        print("")
        print("List of students")
        print("--------------------------------------------------------------------------")
        print("A+ id: student_id pseudonym email full_name course research_consent research_consent_time tags")
        for k, v in self.__students.items():
            print("{}: {} {} {} {} {} {} {} {}".format(k, v.student_id,
                v.pseudonym, v.email, v.full_name, v.course,
                v.research_consent, v.research_consent_time, v.tags))

    def assign_pseudonyms(self):
        """
        Assigns random pseudonyms for students.
        """
        n = len(self.__students)
        pseudonyms = ["P{}".format(100 + x) for x in range(n)]
        random.shuffle(pseudonyms)
        i = 0
        for student in self.__students.values():
            student.pseudonym = pseudonyms[i]
            i += 1

    def retrieve_research_consents(self, consent_location):
        """
        Retrieves research consents for the current course.

        Assumption: there is a questionnaire exercise for the research
        consent. The exercise constains a question, and a certain answer to
        the question means that the student has given their research
        consent.

        Students can give or deny their consent multiple times. Only the
        last answer counts.

        Parameters:
        consent_location: {
            'exercise_id': A+ exercise id of the research consent, e.g. 123,
            'field': Consent field in the exercise, e.g. 'field_0',
            'accept_value': Consent acceptance value, e.g. 'a'
        }
        """

        print("Retrieving research consents")
        exercise_name = 'research_consent'
        self.retrieve_exercise_submissions(exercise_name,
            consent_location['exercise_id'], False)

        for student in self.__students.values():
            if exercise_name in student.exercises.keys():
                print("Student {} has answered research consent.".format(student.full_name))
                for submission in student.exercises[exercise_name]:
                    print(submission)
                    parsed = self.parse_research_consent(submission,
                                                           consent_location)

                    if (student.research_consent_time is None):
                        student.research_consent = parsed['accept']
                        student.research_consent_time = parsed['timestamp']
                    else:
                        # Only newer consent replaces older one
                        print("Student {} answered research consents more than once!".format(student.full_name))
                        print("Answer at {}: {}".format(parsed['timestamp'],
                                                        parsed['accept']))
                        if parsed['timestamp'] > student.research_consent_time:
                            student.research_consent = parsed['accept']
                            student.research_consent_time = parsed['timestamp']
                            print("Newer consent replaces older.")


    def parse_research_consent(self, submission, consent_location):
        """
        Parses a research consent answer from a student's submission in A+.

        Parameters:
        submission: {
            'id': submission A+ id,
            'submission_time': 'YYYY-MM-DDThh:mm:ss.xxxxxx+ZZ:ZZ',
            'exercise': {
                'id': exercise A+ id,
                'submission_data': [
                    ['field_0', 'b'],
                    ['__grader_lang', 'fi']
                ],
                ...
                }
            ...
        }
        consent_location: {
            'exercise_id': A+ exercise id of the research consent, e.g. 123,
            'field': Consent field in the exercise, e.g. 'field_0',
            'accept_value': Consent accepted value, e.g. 'a'
        }

        Returns:
        {
            accept: either True or False
            timestamp: a datetime.datetime object
        }
        """
        accept = False
        timestamp = dateutil.parser.isoparse(submission['submission_time'])
        for field in submission['submission_data']:
            name, value = field[0], field[1]
            if (name == consent_location['field'] and
                value == consent_location['accept_value']):
                accept = True
        return dict(accept=accept, timestamp=timestamp)

    def retrieve_exercise_submissions(self, exercise_name, aplus_id,
        is_jaal=False, limit=None):
        """
        Retrieves the submissions to an exercise.

        Parameters:
        exercise_name (str): arbitrary name, used as a key in self.exercises
        aplus_id      (int): A+ ID number of the exercise
        is_jaal       (bool): if True, the submission is a JAAL recording
        limit         (int): How many submissions to download at maximum.
                             Default: none
        """

        # Retrieve submission list
        submission_ids = self.__retrieve_submission_list(aplus_id)
        n = len(submission_ids)
        print("Total {} submissions.".format(n))

        # Retrieve submissions one by one.
        counter = 0
        for sid in submission_ids:
            counter_text = "{}/{}".format(counter + 1, n)
            retcode = self.__retrieve_submission(sid, exercise_name, is_jaal,
                                       counter_text)
            counter += 1
            if (limit is not None and counter >= limit):
                break

            # Take a pause between requests. A+ might return an HTTP error
            # if it receives requests too frequently.
            if (retcode != DownloadStatus.ALREADY_DOWNLOADED):
                time.sleep(self.__sleep_time)

    def __retrieve_submission_list(self, aplus_id):
        """
        Retrieves a submission list for an exercise.

        :param aplus_id: (int): A+ ID number of the exercise
        :return: list of integers: A+ ID numbers of the submissions.
        """
        api_url = '{}/exercises/{}/submissions/'.format(
            self.__api_url_base, aplus_id)
        submission_ids = [] # list of A+ IDs of individual submissions
        while True:
            print("Requesting submission list: {}".format(api_url))
            response = requests.get(api_url, headers=self.__headers)
            if response.status_code != 200:
                raise Exception("Got HTTP {} from {} . Cannot proceed.".format(
                    response.status_code, api_url))
            json_data = json.loads(response.content.decode('utf-8'))
            for submission in json_data['results']:
                submission_ids.append(submission['id'])

            if json_data['next'] == None:
                break
            else:
                api_url = json_data['next']
        return submission_ids

    def __retrieve_submission(self, sid, exercise_name, is_jaal, counter_text):
        """
        Retrieves on exercise submission in A+ based on submission ID.
        Parameters:
        sid           (str): A+ ID number of the submission
        exercise_name (str): arbitrary name, used as a key in self.exercises
        is_jaal       (bool): if True, the submission is a JAAL recording
                              and thus written into separate file.
                              If False, the submission is stored into
                              self.__student[..][exercise_name][..]
        counter_text: the number of submission in the download queue.

        Returns: Enum DownloadStatus
        """
        path_name = ""
        if is_jaal:
            path_name = "{0}/{1}.json".format(self.__download_dir, sid)

        api_url = '{}/submissions/{}/'.format(self.__api_url_base, sid)
        print("Submission {}: requesting {}".format(counter_text, api_url))
        response = requests.get(api_url, headers=self.__headers)
        if response.status_code != 200:
            raise Exception("Got HTTP {} from {} . Cannot proceed.".format(
                response.status_code, api_url))
        json_data = None
        raw_data = response.content.decode('utf-8')
        try:
            json_data = json.loads(raw_data)
        except json.decoder.JSONDecodeError as e:
            print("JSON decode error at submission {}: {}".format(sid, e))
            json_data = self.__emergency_parse_submission(raw_data, sid)
            is_jaal = False

        submitter_aplus_id = json_data['submitters'][0]['id']
        if submitter_aplus_id not in self.__students:
            print(("Submission id {}: user id {} is not on the student list. "
                   "They are likely course staff. Do not store this submission."
                   ).format(sid, submitter_aplus_id))
            return DownloadStatus.NO_MATCHING_STUDENT
        student = self.__students[submitter_aplus_id]

        json_data['submitters'] = None  # Clear for pseudonymisation
        json_data['feedback'] = None    # Clear for redundance; 'grading_data'
                                        # contains all the essential
        if is_jaal:
            self.__write_jaal_submission(json_data, sid, path_name)
            json_data['grading_data']['grading_data'] = "{}.json".format(sid)
            del json_data['grading_data']['feedback']

        # Make a list of the submissions, because one student might have
        # submitted several times to the same exercise.
        if exercise_name not in student.exercises:
            student.exercises[exercise_name] = []
        student.exercises[exercise_name].append(json_data)
        return DownloadStatus.DOWNLOAD_OK

    def __emergency_parse_submission(self, raw_data, sid):
        """
        Tries to emergency parse the JSON data of a submission so that
        at least the submitter can be saved.

        Parameters:
        raw_data: raw data from content part of a HTTP response
        sid       (str):  A+ ID number of the submission
        """
        heading = re.compile(r"^{.*\"submission_data\":")
        result = heading.match(raw_data)
        if result is None:
            print("Cannot emergency parse submission {}".format(sid))
            return None
        json_str = result[0] + 'null}'
        parsed = json.loads(json_str)
        return parsed


    def __write_jaal_submission(self, json_data, sid, path_name):
        """
        Converts json_data['grading_data'] into Python object.

        Parameters:
        json_data (dict): data of one A+ LMS exercise submission
        sid       (str):  A+ ID number of the submission
        path_name (str): path and file name to save the submission
        """

        # The grading_data field is a JSON string itself
        grading_data = json.loads(json_data['grading_data']['grading_data'])

        # JSAV Exercise Recorder
        # encoding\":\"JSON string -> HTML escape -> zlib compress -> Base64 encode

        decoding_error = False
        try:
            if 'description' not in grading_data:
                raise Exception("Field 'description' not found in "
                    "grading_data. This does not seem a JAAL 2.0 wrapper.")
            jaal_data = grading_data['data']
            jaal_data = bytes(jaal_data, encoding='ascii')
            decoded = base64.decodebytes(jaal_data)
            unzipped = zlib.decompress(decoded)
            unzipped_str = str(unzipped)[2:-1]
            unescaped = html.unescape(unzipped_str)

            # SVG inside JAAL is double escaped. Replace literal
            # three-character substrings \\" with two-character substring \" .
            unescaped = unescaped.replace(r'\\"', r'\"')

            with open(path_name, 'w') as jaalfile:
                jaalfile.write(unescaped)
        except Exception as e:
            decoding_error = True
            print(("Got an exception while decoding JAAL data from "
                "submission {}:\n{}").format(sid, e))

        if decoding_error:
            try:
                path_name = "{0}/{1}.txt".format(self.__download_dir, sid)
                with open(path_name, 'w') as jaalfile:
                    jaalfile.write(grading_data)
                print("Base64 encoded JAAL data written to file {}".format(path_name))
            except Exception as e:
                print(("Got exception while trying to write Base64 encoded\n"
                "JAAL data to file {}.").format(path_name))

    def assign_pseudonyms_to_students(self):
        """
        Generates a pseudonymic identifier for each study participant.
        """

        n = len(self.__students)
        pseudonyms = []
        for i in range(n):
            pseudonyms.append("{}".format(100 + i))
        random.shuffle(pseudonyms)

        i = 0
        for k, v in self.__students.items():
            v.pseudonym = pseudonyms[i]
            i += 1

    def write_submissions(self, file_name):
        """
        Write students' submissions other that JAAL recordings.
        """

        maindir = Path(self.__download_dir)
        if not maindir.is_dir():
            maindir.mkdir()
        path_name = "{0}/{1}".format(self.__download_dir, file_name)

        pseudonymized_students = {}

        # Remove student_id and email from pseudo_students
        for aplus_id, student in self.__students.items():

            # Save only students who have given their research consent
            if student.research_consent == False:
                continue

            pseudonymized_students[student.pseudonym] =\
                student.pseudonymized_dict()

        with open(path_name, 'w') as json_file:
            json_file.write(json.dumps(pseudonymized_students))