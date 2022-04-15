const express = require('express');
const router = express.Router();
 
 router.get("/",async (req, res) => {
    try {
      const products = await Product.find({})
        .sort("-createdAt")
        .populate("category");
      res.render("views/student/Login", { pageName: "Home", products });
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  });
 module.exports=router;