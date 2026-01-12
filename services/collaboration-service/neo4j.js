const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  'neo4j+s://e9b882d9.databases.neo4j.io', // URI من Aura
  neo4j.auth.basic('neo4j', 'Pc_HPPxstJpgGs_0XgMm-ns2SmVJHvQeJ0lI0GxETj8') // اسم المستخدم وكلمة السر
);

module.exports = driver;
