import { React, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import useAxiosFetch from './hooks/useAxiosFetch';
import QuoteBoard from './QuoteBoard';
import NewQuote from './NewQuote';
import api from './api/quotes';

import QuoteBoardHeader from './QuoteBoardHeader';
import QuoteBoardNavBar from './QuoteBoardNavBar';




const QuoteList = ({ NewQuote }) => {
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const { fetchedQuoteData } = useAxiosFetch('http://localhost:3600');
  const [quoteData, setquoteData] = useState('');
  const history = useHistory();

  useEffect(() => {
    setquoteData(fetchedQuoteData);
  }, [fetchedQuoteData])

  useEffect(() => {
    const filteredResults = quotes.filter((quote) =>
      ((quote.body).toLowerCase()).includes(search.toLowerCase())
      || ((quote.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [quotes, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // info on the submit
    const timeOfQuotePull = format(new Date(), 'MMMM dd, yyyy pp');

    const Quote = { /** Info to be posted -> QuoteData **/ }

    try {
      const response = await api.post('./quotes', Quote);
      const allQuotes = [...postMessage, response.data];
      setQuotes(allQuotes);
      history.push('/')

    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    const editTime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedQuote = {/** QuoteData will be replaced with what is placed here **/ };
    try {
      const response = await api.put(`/quotes/${id}`, updatedQuote);
      setQuotes(quotes.map(quote => quote.id === id ? { ...response.data } : quote));
      history.push('/');
    } catch (err) {
      console.log(`${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/quotes/${id}`);
      const quotesList = quotes.filter(quote => quote.id !== id);
      setQuotes(quotesList);
      history.push('/');
    } catch (err) {
      console.log(`${err.message}`);
    }
  }




  return (
    <section>
      <QuoteBoardHeader title="FlipSide Options Information List" />
      <QuoteBoardNavBar search={search} setSearch={setSearch} />


    </section>
  )
}

export default QuoteList