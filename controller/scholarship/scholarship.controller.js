const express = require("express");
const { Scholarship } = require("../../models");

const saveScholarship = async (req, res, next) => {
  const scholarship = req.body;
  await Scholarship.create(scholarship);
  res.json(scholarship);
};

const getScholarship = async (req, res, next) => {
  const scholarship = await Scholarship.findAll();
  res.json(scholarship);
};

const getScholarshipInfo = async (req, res, next) => {
  const id = req.params.id;
  const scholarship = await Scholarship.findByPk(id);
  res.json(scholarship);
};

module.exports = { saveScholarship, getScholarship, getScholarshipInfo };
