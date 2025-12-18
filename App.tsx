import React from 'react';
import { ArrowLeft } from 'lucide-react';
import PaymentForm from './components/PaymentForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full max-w-lg p-6 flex items-center relative z-10">
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">Pagamento</h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 relative">
        <PaymentForm />
      </main>
      
    </div>
  );
};

export default App;