import { Link } from 'react-router-dom';

const Quote = ({ quote }) => {
  return (
    <article className="post">
      <Link to={`/post/${quote.id}`}>
        <h2>{quote.title}</h2>
        <p className="quoteDate">{quote.datetime}</p>
      </Link>
      <p className="quoteBody">{
        (quote.body).length <= 25
          ? quote.body
          : `${(quote.body).slice(0, 25)}...`
      }</p>
    </article>
  )
}

export default Quote
