import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { BaseSyntheticEvent, useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [getSuccess, setGetSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [getError, setGetError] = useState(false);
  const [numbers, setNumbers] = useState<Array<string>>([]);

  useEffect(() => {
    const temp = async () => {
        const tempNumbers = await getPhoneNumbers();
    }
    
    temp().catch((err) => {
        console.log(err);
    })
  }, [])
  
  const sendMessage = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);    
    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumbers: numbers, text: message }),
    });
    const apiResponse = await res.json();

    if (apiResponse.success) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };
  
  const getPhoneNumbers = async () => {
    setLoading(true);
    setGetError(false);
    setGetSuccess(false);
    const res = await fetch('/api/getPhoneNumbers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ }),
    });
    const apiResponse = await res.json();

    if (apiResponse.success) {
      setGetSuccess(true);
      setNumbers(apiResponse.numbers)
    } else {
      setGetError(true);
    }
    setLoading(false);
  };
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js + Twilio</title>
      </Head>

      <form className={styles.form} onSubmit={sendMessage}>
        <h1 className={styles.title}>Send message using Next.js and Twilio</h1>
        <div className={styles.formGroup}>
          <label htmlFor='phone'>Phone Numbers</label>
          {numbers.map((number) => { return (
            <span key={number}>{number}</span>
          )
          })}
          {getSuccess && (
              <p className={styles.success}>Numbers got.</p>
          )}
          {getError && (
              <p className={styles.error}>
                Something went wrong getting numbers.
              </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='message'>Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            id='message'
            required
            placeholder='Message'
            className={styles.textarea}
          ></textarea>
        </div>
        <button disabled={loading} type='submit' className={styles.button}>
          Send Message
        </button>
        {success && (
          <p className={styles.success}>Message sent successfully.</p>
        )}
        {error && (
          <p className={styles.error}>
            Something went wrong. Please check the number.
          </p>
        )}
      </form>
    </div>
  );
};

export default Home;
