#!/usr/bin/python3
# -*- coding: utf-8 -*-

# The main download script for 2022 research data

from aplus_downloader import AplusDownloader
import os
import time

api_url_base = "https://plus.cs.aalto.fi/api/v2"
courses = [
    {
        'id': 263,                 # A+ course id
        'code': 'CS-A1141',        # Aalto University course code
        'instance_name': '2022',   # yearly instance
        'research_consent': {
            'exercise_id': 40899,  # A+ exercise id
            'field': 'field_0',    # Identifier for the questionnaire field
            'accept_value': 'a'    # Answer which denotes acceptance
        },
        'exercises': [
            {
                # Identifier in the downloaded data
                'name': 'prim-scaffolded',
                # A+ exercise id
                'id'  : 46425,
                # True: treat grading_data field as a Base64 encoded, HTML
                # escaped JSON, save it into its own file.
                # False: include the grading_data field as it in
                # submissions.json
                'is_jaal': True
            },
            {
                'name': 'dijkstra-scaffolded',
                'id': 45562,
                'is_jaal': True
            },
            {
                'name': 'prim-non-scaffolded',
                'id': 46426,
                'is_jaal': True
            },
            {
                'name': 'dijkstra-non-scaffolded',
                'id': 46283,
                'is_jaal': True
            }
        ]
    },
    {
        'id': 264,
        'code': 'CS-A1143',
        'instance_name': '2022',
        'research_consent': {
            'exercise_id': 45754,
            'field': 'field_0',
            'accept_value': 'a'
        },
        'exercises': [
            {
                'name': 'prim-scaffolded',
                'id': 46423,
                'is_jaal': True
            },
            {
                'name': 'dijkstra-scaffolded',
                'id'  : 45561,
                'is_jaal': True
            },
            {
                'name': 'prim-non-scaffolded',
                'id': 46424,
                'is_jaal': True
            },
            {
                'name': 'dijkstra-non-scaffolded',
                'id': 46280,
                'is_jaal': True
            }
        ]
    }
]

print("Artturi Tilanterä's A+ Data Downloader")
print("Made for Dijkstra's algorithm misconceptions research 2022")
print("Time: {}".format(time.asctime()))
print("A+ API URL: {}".format(api_url_base))
print("Enter your A+ token from https://plus.cs.aalto.fi/accounts/accounts/ .")
api_token = input("A+ API token: ")


download_dir = "raw"
dl = AplusDownloader(api_url_base, api_token, download_dir)

# Student identities, pseudonyms, research consent

identity_filename = "raw/student_identities.csv"
if os.path.exists(identity_filename):
    print("Loading student identity file: {}".format(identity_filename))
    dl.load_students(identity_filename)
    #dl.print_students()
else:
    print("Retrieving student identities")
    for course in courses:
        download_dir = "raw/{}_{}".format(course['code'],
                                          course['instance_name'])
        dl.set_course(course['id'], course['code'])
        dl.set_download_dir(download_dir)
        dl.retrieve_student_list()
    dl.assign_pseudonyms()

    for course in courses:
        print("Retrieving research consents for course {}".format(
            course['code']))
        dl.set_course(course['id'], course['code'])
        dl.retrieve_research_consents(course['research_consent'])

    dl.save_students(identity_filename)

# Download exercise submissions.
# Write data/raw/submissions.json.
# For JAAL recordings, write data/raw/{submission_id}.json.

for course in courses:
    dl.set_course(course['id'], course['code'])
    limit = None # Set to 'None' to download all.
                 # For testing: set to integer to download only some first
                 # submissions.
    for x in course['exercises']:
        print("--------------------------------------------------------")
        print("Downloading submissions")
        print("Course: {}".format(course['code']))
        print("Exercise: {}".format(x['name']))
        print("--------------------------------------------------------")
        dl.retrieve_exercise_submissions(x['name'], x['id'], x['is_jaal'],
                                         limit)
    dl.write_submissions('submissions.json')
