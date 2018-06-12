const express = require('express');
const router = express.Router();

const { Customer, validate } = require('../model/customers');

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let customers = new Customer({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold });
  
    try {
      customers = await customers.save();
      res.send(customers);
    } catch (error) {
      console.log(error.message);
    }
  });
  
  router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      const customers = await Customer.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
        {
          new: true
        }
      );
  
      if (!customers)
        return res.status(404).send("The customer with the given ID was not found.");
      res.send(customers);
    } catch (err) {
      console.log(err.message);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const customers = await Customer.findByIdAndRemove(req.params.id);
    if (!customers)
      return res.status(404).send("The customer with the given ID was not found.");
    res.send(customers);
  });
  
  router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).send("The customer with the given ID was not found.");
    res.send(customer);
  });

module.exports = router;