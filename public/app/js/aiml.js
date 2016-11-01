AIMLInterpreter = require('./AIMLInterpreter');
var aimlInterpreter = new AIMLInterpreter({name:'WireInterpreter', age:'42'});
aimlInterpreter.loadAIMLFilesIntoArray(['./test.aiml.xml']);
var callback = function(answer, wildCardArray, input){
console.log(answer + ' | ' + wildCardArray + ' | ' + input);
};