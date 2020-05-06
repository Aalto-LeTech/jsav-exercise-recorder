//TODO: set all try catch statements

const helpers = require('./helpers.js');

function validateOptions(option) {
  try {
    const notEmpthy = helpers.objectIsNotEmpthy(option);
    const notArray = helpers.objectIsNotArray(option);
    const noInnerObjects = helpers.doesNotContainObjects(option);
  } catch (err) {
    console.warn('Exercise Recorder, validating options', err);
    return false;
  }
  return true;
}

function validateMetadata(metadata) {
  try {
    const notEmpthy = helpers.objectIsNotEmpthy(metadata);
    const notArray = helpers.objectIsNotArray(metadata);
    const noInnerObjects = helpers.doesNotContainObjects(metadata);
  } catch (err) {
    console.warn('Exercise Recorder, validating metadata', err);
    return false;
  }
  return true;
}

function validateStyle(style) {
  // TODO: implement validateStyle
  return true;
}

function validateScore(score) {
  try {
    const notEmpthy = helpers.objectIsNotEmpthy(score);
    const notArray = helpers.objectIsNotArray(score);
    const noInnerObjects = helpers.doesNotContainObjects(score);
  } catch (err) {
    console.warn('Exercise Recorder, validating score', err);
    return false;
  }
  return true;
}

function validateModelAnswerFunction(modelAnswer) {
  try {
    helpers.isValidString(modelAnswer);
  } catch (err) {
    console.warn('Exercise Recorder, validating model answer function as string', err);
    return false
  }
  return true;
}

function validateDataStructure(ds) {
  try {
    helpers.objectIsNotEmpthy(ds);
  } catch (err) {
    console.warn('Exercise Recorder, validating data structure', err);
    return false;
  }
  return true;
}

function validateModelAnswerStepDOM(data) {
  try {
    helpers.isValidString(data.counterHTML);
    helpers.isValidString(data.outputHTML);
    helpers.isValidString(data.canvasHTML);
  } catch (err) {
    console.warn(`Exercise Recorder, validating model answer HTML`, err);
    return false;
  }
  return true;
}

function validateModelAnswerStepOperations(stepOperatoins) {
  try {
    helpers.objectIsNotEmpthy(stepOperatoins);
  } catch (err) {
    console.warn('Exercise Recorder, validating model answer step operations', err);
    return false;
  }
  return true;
}

function validateDsId(dsId) {
  try {
    helpers.isValidString(dsId);
  } catch (err) {
    console.warn('Exercise Recorder, validating data structure id', err);
    return false;
  }
  return true;
}

function validateAnimationDOM(dom) {
  try {
    helpers.isValidString(dom);
  } catch (err) {
    console.warn('Exercise Recorder, validating animation DOM', err);
    return false
  }
  return true;
}

function validateDsClick(click) {
  // TODO: implement validateDsClick
  return true;
}

function validateGradableStep(data) {
  // TODO: implement chackStateChange
  return true;
}

function validateWatchedModelAnswerStep(data) {
  try {
    helpers.isValidString(data.type);
    helpers.isValidString(data.tstamp);
    helpers.isValidString(data.modelAnswerDOM);
    helpers.isNumber(data.currentStep);
  } catch (err) {
    console.warn(`Exercise Recorder, validating watched model answer step`, err);
    return false;
  }
  return true;
}

function validateGradeButtonClick(data) {
  // TODO: validateGradeButtonClick
  return true;
}

module.exports = {
  metadata: validateMetadata,
  style: validateStyle,
  score: validateScore,
  options: validateOptions,
  modelAnswerFunction: validateModelAnswerFunction,
  modelAnswerStepDOM: validateModelAnswerStepDOM,
  modelAnswerStepOperations: validateModelAnswerStepOperations,
  dataStructure: validateDataStructure,
  dsClick: validateDsClick,
  animationDOM: validateAnimationDOM,
  gradableStep: validateGradableStep,
  gradeButtonClick: validateGradeButtonClick,
  watchedModelAnswerStep: validateWatchedModelAnswerStep,
  dsId: validateDsId,
}
