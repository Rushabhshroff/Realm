const realm = require('realm');
export default class Realm {
    static Load() {
        if (!Realm.IsInitialised()) {
            let key = str2ab('pKD8ekh6yG5b2PmQPcTwdZUKSXgMjs2D');
            return realm.open({
                schema: Realm.Schemas,
                encryptionKey: key
            }).then((real) => {
                this.Instance = real;
            })
        }
    }
    static async getInstanceSafe() {
        if (Realm.IsInitialised()) {
            return this.Instance;
        } else {
            await Realm.Load();
            return this.Instance;
        }
    }

    static IsInitialised() {
        return this.Instance != undefined;
    }

}
Realm.Schemas = require('./Schema');

function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}