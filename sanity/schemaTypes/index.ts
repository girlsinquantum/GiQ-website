import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import author from './author'
import comment from './comment'
import reaction from './reaction'
import event from './event'
import opportunities from './opportunities'
import { linkedinPost } from './linkedinPost'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, comment, reaction, event, opportunities, linkedinPost],
}