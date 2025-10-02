// /pages/index.js
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/j2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-lg w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-dreamy-pink to-dreamy-blue"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          J2Download
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Nhập link cần tải (e.g., YouTube URL)"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-dreamy-pink"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            type="submit"
            disabled={loading || !url}
            className={`w-full p-3 rounded-lg font-semibold text-white ${
              loading || !url
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-dreamy-purple to-dreamy-blue hover:from-dreamy-blue hover:to-dreamy-pink'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? 'Đang xử lý...' : 'Xử lý'}
          </motion.button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-red-500/20 rounded-lg border border-red-500/30"
            >
              <h3 className="font-semibold text-red-300">Lỗi:</h3>
              <p className="text-red-200">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20"
            >
              <h3 className="font-semibold text-dreamy-pink">Kết quả:</h3>
              <pre className="text-sm text-white overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background floating orbs for dreamy effect */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 bg-dreamy-pink/20 rounded-full filter blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-64 h-64 bg-dreamy-blue/20 rounded-full filter blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
