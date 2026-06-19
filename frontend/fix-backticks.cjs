const fs = require('fs');
const file = 'c:/Users/hrudy/OneDrive/Desktop/CSE/Ascend/frontend/src/components/UI/ProgressionPathModal.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync(file, content);
console.log('Fixed backticks!');
