const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({ message: 'Poster must be a valid URL' }),
  // genre: z.enum([]).array() z.array(z.enum())
  genre: z.array(
    z.enum([
      'Action',
      'Comedy',
      'Drama',
      'Horror',
      'Romance',
      'Thriller',
      'Western',
      'Fantasy',
      'Mystery',
      'Sci-Fi',
      'Animation',
      'Family',
      'Crime',
      'Biography',
      'History',
      'Music',
      'War',
      'Sport'
    ]),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

function validateMovie (input) {
  // Con esta opcion tenemos que envolver en un try catch
  // return movieSchema.parse(movie)

  // Con esta opcion podemos solo validar con un if
  return movieSchema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = { validateMovie, validatePartialMovie }
