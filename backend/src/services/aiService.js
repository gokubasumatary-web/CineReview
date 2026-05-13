/**
 * AI Service
 * Leverages Anthropic's Claude API to generate sophisticated cinematic insights.
 * Includes a robust fallback/simulation mode for development without an API key.
 */
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

/**
 * Synthesizes movie reviews and metadata into a high-end cinematic analysis.
 * @param {Object} movieData - The full movie object from TMDB, including reviews.
 * @returns {Promise<Object>} A structured insight object containing score, analysis, and metrics.
 */
const synthesizeMovieInsight = async (movieData) => {
  // Enhanced Simulation Logic if API Key is missing
  if (!process.env.CLAUDE_API_KEY) {
    const genres = movieData.genres?.map(g => g.name) || [];
    const rating = movieData.vote_average || 7.0;
    const year = movieData.release_date ? new Date(movieData.release_date).getFullYear() : 2024;
    
    // Dynamic Analysis Generation based on data
    let analysis = "";
    let pacing = "Precise";
    let theme = "Universal";
    let visualStyle = "Cinematic";
    let emotionalDepth = 80;

    if (genres.includes('Science Fiction') || genres.includes('Action')) {
      analysis = `A visual masterclass that pushes the boundaries of ${genres[0]}. The narrative ${rating > 7.5 ? 'expertly weaves complex motifs' : 'prioritizes high-octane spectacle'} with a ${year < 2000 ? 'classic analog' : 'cutting-edge digital'} aesthetic.`;
      pacing = rating > 8 ? "Relentless" : "Kinetic";
      theme = "Speculative";
      visualStyle = "Grand-Scale";
    } else if (genres.includes('Drama') || genres.includes('Romance')) {
      analysis = `An intimate character study that resonates through ${rating > 7.5 ? 'subtle nuance and profound dialogue' : 'earnest performances'}. It captures a sense of ${theme} that feels both timeless and grounded.`;
      pacing = "Slow-Burn";
      theme = "Existential";
      visualStyle = "Atmospheric";
      emotionalDepth = 95;
    } else {
      analysis = `A compelling ${genres[0]} entry that balances thematic depth with audience accessibility. It stands as a testament to the enduring appeal of ${genres.length > 1 ? genres[1] : 'cinematic'} storytelling.`;
      pacing = "Balanced";
      theme = "Redemption";
      visualStyle = "Polished";
    }

    const pros = ["Exceptional Cast Chemistry", "High Production Value"];
    const cons = ["Occasional Narrative Sag"];

    if (genres.includes('Horror')) {
      pros[0] = "Masterful Jump Scares";
      pros[1] = "Ominous Sound Design";
      cons[0] = "Relies on Tropes";
    } else if (genres.includes('Comedy')) {
      pros[0] = "Sharp Witty Dialogue";
      pros[1] = "Impeccable Timing";
      cons[0] = "Predictable Plot Beats";
    }

    return {
      score: Math.round(rating * 10),
      analysis,
      pacing,
      theme,
      visualStyle,
      emotionalDepth,
      pros,
      cons
    };
  }

  try {
    const reviews = movieData.reviews?.results?.map(r => r.content).slice(0, 3).join('\n\n') || "No critical reviews found.";
    
    const prompt = `
      You are a high-end cinematic AI critic. Analyze the following movie data and reviews to provide a "Synthesis" of why a user might like this movie.
      
      Movie Title: ${movieData.title}
      Overview: ${movieData.overview}
      Genres: ${movieData.genres?.map(g => g.name).join(', ')}
      Reviews: ${reviews}
      
      Output your response ONLY in JSON format with the following keys:
      - score: (Integer 0-100 representing a "Performance Score" based on critical consensus)
      - analysis: (A 2-3 sentence sophisticated, cinematic analysis of the film's appeal)
      - pacing: (One word descriptor)
      - theme: (One word descriptor)
      - visualStyle: (One word descriptor)
      - emotionalDepth: (Integer 0-100)
      - pros: (Array of 2 short strings)
      - cons: (Array of 1 short string)
    `;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      temperature: 0.7,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0].text;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : content);
    
  } catch (error) {
    console.error('AI Synthesis Error:', error);
    return {
      score: 75,
      analysis: "The AI was momentarily blinded by the cinematic brilliance. Consensus suggests a high-impact experience.",
      pacing: "Intense",
      theme: "Ambiguous",
      visualStyle: "Vibrant",
      emotionalDepth: 70,
      pros: ["Atmospheric Direction"],
      cons: ["Niche Appeal"]
    };
  }
};

module.exports = {
  synthesizeMovieInsight,
};
