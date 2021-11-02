const yup = require("yup");

const validate = (schema) => async (req, res, next) => {
    try {
    await schema.validate({
      body: req.body,
    });
     return next();
  } catch (err) {
    
    return res.status(500).json({ success: false, message:err.message})
  }
 };
 const signupSchema = yup.object({
    body: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
      name: yup.string().required(),
      phone: yup.string().required(),
    })
  });
  const loginSchema = yup.object({
    body: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
   
    })
  });

   
  
 exports.validateSchema={validate,signupSchema,loginSchema};