import React, { useState } from 'react';
import styled from 'styled-components';

const HomeStyles = styled.div`
    padding: 2rem;
    margin-bottom: 3rem;
    background-color: var(--deep-dark);
    color: var(--white);
    min-height: calc(100vh - 6rem);
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    .congrats {
        margin-top: 2rem;
    }
    input {
        width: 100%;
        padding: 0.8rem;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        background-color: var(--deep-dark);
        color: var(--white);
        border: 1px solid var(--gray-1);
        outline-color: var(--accent);
    }
    button {
        font-size: 1.2rem;
        padding: 0.8rem 2rem;
        border: 1px solid var(--accent);
        background-color: transparent;
        color: var(--accent);
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: var(--accent);
            color: var(--white);
        }
    }
    @media only screen and (max-width: 768px) {
        padding: 1rem;
    }
`;

export default function Home() {
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [missingWords, setMissingWords] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [lang, setLang] = useState('');
  
    const fetchLyrics = async () => {
      try {
        const token = process.env.REACT_APP_GENIUS_TOKEN;
        const response = await fetch(`https://api.genius.com/search?q=${songTitle} ${artistName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const regex = /<div[^>]+data-lyrics-container="true"[^>]*>[\s\S]*?<\/div>/g;
        const data = await response.json();
        const songUrl = data.response.hits[0].result.path;
        const songID = data.response.hits[0].result.id;
        const response2 = await fetch(`https://api.genius.com/songs/${songID}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        const data2 = await response2.json();
        const language = data2.response.song.language;
        setLang(language);
        console.log(lang);
        const songPage = await fetch(`https://genius.com${songUrl}`);
        const html = await songPage.text();
        let lyrics = html.match(regex);
        let lyricsText = '';
        for (let i = 0; i < lyrics.length; i++) {
            lyrics[i] = lyrics[i].replace(/<(?!br\s*\/?)[^>]+>/g, '');
            lyricsText += lyrics[i];
            lyricsText += "<br>";
        }
        setLyrics(lyricsText);
      } catch (error) {
        console.error('Error:', error);
        console.log('Nie udało się pobrać tekstów piosenek.');
      }
    }
    const extractWords = () => {
        const words = lyrics.split(' ');
        const randomIndexes = [];
        const missingWordsCopy = [];
  
        // Losujemy indeksy słów do wycięcia
        while (randomIndexes.length < 10) {
          const randomIndex = Math.floor(Math.random() * words.length);
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }
  
        // Tworzymy kopię tekstu piosenki z zamienionymi słowami
        const censoredLyrics = lyrics.split(' ').map((word, index) => {
            if (randomIndexes.includes(index)) {
                if ( word.length > 1 && !/<[^>]+>/g.test(word) && !word.includes(',') && !/&[#0-9A-Za-z]+;/g.test(word) && !missingWordsCopy.includes(word)) {
                    missingWordsCopy.push(word);
                    return '______';
                }
                else{
                    let indexOf = randomIndexes.indexOf(index);
                    randomIndexes.splice(indexOf, 1);
                }
            }
            return word;
        }).join(' ');
        console.log(missingWordsCopy)
        setAnswers(missingWordsCopy);
        setMissingWords(randomIndexes);
        setLyrics(censoredLyrics);
      }
  
      const checkAnswer = (userAnswer, e) => {
        if(!userAnswer) return;
        for (let index = 0; index < answers.length; index++) {
            const answer = answers[index];
            if (userAnswer.toLowerCase() === answer.toLowerCase()) {
                e.value = '';
                let lyricsCopy = lyrics.split(' ');
                lyricsCopy[missingWords[index]] = answer;
                answers.splice(index, 1);
                missingWords.splice(index, 1);
                setAnswers(answers);
                setMissingWords(missingWords);
                setLyrics(lyricsCopy.join(' '));
            };
        }
      }
    return (
        <HomeStyles>
        <h1>Zgadnij tekst piosenki</h1>
        <div>
          <label>Tytuł Piosenki:</label>
          <input
            type="text"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Artysta:</label>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
        <button onClick={fetchLyrics}>Pobierz Tekst</button>
        <button onClick={extractWords}>Zacznij grę</button>
        <div>
          <h2>Tekst Piosenki:</h2>
          <div dangerouslySetInnerHTML={{ __html: lyrics }} />
        </div>
        {missingWords.length !== 0 && (
          <div>
            <label>Wprowadź brakujące słowa({missingWords.length}):</label>
            <input
              type="text"
              onChange={(e) => checkAnswer(e.target.value, e.target)}
            />
          </div>
        )}
        {
            missingWords.length === 0 && (
                <div className='congrats'>
                    <h2>Gratulacje! Udało Ci się uzupełnić wszystkie luki!</h2>
                </div>
            )
        }
      </HomeStyles>
    )
}
