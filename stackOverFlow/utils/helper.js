groupArray = (arr) => {
  const obj = {};
  for (const i in arr) {
    if (arr[i].title in obj) {
      obj[arr[i].title].push({ answer: arr[i].answer });
    } else {
      obj[arr[i].title] = [{ answer: arr[i].answer }];
    }
  }

  const questionAnswerArray = [];

  for (question in obj) {
    questionAnswerArray.push({ question, answers: obj[question] });
  }

  return questionAnswerArray;
};

module.exports = { groupArray };
