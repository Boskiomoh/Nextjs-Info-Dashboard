'use client';

import React, { useState, useEffect } from 'react';

import { CoinData } from '@/types';

const CryptoMarket = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ws: WebSocket | null = null;

    const fetchCrypto = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
        const res = await fetch(`${apiUrl}/crypto`);
        const data: CoinData[] = await res.json();
        setCoins(data);
        setLoading(false);

        // Once we have the coins, set up WebSocket for real-time updates
        const streams = data.map(coin => `${coin.symbol.toLowerCase()}usdt@ticker`).join('/');
        ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);
          const { s, c, p } = message.data; // s: symbol, c: close price, p: price change percentage
          
          setCoins(prevCoins => prevCoins.map(coin => {
            const binanceSymbol = `${coin.symbol.toUpperCase()}USDT`;
            if (s === binanceSymbol) {
              return {
                ...coin,
                current_price: parseFloat(c),
                price_change_percentage_24h: parseFloat(p)
              };
            }
            return coin;
          }));
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } catch (error) {
        console.error('Crypto fetch failed:', error);
        setLoading(false);
      }
    };

    fetchCrypto();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <div className="w-12 h-12 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#6366f1] font-bold animate-pulse">Connecting to Blockchain API...</p>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white leading-none mb-2">Live Market Data</h2>
          <p className="text-slate-400 text-sm italic">Real-time prices from CoinGecko API</p>
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold flex items-center gap-2 border border-emerald-500/20">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          Live Feed Active
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">Asset</th>
              <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">Price</th>
              <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">24h Change</th>
              <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest">Market Cap</th>
              <th className="px-6 py-4 text-[10px] uppercase font-black text-slate-500 tracking-widest text-center">Trend (7d)</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const priceChange = coin.price_change_percentage_24h ?? 0;
              const currentPrice = coin.current_price ?? 0;
              const marketCap = coin.market_cap ?? 0;
              const sparklineData = coin.sparkline_in_7d?.price ?? [];

              return (
                <tr key={coin.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full p-1 bg-white/5" />
                      <div>
                        <div className="font-bold text-white group-hover:text-[#6366f1] transition-colors">{coin.name}</div>
                        <div className="text-[10px] uppercase text-slate-500 font-bold">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono font-bold text-white">
                    ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-5 font-bold ${priceChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                  </td>
                  <td className="px-6 py-5 text-slate-400 text-sm">
                    ${(marketCap / 1000000000).toFixed(2)}B
                  </td>
                  <td className="px-6 py-5">
                     <div className="flex justify-center">
                       {sparklineData.length > 0 ? (
                         <svg width="100" height="30" className="opacity-80">
                            <polyline
                              fill="none"
                              stroke={priceChange >= 0 ? '#10b981' : '#f43f5e'}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={sparklineData.map((p, i) => {
                                const min = Math.min(...sparklineData);
                                const max = Math.max(...sparklineData);
                                const range = max - min || 1;
                                const x = (i / (sparklineData.length - 1)) * 100;
                                const y = 30 - ((p - min) / range) * 25 - 2;
                                return `${x},${y}`;
                              }).join(' ')}
                            />
                         </svg>
                       ) : (
                         <span className="text-slate-600 text-xs italic">No trend data</span>
                       )}
                     </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-[#6366f1]/5 border border-[#6366f1]/20 p-6 rounded-3xl flex items-start gap-4">
        <div className="text-2xl">🧠</div>
        <div>
           <h4 className="font-bold text-[#6366f1] mb-1 text-sm uppercase tracking-wider">How is this &quot;Heavy&quot;?</h4>
           <p className="text-slate-400 text-xs leading-relaxed">
             This component manages real-time intervals, complex SVG math for sparklines, 
             and external API states. By lazy loading it, your initial dashboard bundle 
             remains lightning fast, and this blockchain logic is only downloaded when you need it!
           </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoMarket;
