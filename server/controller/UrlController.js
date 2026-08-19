import { nanoid } from "nanoid";
import Url from "../model/url.js";


const createShortUrl = async (req, res) => {
  const url = req.body.url;
 
  if(!url){
    return res.status(400).json({
      msg:"URL is required"
    });
  }
let finalUrl;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    finalUrl = url;
  } else {
    finalUrl = "https://"+url;
  }

  try {
    new URL(finalUrl);
  } catch (error) {
    return res.status(400).json({
      msg:"Please enter valid URL"
    });
  }
 const code = nanoid(6);
  let newUrl;
  try {
    newUrl = await Url.create({
      originalUrl: finalUrl,
      shortCode: code,
      user: req.userId
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }

  res.json(newUrl);
};

const redirectUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  let url;
  try {
    url = await Url.findOne({
      shortCode,
    });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.clicks += 1;
    await url.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server error",
    });
  }
  res.redirect(url.originalUrl);
};

const getAllUrl = async (req, res) =>{

  try {
    const urls= await Url.find({
      user: req.userId
    });
    res.json(urls)
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Internal server error",
    });
  }

}

const getUrlByCode = async (req, res) =>{
  const shortCode = req.params.shortCode;

  let url;
  try {
     url= await Url.findOne({
      shortCode,
      user: req.userId
    });

    if(!url){
      return res.status(404).json({
        message: "URL not found",
      });
    }
    res.json(url);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

const deleteUrl = async (req,res) => {
  const shortCode = req.params.shortCode;

  try {
    const result =  await Url.deleteOne({
      shortCode,
      user:req.userId
    });

    if(result.deletedCount == 0){
      return res.status(404).json({
        msg:"Url not found"
      });
    }

    res.json({
      msg:"Url deleted Succesfully"
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

const updateUrl = async (req,res) => {
  const shortCode = req.params.shortCode;
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({
      msg: "URL is required",
    });
  }
  let finalUrl;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    finalUrl = url;
  } else {
    finalUrl = "https://" + url;
  }

  try {
    new URL(finalUrl);
  } catch (error) {
    return res.status(400).json({
      msg: "Please enter valid URL",
    });
  }

  try {
    const result = await Url.findOneAndUpdate(
      { shortCode,
        user: req.userId
       },
      { originalUrl: finalUrl },
      {new: true})

      if(!result){
        return res.status(404).json({
          msg:"Url not found"
        })
      }

      res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
}

export { createShortUrl, redirectUrl, getAllUrl, getUrlByCode, deleteUrl, updateUrl };
