import { ProductForm } from './components/ProductForm/ProductForm';
import { ProductGrid } from './components/ProductCatalog/ProductGrid';
import { SortControls } from './components/ProductCatalog/SortControls';
import { ProductStats } from './components/ProductCatalog/ProductStats';
import { Notification } from './components/UI/Notification';

function App() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #fc0', paddingBottom: '10px', marginBottom: '30px' }}>Яндекс.Маркет — Каталог товаров</h1>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <ProductForm />
        </div>
        
        <div style={{ flex: '3 1 600px' }}>
          <ProductStats />
          <SortControls />
          <ProductGrid />
        </div>
      </div>

      <Notification />
    </div>
  );
}

export default App;
