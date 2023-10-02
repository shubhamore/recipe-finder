const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/recipe/:query', async (req, res) => {
    const query = req.params.query;
    const recipeUrl = `https://api.edamam.com/search?q=${query}&app_id=4097f9dd&app_key=3220831cbd46efe49d9481edcec53a36`;
  
    try {
      const recipeResponse = await axios.get(recipeUrl);
      const recipeData = recipeResponse.data;
  
      if (recipeData.hits.length > 0) {
        const recipe = recipeData.hits[0].recipe;
        const imageUrl = `https://source.unsplash.com/400x300/?${query}`;
        res.json({
          label: recipe.label,
          ingredients: recipe.ingredientLines,
          image: imageUrl
        });
      } else {
        res.status(404).json({ error: 'No recipes found for the given query.' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get('/frontend-mashup', (req, res) => {
    res.sendFile(__dirname + '/views/frontend-mashup.html');
  });
  app.get('/backend-mashup', (req, res) => {
    res.sendFile(__dirname + '/views/backend-mashup.html');
  });
    