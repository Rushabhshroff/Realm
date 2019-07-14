let schemas = require('./Schema');
let fs = require('fs');
let includeTypeInArray = true;
if (!fs.existsSync(__dirname + '/../Models')) {
    fs.mkdirSync(__dirname + '/../Models');
}
const getProps = (props, prefix = 'this') => {
    let p = '';
    for (let pr in props) {
        if (props[pr].constructor == String) {
            p += `${prefix}.${pr} = ${getDataTypeConstructor(props[pr])}; \n\t\t\t`;
        } else if (props[pr].constructor == Object) {
            p += `${prefix}.${pr} = ${getDataTypeConstructor(props[pr]['type'])}; \n\t\t\t`;
        }
    }
    return p;
}
const getDataTypeConstructor = (type) => {
    let DataTypeMapping = {
        'string': 'String()',
        'int': 'Number()',
        'bool': 'Boolean()',
        'date': 'new Date()',
        'data': 'new ArrayBuffer(0)',
        'float': 'Number()',
        'double': 'Number()',
    }
    if (DataTypeMapping[type] != undefined) {
        return `${DataTypeMapping[type]}`;
    } else {
        if (type.constructor == String && type.includes('[]')) {
            type = type.replace('[]', '');
            if (DataTypeMapping[type] != undefined) {
                return `Array${includeTypeInArray? '<' + DataTypeMapping[type].replace(/new|[(?0)]/g,'') + '>':''}()`
            } else {
                return `Array${includeTypeInArray? '<' + type + '>':''}()`
            }
        } else {
            return `new ${type}();`
        }
    }
}

const getImportStatements = (ob) => {
    let importsReq = [];
    let importStatement = '';
    let nonImports = [
        'string',
        'int',
        'bool',
        'date',
        'data',
        'float',
        'double',
    ]
    if (ob.constructor == Object) {
        for (let o in ob) {
            let type ;
            if(ob[o].constructor == String){
            type = ob[o].replace('[]','');
            }else if(ob[o].constructor == Object){
                type = ob[o]['type'].replace('[]','');
            }
            if(!nonImports.includes(type) && !importsReq.includes(type)){
                importsReq.push(type);
            }
        }
    }
    for(let i = 0; i < importsReq.length; i++){
        importStatement += `import ${importsReq[i]} from './${importsReq[i]}';\n`
    }
    return importStatement;
}
const indexArray = [];
schemas.forEach((ob) => {
    let data =
        `import RealmModel from '../Realm/Model';
${getImportStatements(ob.properties)}        
export default class ${ob.name} extends RealmModel{
        constructor(){
            super();
            this.presave = ${ob.name}.preSave;
            this.postsave = ${ob.name}.postSave;
            ${getProps(ob.properties)}
        }
        static preSave = (obj = new ${ob.name}(),next)=>{
            next();
        }
        static postSave = (obj = new ${ob.name}())=>{}
        static ModelName = '${ob.name}';
        static parseJsonObject(jsonObject){
            let ob = new ${ob.name}();
            if(jsonObject.constructor == String){
                ob = JSON.parse(jsonObject);
            }else{
                ob = jsonObject;
            }
            return ob;
        }
        static getAll(){
            let found = super.all(${ob.name}.ModelName);
            return found.map((ob)=>{
                return this.parseJsonObject(ob);
            })
        }
        static all(){
            return super.all(${ob.name}.ModelName);
        }
        static find(query){
            let found = super.find(${ob.name}.ModelName,query);
            return found.map((ob)=>{
                return this.parseJsonObject(ob);
            })
        }
        static findOne(query){
            let found = super.findOne(${ob.name}.ModelName,query);
            return this.parseJsonObject(found);
        }
        static findByObjectId(objectId){
            let found = super.findByObjectId(${ob.name}.ModelName,objectId);
            return this.parseJsonObject(found);
        }
        save(){
            this.presave(this,()=>{
                super.save(${ob.name}.ModelName);
            });
            this.postsave(this);
        }
    }
    `
    fs.writeFileSync(__dirname + `/../Models/${ob.name}.js`, data);
    indexArray.push(ob.name);
})
let index = '';
indexArray.forEach((value)=>{
    index += `import ${value} from './${value}';\nexport {${value}}\n`;
})
fs.writeFileSync(__dirname + '/../Models/index.js',index);
console.log('\x1b[32m','Models Generated at ' + __dirname + '/../Models');