const express = require("express");
const { Scholarship,Scholarsrecords } = require("../../models");

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

const getScholarshipList = async(req,res,next) => {
  const id = req.params.id;

  const data = await Scholarsrecords.findAll({
    where:{studentno:id}
  });

  res.json(data);
}

module.exports = { saveScholarship, getScholarship, getScholarshipInfo,getScholarshipList };
