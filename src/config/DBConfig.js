export const DBConfig = {
    name: 'AnoclapJsonify',
    version: 1,
    objectStoresMeta: [
        {
            store: 'json',
            storeConfig: {keyPath: 'id', name: 'id', autoIncrement: false},

            storeSchema: [
                {name: 'data', keypath: 'data', options: {unique: false}},
                {name: 'tabId', keypath: 'tabId', options: {unique: true}},
                {name: 'name', keypath: 'name', options: {unique: false}},
                {name: 'createdAt', keypath: 'createdAt', options: { unique: false}},
                {name: 'updatedAt', keypath: 'updatedAt', options: { unique: false}},
            ]
        },
        {
            store: 'activeTab',
            storeConfig: {keyPath: 'id', name: 'id', autoIncrement: false},
            storeSchema: [
                {name: 'tabId', keypath: 'tabId', options: {unique: true}},

            ]
        }

    ]
};