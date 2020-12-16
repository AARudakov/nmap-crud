const dbConfig = require("../config/db.config.js");
const {Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Table NetObject
const NetObject = sequelize.define("netObject", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  IP: {
    type: DataTypes.STRING,
    unique: true
  }
});
// Table Port
const Port = sequelize.define("port", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  number: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING,
//    unique: true
  }
}, {timestamps: false});
// Table Scan
const Scan = sequelize.define("scan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    //allowNull: false
  },
  date: {
    type: DataTypes.DATE
  }
}, {timestamps: false});
// Table ScanNetObjectPort
const ScanNetObjectPort = sequelize.define("ScanNetObjectPort",{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});
// description of Associations
ScanNetObjectPort.belongsTo(Scan);
ScanNetObjectPort.belongsTo(NetObject);
ScanNetObjectPort.belongsTo(Port);
Scan.hasMany(ScanNetObjectPort);
NetObject.hasMany(ScanNetObjectPort);
Port.hasMany(ScanNetObjectPort);

sequelize.sync({force: true})
    .catch((error)=> {console.log('sync db error...\n' + error.toString())});

module.exports = {db, NetObject, Port, Scan, ScanNetObjectPort};
