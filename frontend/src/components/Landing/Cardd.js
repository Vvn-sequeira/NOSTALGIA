// src/components/Nostologia.jsx
import React from 'react';
import './Cardd.css';

const cards = [
  {
    title: 'Write to Future You!',
    description: 'Schedule an email to your future self—and feel proud when you read it later.',
    image: 'https://images.pexels.com/photos/3202235/pexels-photo-3202235.jpeg',
  },
  {
    title: 'Capture Your Day',
    description: 'Capture today’s moments—write down the memories before they fade.',
    image: 'https://images.pexels.com/photos/3278757/pexels-photo-3278757.jpeg',
  },
  {
    title: 'Learn & Improve',
    description: 'Make some changes on your life by writing down what you have done today ..',
    image: 'https://images.pexels.com/photos/4769486/pexels-photo-4769486.jpeg',
  },
];

const Cardd = () => {
  return (
    <div className="nostologia-container">
      <h1 className="nostologia-title">Nostalgia!!</h1>
      <div className="card-wrapper">
        {cards.map((card, index) => (
          <div className="nostologia-card" key={index}>
            <img src={card.image} alt={card.title} className="card-image" />
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cardd;
