export const DBConfig = {
    name: 'AnoclapJsonify',
    version: 1,
    objectStoresMeta: [
        {
            store: 'json',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'data', keypath: 'data', options: {unique: false} },
                { name: 'tabId', keypath: 'tabId', options: { unique: true } },
                { name: 'name', keypath: 'name', options: { unique: false } },
            ]
        },
        {
            store: 'activeTab',
            storeConfig: {keyPath: 'id', autoIncrement: true},
            storeSchema: [
                {name: 'tabId', keypath: 'tabId', options: {unique: true}},
                {name: 'userId', keypath: 'userId', options: {unique: true}}
            ]
        }

    ]
};