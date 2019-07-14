import Realm from './Realm';

export default class RealmModel {
    static all(ModelName) {
        return Realm.Instance.objects(ModelName);
    }
    static find(ModelName,query){
        return Realm.Instance.objects(ModelName).filter((ob)=>{
            let isMatch = true;
            if(query.constructor == Object){
                for(let q in query){
                    if(ob[q] != query[q]){
                        isMatch = false;
                        break;
                    }
                }
            }else{
                isMatch = false;
            }
            return isMatch;
        });
    }
    static findOne(ModelName,query){
        return Realm.Instance.objects(ModelName).find((ob)=>{
            let isMatch = true;
            if(query.constructor == Object){
                for(let q in query){
                    if(ob[q] != query[q]){
                        isMatch = false;
                        break;
                    }
                }
            }else{
                isMatch = false;
            }
            return isMatch;
        });
    }
    static findByObjectId(ModelName,objectId){
        return Realm.Instance.objectForPrimaryKey(ModelName,objectId);
    }
    save(ModelName){
        Realm.Instance.write(()=>{
            Realm.Instance.create(ModelName,this,true);
        })
    }
}