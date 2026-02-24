// Read the tuvidientoan.js file and extract the mappings for stars.
import fs from 'fs';
const v = fs.readFileSync('/Users/vietphuong/Documents/Projects/Thai At Kim Hoa/Tuvitool /tuvidientoan.js', 'utf8');
const lines = v.split('\n');

function findFunctionAndPrint(funcName) {
  let inFunc = false;
  let funcBody = '';
  for (const line of lines) {
    if (line.includes(`function ${funcName}(`)) {
      inFunc = true;
    }
    if (inFunc) {
      funcBody += line + '\n';
      if (line === '}') break;
    }
  }
  // Try to eval and log it
  return funcBody;
}

const ansaoChinam = findFunctionAndPrint('ansao_chinam');
const anSua = findFunctionAndPrint('an_sao_theo_can_cua_nam_sinh');
const anHoaLinh = findFunctionAndPrint('anhoalinh');

console.log('--- ansao_chinam ---');
console.log(ansaoChinam.substring(0, 1500));
console.log('--- anhoalinh ---');
console.log(anHoaLinh);
console.log('--- an_sao_theo_can_cua_nam_sinh ---');
console.log(anSua.substring(0, 1500));
