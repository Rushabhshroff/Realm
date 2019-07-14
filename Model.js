const Realm = require('./Realm').default;

function RealmModel() {

}
RealmModel.all = function (ModelName) {
    return Realm.Instance.objects(ModelName);
}
RealmModel.find = function (ModelName, query) {
    return Realm.Instance.objects(ModelName).filter((ob) => {
        let isMatch = true;
        if (query.constructor == Object) {
            for (let q in query) {
                if (ob[q] != query[q]) {
                    isMatch = false;
                    break;
                }
            }
        } else {
            isMatch = false;
        }
        return isMatch;
    });
}
RealmModel.findOne = function (ModelName, query) {
    return Realm.Instance.objects(ModelName).find((ob) => {
        let isMatch = true;
        if (query.constructor == Object) {
            for (let q in query) {
                if (ob[q] != query[q]) {
                    isMatch = false;
                    break;
                }
            }
        } else {
            isMatch = false;
        }
        return isMatch;
    });
}
RealmModel.findByObjectId = function (ModelName, objectId) {
    return Realm.Instance.objectForPrimaryKey(ModelName, objectId);
}
RealmModel.save = function (ModelName) {
    Realm.Instance.write(() => {
        Realm.Instance.create(ModelName, this, true);
    })
}
module.exports = RealmModel;