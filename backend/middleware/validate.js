exports.validateInput = (req, res, next) => {
    const { title, url, description } = req.body;
    
    if (!title.trim() || !url.trim() || !description.trim()) {
        console.log("Validation error : ")
      return res.status(400).json({ error: 'Fields cannot be empty or contain only spaces' });
    }
    
    next();
  };
  
