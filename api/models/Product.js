module.exports = {
    schema: true,
    attributes:{
    name:{type: 'string', columnType: 'varchar(80)', required: true},
    description: {type: 'string', columnType: 'varchar(40)'},
    descriptionLong: {type: 'string', columnType: 'varchar(300)'},
    price:{type: 'number', columnType: 'DECIMAL(6,2)', required: true},
    category:{type:'number', columnType:'INTEGER',required: true},
    image: { type: 'string', columnType: 'varchar(128)' },
    orders: {
        collection: 'order',
        via: 'products'
    }
    },
    
};