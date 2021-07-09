import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard'


//getStaticProps gets built at run time
export async function getStaticProps() {
	//Creates the connection to contentful
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_KEY,
	})

	//This gets the entries from contentful
	const res = await client.getEntries({content_type: 'recipe'})

	return {
		props: {
			recipes: res.items
		}
	}
}

export default function Recipes({recipes}) {
	console.log(recipes)
  return (
    <div className="recipe-list">
      {recipes.map(recipe=>(
      		<RecipeCard key={recipe.sys.id} recipe={recipe}/>
      	))}

      <style jsx>{`
      .recipe-list {
      	display: grid;
      	grid-template-columns: 1fr 1fr;
      	grid-gap: 20px 60px;
      }
      `}</style>
    </div>
  )
}