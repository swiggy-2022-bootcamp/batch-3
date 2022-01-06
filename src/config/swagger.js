/**
 * References: https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284
 * 
 */

const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'contract/QA-Platform-API-v0.0.1.json'
const endpointsFiles = ['src/routes/identity.js', 'src/routes/qa-platform.js']

const doc = {
    info: {
        version: "0.0.1",
        title: "QA Platform API",
        description: "Platform for people to ask questions to the community and get answers."
    },
    host: "localhost:3000",
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
            "user-details": {
              "username": "mail@naveen.com",
              "password": "keepguessing"
            },
            "question": {
              "title": "how to write nodejs program",
              "body": "I’m trying to build rest api with node and express js, I get error as express is missing"
            }
        },
        Answer: {
            "user-details": {
              "username": "mail@naveen.com",
              "password": "keepguessing"
            },
            "question": {
              "question-id": "38a313eb-428e-479c-a0e2-d1b6b5bab935",
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
            'question-id': 'b0a23ed0-64e9-43d7-9f57-87d88043e116'
        },
        QuestionAddSuccessResponse: {
            message: 'Question added successfully',
            'question-id': 'b0a23ed0-64e9-43d7-9f57-87d88043e116'
        },
        AnswerAddSuccessResponse: {
            message: "answer posted successfully",
            'question-id': 'b0a23ed0-64e9-43d7-9f57-87d88043e116'
        },
        FetchAllQuestionsSuccessResponse: [
            {                
                "id": "38a313eb-428e-479c-a0e2-d1b6b5bab935",
                "title": "how to write nodejs program",
                "body": "I’m trying to build rest api with node and express js, I get error as express is missing",
                "createdBy": "b0a23ed0-64e9-43d7-9f57-87d88043e116",
                "updatedBy": "b0a23ed0-64e9-43d7-9f57-87d88043e116",
                "createdTs": "2022-01-06T09:45:49.787Z",
                "updatedTs": "2022-01-06T09:45:49.787Z",
                "answers": [
                    {
                        "id": "672a01a9-dc0c-40ca-a7db-5e3772fc5f6f",
                        "answer": "updated answer",
                        "createdBy": "b0a23ed0-64e9-43d7-9f57-87d88043e116",
                        "updatedBy": "b0a23ed0-64e9-43d7-9f57-87d88043e116",
                        "createdTs": "2022-01-06T09:51:21.218Z",
                        "updatedTs": "2022-01-06T09:51:21.218Z"
                    }
                ]
            }
        ],
        FetchQuestionSuccessResponse: {            
            "id": "38a313eb-428e-479c-a0e2-d1b6b5bab935",
            "title": "how to write nodejs program",
            "body": "I’m trying to build rest api with node and express js, I get error as express is missing",
            "createdBy": "b0a23ed0-64e9-43d7-9f57-87d88043e116",
            "updatedBy": "b0a23ed0-64e9-43d7-9f57-87d88043e116",
            "createdTs": "2022-01-06T09:45:49.787Z",
            "updatedTs": "2022-01-06T09:45:49.787Z",
            "answers": [
                {
                    "id": "672a01a9-dc0c-40ca-a7db-5e3772fc5f6f",
                    "answer": "updated answer",
                    "createdBy": "b0a23ed0-64e9-43d7-9f57-87d88043e116",
                    "updatedBy": "b0a23ed0-64e9-43d7-9f57-87d88043e116",
                    "createdTs": "2022-01-06T09:51:21.218Z",
                    "updatedTs": "2022-01-06T09:51:21.218Z"
                }
            ]
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)