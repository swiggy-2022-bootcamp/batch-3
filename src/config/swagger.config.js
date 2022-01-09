/*
 * Copyright 2022 Debdyut Hajra
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * References: https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284
 * 
 */

const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'contract/QA-Platform-API-v0.0.1.json'
const endpointsFiles = ['src/routes/identity.route.js', 'src/routes/qa-platform.route.js']

const doc = {
    info: {
        version: "0.0.1",
        title: "QA Platform API",
        description: "Platform for people to ask questions to the community and get answers."
    },
    host: "localhost:4000",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        },
        {
            "name": "QA-Platform",
            "description": "Endpoints"
        }
    ],
    definitions: {
        Question: {
            "question": {
              "title": "how to write nodejs program",
              "body": "I’m trying to build rest api with node and express js, I get error as express is missing"
            }
        },
        Answer: {
            "question": {
              "question-id": 1,
              "answer": "you need to check if the express is installed, check package.json file under dependencies, if express exists, if not execute : npm install express"
            }
        },
        UserDtls: {
            "registration-name": "Naveen",
            "username": "mail@naveen.com",
            "password": "keepguessing"
        },
        UserAuthDtls: {
            "username": "mail@naveen.com",
            "password": "keepguessing"
        },
        LoginSuccessResponse: {
            "message": "user logged in successfully"
        },
        Login401ErrorResponse: {
            "message": "Sorry invalid credentials"
        },
        RegisterSuccessResponse: {
            message: "User Registered Successfully",
            "registration-name": "Naveen"
        },
        AnswerUpdateSuccessResponse: {
            message: "answer updated successfully",
            'question-id': 1
        },
        QuestionAddSuccessResponse: {
            message: 'Question added successfully',
            'question-id': 1
        },
        QuestionAddErrorResponse: {
            message: 'Failed to post question.'
        },
        QuestionUpdateSuccessResponse: {
            message: 'Question updated successfully',
            'question-id': 1
        },
        AnswerAddSuccessResponse: {
            message: "answer posted successfully",
            'question-id': 1
        },
        FetchAllQuestionsSuccessResponse: [
            {                
                "id": 1,
                "title": "how to write nodejs program",
                "body": "I’m trying to build rest api with node and express js, I get error as express is missing",                
                "answers": [
                    {
                        "id": 1,
                        "answer": "updated answer"                        
                    }
                ]
            }
        ],
        FetchQuestionSuccessResponse: {            
            "id": 1,
            "title": "how to write nodejs program",
            "body": "I’m trying to build rest api with node and express js, I get error as express is missing",            
            "answers": [
                {
                    "id": 1,
                    "answer": "updated answer"                    
                }
            ]
        },
        QuestionDeleteSuccessResponse: {
            message: 'Question deleted successfully',            
        },
        FetchUserSuccessResponse: {
            "fullName": "UserA",
            "username": "usera@naveen.com",
            "reputations": 20,
            "id": 1
        },
        ValidationErrorResponse: [
            {
                "value": "string",
                "msg": "string",
                "param": "string",
                "location": "string"
            }
        ],
        NotFoundError: {
            message: 'Not Found'
        },
        InternalServerError: {
            message: 'Internal Server Error'
        },
        BadRequestError: {
            message: 'Bad Request'
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)