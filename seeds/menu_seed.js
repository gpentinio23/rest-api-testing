/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const path = require("path");
const fs = require("fs")
exports.seed = async function(knex) {
  // Deletes ALL existing entries
    filePath = path.join(__dirname, "menu.json")
    data = fs.readFileSync(filePath, "utf8")
    menu = JSON.parse(data)
    return knex("molloyeats.menu").insert(menu)

};
