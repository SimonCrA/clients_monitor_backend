
//=================
//Port
//=================

process.env.PORT = process.env.PORT || 3000;


//=================
//Environment
//=================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=====================
//Token expiration time
//=====================

process.env.TOKEN_EXPIRY = 120000;


//=====================
//authtentication SEED
//=====================

process.env.SEED_AUTH = process.env.SEED_AUTH || 'D3v3l0pm3n7 S33d';


//=====================
//refresh SEED
//=====================

process.env.SEED_AUTH_REFRESH = process.env.SEED_AUTH_REFRESH || 'R3Fr3sH S33d';


//=================
//Database
//=================

let urlDB;

if( process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/myDB';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;