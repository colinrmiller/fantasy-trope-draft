import { useEffect, useState } from "react";

export const Quote = () => {
    const [quotes, setQuotes] = useState([]);
    const [quoteId, setQuoteId] = useState(0);

    useEffect(() => {
        getQuotes().then((quoteObj) => setQuotes(quoteObj));
        //     .then(() => {
        //         debugger;
        //         const rand = Math.random();
        //         const len = quotes.length;
        //         const newId = Math.floor(rand * len);
        //         setQuoteId(newId);
        //     });
        // getRandomQuote().then((quoteObj) => setQuotes(quoteObj));
    }, []);

    // useEffect(() => {
    //     const rand = Math.floor(Math.random() * quotes.length);
    //     setQuoteId(rand);
    // }, [quote
    const reloadQuote = () => {
        const rand = Math.floor(Math.random() * quotes.length);
        setQuoteId(rand);

        // getRandomQuote().then((quoteObj) => {
        //     setQuotes(quoteObj);
        // });
    };

    return (
        <>
            <div className="quote">
                <p className="quote__text">
                    {/* {quotes[Math.floor(Math.random() * quotes.length)]?.text} */}
                    {/* {quotes[quoteId]?.text} */}
                    {quotes[quoteId]?.text}
                </p>
                <p className="quote__author">
                    Author:{" "}
                    {/* {quotes[Math.floor(Math.random() * quotes.length)]?.author} */}
                    {/* {quotes[quoteId]?.author} */}
                    {quotes[quoteId]?.author}
                </p>
                <button onClick={reloadQuote}>New Quote</button>
            </div>
        </>
    );
};

const getQuotes = (id) => {
    return fetch("https://type.fit/api/quotes/").then((response) =>
        response.json()
    );
    // .then((jsonRes) => jsonRes[id]);
};

const getRandomQuote = () => {
    return fetch("https://type.fit/api/quotes/")
        .then((response) => response.json())
        .then((resObj) => resObj[Math.floor(Math.random() * resObj.length)]);
};
