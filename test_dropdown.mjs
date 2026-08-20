import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('dist/assets');
const cssFile = files.find(f => f.endsWith('.css'));
if (cssFile) {
  const css = fs.readFileSync(path.join('dist/assets', cssFile), 'utf8');
  console.log('Includes micro-fade:', /micro-fade/i.test(css));
  
  // extract all rules with micro-fade
  const matches = css.match(/[^}]*micro-fade[^}]*}/gi);
  console.log('Matches:', matches);
}
