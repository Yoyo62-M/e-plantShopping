import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';

const plantsData = [
  // Air Purifiers
  { id: 1, name: 'Peace Lily', price: 12.99, category: 'Air Purifiers', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=200' },
  { id: 2, name: 'Spider Plant', price: 8.99, category: 'Air Purifiers', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=200' },
  { id: 3, name: 'Snake Plant', price: 14.99, category: 'Air Purifiers', image: 'https://images.unsplash.com/photo-1598880940372-bb9a24a52447?w=200' },
  { id: 4, name: 'Aloe Vera', price: 9.99, category: 'Air Purifiers', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=200' },
  { id: 5, name: 'Boston Fern', price: 11.99, category: 'Air Purifiers', image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=200' },
  { id: 6, name: 'Bamboo Palm', price: 19.99, category: 'Air Purifiers', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200' },

  // Low Maintenance
  { id: 7, name: 'ZZ Plant', price: 16.99, category: 'Low Maintenance', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=200' },
  { id: 8, name: 'Pothos', price: 7.99, category: 'Low Maintenance', image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=200' },
  { id: 9, name: 'Cast Iron Plant', price: 13.99, category: 'Low Maintenance', image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=200' },
  { id: 10, name: 'Dracaena', price: 15.99, category: 'Low Maintenance', image: 'https://images.unsplash.com/photo-1567331711402-509c12c41959?w=200' },
  { id: 11, name: 'Chinese Evergreen', price: 12.99, category: 'Low Maintenance', image: 'https://images.unsplash.com/photo-1593691512429-04c3daeb0cd4?w=200' },
  { id: 12, name: 'Jade Plant', price: 10.99, category: 'Low Maintenance', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=200' },

  // Flowering Plants
  { id: 13, name: 'Orchid', price: 24.99, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1566907225472-514215c9a50c?w=200' },
  { id: 14, name: 'African Violet', price: 8.99, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=200' },
  { id: 15, name: 'Anthurium', price: 18.99, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1598902468171-b8de762be385?w=200' },
  { id: 16, name: 'Bromeliad', price: 16.99, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1612344441107-ef12287e4872?w=200' },
  { id: 17, name: 'Kalanchoe', price: 9.99, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1585400830577-6c47c1da91a0?w=200' },
  { id: 18, name: 'Cyclamen', price: 11.99, category: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3?w=200' },
];

const categories = [...new Set(plantsData.map(p => p.category))];

function ProductList({ onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedIds, setAddedIds] = useState([]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setAddedIds(prev => [...prev, plant.id]);
  };

  return (
    <div>
      <nav style={styles.nav}>
        <span style={styles.brand}>🌿 Paradise Nursery</span>
        <div style={styles.navLinks}>
          <a href="#" style={styles.link}>Home</a>
          <a href="#plants" style={styles.link}>Plants</a>
          <button onClick={onCartClick} style={styles.cartBtn}>
            🛒 Cart ({totalItems})
          </button>
        </div>
      </nav>

      <div style={{ padding: '20px' }} id="plants">
        {categories.map(cat => (
          <div key={cat}>
            <h2 style={styles.catTitle}>{cat}</h2>
            <div style={styles.grid}>
              {plantsData.filter(p => p.category === cat).map(plant => (
                <div key={plant.id} style={styles.card}>
                  <img src={plant.image} alt={plant.name} style={styles.img} />
                  <h3 style={{ margin: '10px 0 5px' }}>{plant.name}</h3>
                  <p style={{ color: '#666' }}>${plant.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAdd(plant)}
                    disabled={addedIds.includes(plant.id)}
                    style={{
                      ...styles.addBtn,
                      background: addedIds.includes(plant.id) ? '#aaa' : '#4CAF50',
                      cursor: addedIds.includes(plant.id) ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {addedIds.includes(plant.id) ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 30px', background:'#2d5a27', color:'white', position:'sticky', top:0, zIndex:100 },
  brand: { fontSize:'1.4rem', fontWeight:'bold' },
  navLinks: { display:'flex', gap:'20px', alignItems:'center' },
  link: { color:'white', textDecoration:'none', fontSize:'1rem' },
  cartBtn: { background:'#fff', color:'#2d5a27', border:'none', padding:'8px 16px', borderRadius:'20px', cursor:'pointer', fontWeight:'bold' },
  catTitle: { borderBottom:'2px solid #4CAF50', paddingBottom:'8px', color:'#2d5a27' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'20px', marginBottom:'40px' },
  card: { border:'1px solid #ddd', borderRadius:'10px', padding:'15px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
  img: { width:'100%', height:'140px', objectFit:'cover', borderRadius:'8px' },
  addBtn: { color:'white', border:'none', padding:'8px 16px', borderRadius:'20px', width:'100%', marginTop:'8px', fontSize:'0.9rem' },
};

export default ProductList;